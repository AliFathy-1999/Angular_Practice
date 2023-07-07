import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})

export class UpdateEmployeeComponent {
  currentYear = new Date().getFullYear();
  departments:any;
  private fb = inject(FormBuilder);
  employeeForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('^[A-Za-z\\s]+$')]],
    lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('^[A-Za-z\\s]+$')]],
    userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$')]],
    confirmPassword: [null, Validators.required],
    nationalId: ['', [Validators.required, Validators.pattern('^(2|3)\\d{1,2}(0[1-9]|1[0-2])(0[1-9]|1\\d|2\\d|3[01])(0[1-9]|1[0123456789]|2[12389]|3[012]|88)(\\d{4})([0-9])$')]],
    DOB: ['', Validators.required,this.isUnder18],
    gender: ['', Validators.required],

    academicQualifications: this.fb.group({
      college: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60), Validators.pattern('^[A-Za-z\\s]+$')]],
      degree: ['', Validators.required],
      institution: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[A-Za-z\\s]+$')]],
      year: ['', Validators.required,,Validators.min(1970), Validators.max(this.currentYear)]
    }),
    hireDate: ['', { validators: Validators.required, asyncValidators: [], updateOn: 'blur' }],
    position: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[A-Za-z\\s]+$')]],
    jobType: ['', Validators.required],
    depId: ['', Validators.required],
    salary: ['', [Validators.required, Validators.min(3500), Validators.max(200000)]],
    phoneNumber: ['', [Validators.required, Validators.pattern('^(00201|\\+201|01)[0-2,5]{1}[0-9]{8}$')]],
    address: ['', [Validators.required,Validators.minLength(5), Validators.maxLength(150)]],
  });

constructor(private _global:EmployeeService,private toastr:ToastrService){
  this.employeeForm.setValidators(this.confirmPasswordValidator);

  this._global.getSelectedDepartment().subscribe((data:any) =>{
    this.departments = data.data
  })
}
test(){
  this.toastr.success("yes we do it")
}
  hasUnitNumber = false;
  confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordsMismatch: true };
    }

    return null;
  }
  isUnder18(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return new Promise((resolve) => {
      const newyear = new Date();
      const userBirthdate = new Date(control.value);
      const ageDiff = (newyear.getFullYear() - userBirthdate.getFullYear());
      const isUnder18 = ageDiff < 18

      if (!isUnder18) {
        resolve(null);
      } else {
        resolve({ isUnder18: true });
      }
  })
  }

  onSubmit(): void {
      console.log(this.employeeForm.valid);

      this._global.addEmployee(this.employeeForm.value).subscribe(employee => {
        this.toastr.success('success');
      },(err:Error)=>{
        this.toastr.error(err.message)
      })
  }
}
