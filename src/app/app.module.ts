import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule,MatButtonModule,MatSidenavModule,MatIconModule,MatListModule,MatCardModule} from '@angular/material';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { UploadFileService } from './Services/upload-file.service';
import { DataTableModule } from 'angular-6-datatable';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule,MatSelectModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';
import { AuthguardGuard } from '../app/guards/authguard.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataService } from '../app/Services/data.service';
import { ImageViewerModule } from 'ngx-image-viewer';
import { InfiniteScrollModule } from '@thisissoon/angular-infinite-scroll';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AngularWebStorageModule } from 'angular-web-storage';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {MatMenuModule} from '@angular/material/menu';
import { AddOrganizationComponent } from './components/add-organization/add-organization.component';
import { ViewOrganizationListComponent } from './components/view-organization-list/view-organization-list.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthguardGuard],
    component: DashboardComponent,
    children: [
      {
        path: '',
        canActivate: [AuthguardGuard],
        component: FirstPageComponent
      },
      {
        path: 'AddOrganization',
        canActivate: [AuthguardGuard],
        component: AddOrganizationComponent
      },
      {
        path: 'ViewOrganizationList',
        canActivate: [AuthguardGuard],
        component: ViewOrganizationListComponent
      },
      {
        path: 'performance',
        canActivate: [AuthguardGuard],
        component: FirstPageComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    FirstPageComponent,
    LoginComponent,
    DashboardComponent,
    AddOrganizationComponent,
    ViewOrganizationListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, {
      useHash: true,
      initialNavigation: 'enabled'
    }),
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
    NgxPaginationModule,
    ImageViewerModule.forRoot(),
    InfiniteScrollModule,
    MatProgressSpinnerModule,
    AngularWebStorageModule,
    AngularFontAwesomeModule,
    MatDividerModule,
    MatGridListModule,
    MatProgressBarModule,
    MatMenuModule,
    MatSelectModule
  ],
  entryComponents: [DashboardComponent],
  providers: [
    UploadFileService,
    AuthguardGuard,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
