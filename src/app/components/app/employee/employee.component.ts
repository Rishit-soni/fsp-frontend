import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { EnumService } from 'src/app/services/enum.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private toastr: ToastrService,
    private spinner: NgxSpinnerService, private enumService: EnumService) { }

  employee_list = []
  loading = true
  role:any = {}

  async ngOnInit() {
    await this.getRoleEnum()
    await this.getEmployees('')
  }

  getRoleEnum(){
    this.enumService.getEmployeeRoleEnums().subscribe(res=>{
      if(res.success){
        this.role = {}
        for (let ele of res.data) {
          this.role[`${ele.value}`] = ele.name
        }
      }
    })
  }

  getEmployees(search) {
    this.spinner.show()
    this.employeeService.getEmployees(search).subscribe(res => {
      this.loading = false;
      this.spinner.hide();
      if (res.success) {
        this.employee_list = res.data
      }
    },err=>{
      this.loading = false;
      this.spinner.hide();
      this.toastr.error(err.error.message)
    })
  }


  search(e) { 
    let text = e.target.value.toLowerCase()
    this.getEmployees(text)
  }

  getRole(key){
    return this.role[key]
  }
}
