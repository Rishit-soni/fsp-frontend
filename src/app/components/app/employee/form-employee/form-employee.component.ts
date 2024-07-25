import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { EnumService } from 'src/app/services/enum.service';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.scss']
})
export class FormEmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private router: Router, private toastr: ToastrService, 
    private spinner: NgxSpinnerService, private enumService: EnumService) { }

  checkMemberExits: boolean = true;
  model: any = {}
  role_array = []
  client_type_array = []
  reporting_array = [{name:'Ravi Gajera', value: 'Ravi Gajera'}]

  gender_array: Array<Object> = [
    {
      name: "Male",
      value: "male",
    },
    {
      name: "Female",
      value: "female",
    },
    {
      name: "Other",
      value: "other",
    },
  ];

  async ngOnInit() {
    await this.getRoleEnums()
  }

  getRoleEnums(){
    this.enumService.getEmployeeEnums().subscribe((res)=>{
      if(res.success){
        this.role_array = res.data.role
        this.client_type_array = res.data.client_type
      }
    })
  }

  checkContact(e) {
    let mobile_no = e.target.value
    if(!mobile_no && mobile_no.length != 10){return}
    this.employeeService.getEmployeeByMobileNo(mobile_no).subscribe((res)=>{
      if(res.success){
        console.log(res)
        if(res.data.length > 0){
          this.model = {...this.model, ...res.data[0]}
          this.checkMemberExits = false
        }
        else{
          this.checkMemberExits = false
        }
      }
    })
  }

  onSubmit() {
    this.spinner.show()
    this.employeeService.addEmployee(this.model).subscribe((res)=>{
      this.spinner.hide()
      if(res.success){
        this.toastr.success('Emplyee is registered successfully')
        this.router.navigate(['/employee'])
      }
    },err =>{
      this.spinner.hide()
      this.toastr.error(err.error.error.message)
    })
   }
}
