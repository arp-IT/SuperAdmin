import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatListModule, MatPaginatorModule, MatSelectModule, MatSidenavModule, MatSortModule, MatTableModule, MatToolbarModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { InfiniteScrollModule } from '@thisissoon/angular-infinite-scroll';
import { DataTableModule } from 'angular-6-datatable';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AngularWebStorageModule } from 'angular-web-storage';
import { ImageViewerModule } from 'ngx-image-viewer';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthguardGuard } from '../app/guards/authguard.guard';
import { DataService } from '../app/Services/data.service';
import { AppComponent } from './app.component';
import { AddOrganizationComponent } from './components/add-organization/add-organization.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { LoginComponent } from './components/login/login.component';
import { UpdateOrganizationComponent } from './components/update-organization/update-organization.component';
import { ViewOrganizationListComponent } from './components/view-organization-list/view-organization-list.component';
import { UploadFileService } from './Services/upload-file.service';



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
      },
      {
        path: 'UpdateOrganization',
        canActivate: [AuthguardGuard],
        component: UpdateOrganizationComponent
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
    ViewOrganizationListComponent,
    UpdateOrganizationComponent
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
    MatSortModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  entryComponents: [DashboardComponent],
  providers: [
    UploadFileService,
    AuthguardGuard,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
