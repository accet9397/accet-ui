import { Component, OnInit } from '@angular/core';
import { FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  successCallback(data: FirebaseUISignInSuccessWithAuthResult) {
    console.log('successCallback', data);
  }

}
