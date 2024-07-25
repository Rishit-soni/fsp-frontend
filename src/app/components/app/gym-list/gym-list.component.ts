import { Component, OnInit } from '@angular/core';
import { GymProfileService } from 'src/app/services/gym-profile.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gym-list',
  templateUrl: './gym-list.component.html',
  styleUrls: ['./gym-list.component.scss']
})
export class GymListComponent implements OnInit {

  constructor(private gymService: GymProfileService, private spinner: NgxSpinnerService, private route: ActivatedRoute) { }
  gymList = []
  loading = true
  param:any
  ngOnInit() {
    this.route.params.subscribe((param)=>{
      if(param.user_id){
        this.param = param
        this.loading = true;
        setTimeout(() => {
          if (this.loading) {
            this.spinner.show();
          }
        }, 500);
        this.getGymList(param.user_id)
      }
    })
  
  
  }

  getGymList(id){
    this.gymService.getGymProfileBySuperAdmin(id).subscribe((res) => {
      this.loading = false
      this.spinner.hide()
      if (res.success) {
        console.log(res)
        this.gymList = res.data
      }
    }, err => {
      this.loading = false
      this.spinner.hide()
      console.log(err)
    })
  }
}
