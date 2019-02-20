import { firebase } from 'firebaseui-angular';

export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: 'AIzaSyD9jnmjVOoA9zw1_7SydISz7TJEiLa3Ar0',
    authDomain: 'accet97-stage.firebaseapp.com',
    databaseURL: 'https://accet97-stage.firebaseio.com',
    projectId: 'accet97-stage',
    storageBucket: 'accet97-stage.appspot.com',
    messagingSenderId: '1093833835967'
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
