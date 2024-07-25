import { Component, OnInit } from '@angular/core';
import { ExpirationService } from 'src/app/services/expiration.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-expiration-package',
  templateUrl: './expiration-package.component.html',
  styleUrls: ['./expiration-package.component.scss']
})
export class ExpirationPackageComponent implements OnInit {

  constructor(private expirationService: ExpirationService, private toastrService:ToastrService, private spinner:NgxSpinnerService) { }

  loading = true
  async ngOnInit(){
    this.loading = true;
    setTimeout(() => {
      if (this.loading) {
        this.spinner.show();
      }
    }, 500);
    await this.getExpiration('')
  }

  expiration_list = []

  savePath(){
    sessionStorage.setItem('url', location.pathname)
  }
  
  getExpiration(search){
    this.expirationService.getMembershipPackageExpiration(search).subscribe((res)=>{
      this.loading = false
        this.spinner.hide()
      if(res.success){
        this.expiration_list = res.data
      }
    },err=>{
      this.loading = false
      this.spinner.hide()
      this.toastrService.error(err.error.error)
    })
  }

  search(e){
    let value = e.target.value
    this.getExpiration(value)
  }

}
