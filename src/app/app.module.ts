import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GetDepartmentsComponent } from './departments/get-departments/get-departments.component';
import { AddDepartmentComponent } from './departments/add-department/add-department.component';
import { DepartmentDetailsComponent } from './departments/department-details/department-details.component';
import { UpdateDepartmentComponent } from './departments/update-department/update-department.component';
@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    AddEmployeeComponent,
    UpdateEmployeeComponent,
    GetDepartmentsComponent,
    AddDepartmentComponent,
    DepartmentDetailsComponent,
    UpdateDepartmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton:true,
      preventDuplicates:true,
      progressBar:true,
    }),
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    FontAwesomeModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
