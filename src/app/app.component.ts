import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { forkJoin } from 'rxjs';
import { PopUpSnackMessageService } from './services/pop-up-snack-message.service';
import * as xlsx from 'xlsx';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  title = 'VFinder';
  pin = '';
  date: Date;
  mainData: Center[];
  searchingText = 'Searching...';
  searchingBool = true;
  showSearchingMsg = false;
  dummyCount = 0;
  totalTryCount = 0;
  stopTryCount = 1000;
  tryLimitinMS = 5000;
  showHelp = false;
  // showSetting = false;
  datepicker;
  menu;
  data;
  age = 18;
  stateList = [];
  state;
  districtList = [];
  district;
  getTabValue = 0;
  fileName = 'ExcelSheet.xlsx';
  constructor(
    private http: HttpClient,
    private popUpMessageServ: PopUpSnackMessageService
  ) {
    this.fetchStateList();
    // this.fetchDistrictList(16);
  }

  getCurrentDateTime(): Date {
    return new Date();
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', (this.getTabValue = tabChangeEvent.index));
  }

  playAudio(): void {
    // const audio = new Audio('./assets/Speech Sleep.wav');
    // const audio = new Audio('./assets/Dong.mp3');
    const audio = new Audio('./assets/TikTik.mp3');
    // audio.src = 'C:/Users/VPandita/Downloads/preview.mp3';
    audio.load();
    audio.play();
  }

  findVaccine(date, filterOnAvailability?: boolean): void {
    this.totalTryCount++;
    if (this.getTabValue === 0) {
      this.findVaccineByPin(date, filterOnAvailability);
    } else {
      this.findVaccineByDistrict(date, filterOnAvailability);
    }
  }

  findVaccineByDistrict(date: any, filterOnAvailability?: boolean): void {
    this.http
      .get(this.getUrlFindByDistrict(this.district, date))
      .subscribe((main: Data) => {
        const sessions = main.sessions;
        let mainDataBuild = this.buildSessionDataAsPerDefaultFormat(sessions);
        mainDataBuild = this.filterData(mainDataBuild, filterOnAvailability);
        this.mainData = mainDataBuild;
        this.processInfiniteSearch(filterOnAvailability);
      });
  }

  private buildSessionDataAsPerDefaultFormat(
    sessions: SessionData[]
  ): Center[] {
    const mainDataBuild: Center[] = [];
    sessions.forEach((sess) => {
      const cent: Center = {};
      cent.name = sess.name;
      cent.pincode = sess.pincode;
      const sessForCent: Sessions = {};
      sessForCent.session_id = sess.session_id;
      sessForCent.min_age_limit = sess.min_age_limit;
      sessForCent.date = sess.date;
      sessForCent.available_capacity_dose2 = sess.available_capacity_dose2;
      sessForCent.available_capacity_dose1 = sess.available_capacity_dose1;
      sessForCent.available_capacity = sess.available_capacity;
      cent.sessions = [];
      cent.sessions.push(sessForCent);
      mainDataBuild.push(cent);
    });
    return mainDataBuild;
  }

  findVaccineByPin(date, filterOnAvailability?: boolean): void {
    if (this.pin === '') {
      this.pin = '180001';
    }
    const obs = [];
    if (this.pin.includes(',')) {
      const pins = this.pin.split(',');
      pins.forEach((pinNo) => {
        obs.push(this.http.get(this.getUrl(pinNo, date)));
      });
    } else {
      obs.push(this.http.get(this.getUrl(this.pin, date)));
    }

    forkJoin(obs).subscribe(
      (main: Data[]) => {
        let centreData = [];
        main.forEach((eachC) => {
          centreData = centreData.concat(eachC.centers);
        });
        let data = centreData;
        data = this.filterData(data, filterOnAvailability);
        this.mainData = data;
        console.log(data);
        this.processInfiniteSearch(filterOnAvailability);
      },
      (err) => {
        window.alert(err.error.error);
      }
    );
  }

  private processInfiniteSearch(filterOnAvailability: boolean): void {
    if (filterOnAvailability) {
      if (
        this.dummyCount === this.stopTryCount ||
        (this.mainData && this.mainData.length > 0)
      ) {
        this.showSearchingMsg = false;
        this.playAudio();
        this.search(false);
        this.dummyCount = 0;
      } else {
        setTimeout(() => {
          this.searching();
        }, this.tryLimitinMS);
      }
    }
  }

  private filterData(data: Center[], filterOnAvailability?: boolean): Center[] {
    if (data && data.length > 0) {
      data = data.filter((d) => {
        let bool = false;
        d.sessions.forEach((sess) => {
          if (
            bool === false &&
            (this.age === 0 || sess.min_age_limit === this.age) &&
            (!filterOnAvailability || sess.available_capacity !== 0)
          ) {
            bool = true;
          }
        });
        return bool;
      });
    }
    return data;
  }

  search(filterOnAvailability?: boolean): void {
    if (!this.date) {
      this.popUpMessageServ.showErrorMessage('Choose a date');
      return;
    }
    console.log(this.pin);
    console.log(this.date);
    console.log(this.age);
    const arr = this.date.toLocaleDateString().split('/');
    // console.log(arr);
    const newDate = arr[1] + '-' + arr[0] + '-' + arr[2];
    console.log(newDate);
    this.findVaccine(newDate, filterOnAvailability);
  }

  searching(): void {
    this.dummyCount++;
    console.log(this.dummyCount);
    this.showSearchingMsg = true;
    if (!this.searchingBool) {
      this.searchingBool = true;
      this.searchingText =
        'Please Wait..... Trying again ' + this.dummyCount + ' time(s)';
    } else {
      this.searchingBool = false;
      this.searchingText = 'Searching....';
    }
    this.search(true);
  }
  exportToExcel(): void
    {
       /* table id is passed over here */
       const element = document.getElementById('id');
       const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: xlsx.WorkBook = xlsx.utils.book_new();
       xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       xlsx.writeFile(wb, this.fileName);
    }

  getUrl(pin, date): string {
    return (
      'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=' +
      pin +
      '&date=' +
      date
    );
  }

  getUrlState(): string {
    return 'https://cdn-api.co-vin.in/api/v2/admin/location/states';
  }
  getUrlDistict(stateId): string {
    return (
      'https://cdn-api.co-vin.in/api/v2/admin/location/districts/' + stateId
    );
  }
  getUrlFindByDistrict(districtId, date): string {
    return (
      'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=' +
      districtId +
      '&date=' +
      date
    );
  }
  toggleHelp(): void {
    this.showHelp = !this.showHelp;
  }

  closeMenu(): void {
    this.menuTrigger.closeMenu();
  }

  stateChanged($event?): void {
    console.log(this.state);
    this.fetchDistrictList(this.state);
  }

  fetchStateList(): void {
    this.http.get(this.getUrlState()).subscribe((data: any) => {
      this.stateList = data.states;
      console.log(this.stateList);
    });
  }

  fetchDistrictList(stateId): void {
    this.http.get(this.getUrlDistict(stateId)).subscribe((data: any) => {
      this.districtList = data.districts;
      console.log(this.districtList);
    });
  }
}

interface Data {
  centers?: Center[];
  sessions?: SessionData[];
}

interface Center {
  sessions?: Sessions[];
  name?: string;
  pincode?: number;
}

interface Sessions {
  min_age_limit?: number;
  available_capacity?: number;
  session_id?: string;
  date?: string;
  available_capacity_dose1?: number;
  available_capacity_dose2?: number;
}

interface SessionData {
  name?: string;
  pincode?: number;
  min_age_limit?: number;
  available_capacity?: number;
  session_id?: string;
  date?: string;
  available_capacity_dose1?: number;
  available_capacity_dose2?: number;
}
