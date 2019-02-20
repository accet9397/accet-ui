// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { firebase } from 'firebaseui-angular';

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyD1jzt_OF9DQSpZ1lkHfohG_-uT2Fk6ZTc',
    authDomain: 'accet97-dev.firebaseapp.com',
    databaseURL: 'https://accet97-dev.firebaseio.com',
    projectId: 'accet97-dev',
    storageBucket: 'accet97-dev.appspot.com',
    messagingSenderId: '375399148485'
  },
  firebaseUiAuthConfig: {
    signInFlow: 'popup',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: '<your-tos-url>',
    // Privacy policy url/callback.
    // privacyPolicyUrl: function() {
    //   window.location.assign('<your-privacy-policy-url>');
    // }
    privacyPolicyUrl: '<your-privacyPolicyUrl-link>'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
