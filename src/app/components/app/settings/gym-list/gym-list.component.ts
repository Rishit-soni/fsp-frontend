import { Component, OnInit } from '@angular/core'
import { NgxSpinnerService } from 'ngx-spinner'
import { GymProfileService } from 'src/app/services/gym-profile.service'

@Component({
  selector: 'app-gym-list',
  templateUrl: './gym-list.component.html',
  styleUrls: ['./gym-list.component.scss'],
})
export class GymListComponent implements OnInit {
  constructor(private gymService: GymProfileService, private spinner: NgxSpinnerService) {}
  gymList = []
  loading = true
  ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      if (this.loading) {
        this.spinner.show();
      }
    }, 500);
    this.gymService.getGymList().subscribe((res) => {
      this.loading = false
      this.spinner.hide()
      if (res.success) {
        this.gymList = res.data
      }
    },err=>{
      this.loading = false
      this.spinner.hide()
      console.log(err)
    })
  }
}
