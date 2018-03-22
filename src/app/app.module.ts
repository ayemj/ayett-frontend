import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShowOnDirtyErrorStateMatcher, ErrorStateMatcher, MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
// import { StudentTimeTableComponent } from './time-table/student-time-table/student-time-table.component';
// import { TeacherTimeTableComponent } from './time-table/teacher-time-table/teacher-time-table.component';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AdjustmentComponent } from './adjustment/adjustment.component';
import { AddAdjustmentsComponent } from './adjustment/add-adjustments/add-adjustments.component';
import { ViewResultComponent } from './adjustment/view-result/view-result.component';
import { SearchPipe } from './searchPipe';
import { HomeComponent } from './home/home.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { ServiceService } from  './service.service';
import { AuthenticationService } from './auth/authentication.service';

const routes: Routes = [
  {path : '', component: LoginComponent},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'uploadFiles', component: UploadFilesComponent},
  { path: 'home/adjustments', component: AdjustmentComponent},
  { path: 'adjustments/viewAdjustments', component: ViewResultComponent }
 ];

@NgModule({
  declarations: [
    AppComponent,
    
    
    
      LoginComponent,
     
     
     
     
     AdjustmentComponent,
     AddAdjustmentsComponent,
     ViewResultComponent,
     SearchPipe,
     HomeComponent,
     UploadFilesComponent,
     NavbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCardModule, 
    MatMenuModule, 
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
    
  ],
  providers: [AuthenticationService, ServiceService, HttpClientModule,{provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}],
  bootstrap: [AppComponent],
  exports : [SearchPipe]
})


export class AppModule {



 }

