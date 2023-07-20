import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PopUpSnackMessageService } from 'src/app/services/pop-up-snack-message.service';

@Component({
  selector: 'app-myregisterationpage',
  templateUrl: './myregisterationpage.component.html',
  styleUrls: ['./myregisterationpage.component.scss']
})
export class MyregisterationpageComponent implements OnInit {
  registrationForm: FormGroup;
  user = {
    name: '',
    email: '',
    password: ''
  };
  emailErrorMessage: string;

  constructor(private http: HttpClient,private formBuilder: FormBuilder, private router: Router,
    private popUpService: PopUpSnackMessageService) {
    // this.registrationForm = this.formBuilder.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required, Validators.minLength(8)]],
    //   // other form fields
    // });
    this.registrationForm = new FormGroup({
      user: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      // other form controls
    });
  
  }

  ngOnInit(): void {
    
  }
  register() {
    if (this.registrationForm.valid) {
    this.http.post('http://localhost:8081/api/v1.0/lms/company/register', this.user)
      .subscribe(
        response => {
          console.log('Registration successful:', response);
          // Handle success response
          this.popUpService.showSuccessMessage('Register success')
        },
      
        error => {
          console.log('Registration failed:', error);
          // Handle error response
          this.popUpService.showErrorMessage(console.error)

        }
      );
    }
    else {
      // Reset the email error message if the form is invalid
      this.emailErrorMessage = 'dvsg';
    }

  }
  getEmailErrorMessage() {
    const emailFormControl = this.registrationForm.get('email');
    if (emailFormControl.hasError('required')) {
      return 'Email is required';
    }
    if (emailFormControl.hasError('email')) {
      return 'Invalid email format';
    }
    return '';
  }


}
