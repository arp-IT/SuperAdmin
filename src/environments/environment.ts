// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  ViewPerformanceUrl: 'https://en25nerdu6.execute-api.ap-south-1.amazonaws.com/ViewPerformance-Dev/',

  AdminSignIn: 'http://localhost:8080/ShopManagement/MasterOrganizationLogin',

  CreateOrg: 'http://localhost:8080/ShopManagement/create/organizations',
  
  OrgList: 'http://localhost:8080/ShopManagement/organizations',

  UserNameList : 'http://localhost:8080/ShopManagement/orgUserNames',

  OrgDetails: 'http://localhost:8080/ShopManagement/organizationUpdate',

  ExcehlHandler: 'https://s3.ap-south-1.amazonaws.com/qshala-excel-upload/',

  QuestionAnswer: 'https://2sy3qrpxqi.execute-api.ap-south-1.amazonaws.com/Dev/uploadquestionandanswer',

  FetchAllRecoredActivitie: 'https://08jy9v77aj.execute-api.ap-south-1.amazonaws.com/Dev/fetchallrecordedactivities',

  FetchRecordedActivity: 'https://4sp2q7m0sl.execute-api.ap-south-1.amazonaws.com/Dev/fetchrecordedactivity',

  FetchUserFeedBack: 'https://v83k1hec93.execute-api.ap-south-1.amazonaws.com/Dev/fetchuserfeedback',

  UploadActivityExcel: 'https://5ggfurv7z8.execute-api.ap-south-1.amazonaws.com/Dev/uploadactivityexcel',

  UploadReleaseExcel: 'https://dus93oc6he.execute-api.ap-south-1.amazonaws.com/Dev/uploadreleaseexcel',

  UserTaskAssessment: 'https://g4e59shy99.execute-api.ap-south-1.amazonaws.com/Dev/usertaskassessment'
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
