import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-result-data',
  templateUrl: './app-result-data.component.html',
  styleUrls: ['app-result-data.scss'],
})
export class AppResultDataComponent {
  @Input() mainData;
  @Input() date;
  @Input() showSearchingMsg;
  @Input() searchingText;
  @Input() id;
}

