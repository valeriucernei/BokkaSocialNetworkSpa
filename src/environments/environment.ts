// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://localhost:7184/api/',
  photosUrl: 'https://localhost:7184/photos/',
  iconsUrl: 'https://localhost:7184/icons/',
  homeUrl: 'http://localhost:4200',
  successUrl: 'http://localhost:4200/subscriptions/success',
  cancelUrl: 'http://localhost:4200/subscriptions'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
