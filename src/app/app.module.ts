import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule
} from '@angular/material';
import { FirstPageComponent } from './first-page/first-page.component';
import { SecondPageComponent } from './second-page/second-page.component';
import { ThirdPageComponent } from './third-page/third-page.component';
import { UploadFileService } from './upload-file.service';
import { DataTableModule } from 'angular-6-datatable';
import { VerifyTasksComponent } from './verify-tasks/verify-tasks.component';
import { GalleryComponent } from './gallery/gallery.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { AuthguardGuard } from '../app/authguard.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataService } from '../app/data.service';
import { JsonpModule, Jsonp, Response } from '@angular/http';
import { ImageViewerModule } from 'ngx-image-viewer';
import { OrderModule } from 'ngx-order-pipe';
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    canActivate: [AuthguardGuard],
    component: MyNavComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: '**', redirectTo: 'login' }

  // { path: 'first-page', component: FirstPageComponent},
  // { path: 'second-page', component: SecondPageComponent},
  // { path: 'third-page', component: ThirdPageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    FirstPageComponent,
    SecondPageComponent,
    ThirdPageComponent,
    VerifyTasksComponent,
    GalleryComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    FlexLayoutModule,
    NgxPaginationModule,
    JsonpModule,
    ImageViewerModule.forRoot(),
    OrderModule
  ],
  entryComponents: [GalleryComponent],
  providers: [
    UploadFileService,
    SecondPageComponent,
    AuthguardGuard,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
