import { Component, OnInit } from '@angular/core';
import { ExpirationService } from 'src/app/services/expiration.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-workout-expiration',
  templateUrl: './workout-expiration.component.html',
  styleUrls: ['./workout-expiration.component.scss']
})
export class WorkoutExpirationComponent implements OnInit {

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
    this.expirationService.getWorkoutExpiration(search).subscribe((res)=>{
      this.loading = false
      this.spinner.hide()
      if(res.success){
        this.expiration_list = res.data
        console.log(this.expiration_list)
      }
    },err=>{
      this.loading = false
      this.spinner.hide()
      this.toastrService.error(err.error.error)
    })
  }

  search(e){
    let text = e.target.value
    this.getExpiration(text)
  }
}
