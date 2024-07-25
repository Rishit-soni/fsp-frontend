import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { DietChartService } from 'src/app/services/diet-chart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { CalculateKcalPipe } from 'src/app/pipes/calculate-kcal.pipe';
import { EnumService } from 'src/app/services/enum.service';

@Component({
  selector: 'app-form-diet',
  templateUrl: './form-diet.component.html',
  styleUrls: ['./form-diet.component.scss'],
})
export class FormDietComponent implements OnInit {
  constructor(
    private dietChartService: DietChartService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private enumService: EnumService
  ) { }

  days = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  checkbox_array = [];

  sort_days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  emptyArray = {
    diet_time_slot: '',
    diet_start_time: '',
    diet_end_time: '',
    monday: {
      diet: [
        {
          name: '',
          qty: '',
          unit: '',
          kcal: '',
        },
      ],
      total_cal: 0,
    },
    tuesday: {
      diet: [
        {
          name: '',
          qty: '',
          unit: '',
          kcal: '',
        },
      ],
      total_cal: 0,
    },
    wednesday: {
      diet: [
        {
          name: '',
          qty: '',
          unit: '',
          kcal: '',
        },
      ],
      total_cal: 0,
    },
    thursday: {
      diet: [
        {
          name: '',
          qty: '',
          unit: '',
          kcal: '',
        },
      ],
      total_cal: 0,
    },
    friday: {
      diet: [
        {
          name: '',
          qty: '',
          unit: '',
          kcal: '',
        },
      ],
      total_cal: 0,
    },
    saturday: {
      diet: [
        {
          name: '',
          qty: '',
          unit: '',
          kcal: '',
        },
      ],
      total_cal: 0,
    },
    sunday: {
      diet: [
        {
          name: '',
          qty: '',
          unit: '',
          kcal: '',
        },
      ],
      total_cal: 0,
    },
  };

  model: any = {
    diet_name: '',
    category: '',
    duration: 0,
    duration_spec: 'days',
    diet_desc: '',
    total_kcal: 0,
    diet_array: [],
  };

  timeModel = {
    diet_time_slot: '',
    diet_start_time: '',
    diet_end_time: '',
  };

  dietModel = [];

  categories = [
  ];

  unit: any = [
  ]

  durationSpec: any = [
  ];

  dietTimeName = [
    {
      name: 'Early Morning',
      value: 'Early Morning',
      start: '05:00',
      end: '07:00',
    },
    { name: 'Pre Workout', value: 'Pre Workout', start: '06:00', end: '06:30' },
    { name: 'Break Fast', value: 'Break Fast', start: '07:00', end: '09:00' },
    {
      name: 'Post Workout',
      value: 'Post Workout',
      start: '09:00',
      end: '09:30',
    },
    { name: 'Mid Morning', value: 'Mid Morning', start: '09:00', end: '11:00' },
    { name: 'Launch', value: 'Launch', start: '11:00', end: '13:00' },
    { name: 'Snacks', value: 'Snacks', start: '15:00', end: '17:00' },
    { name: 'Dinner', value: 'Dinner', start: '19:00', end: '21:00' },
    { name: 'Post Dinner', value: 'Post Dinner', start: '21:00', end: '23:00' },
    { name: 'Before Bed', value: 'Before Bed', start: '23:00', end: '24:00' },
  ];

  dietTimeArray = [];
  editId: any;
  viewId: any;
  url: any;
  ngOnInit(): void {
    this.getUrl()
    this.route.params.subscribe((param) => {
      this.getEnum()
      if (param.edit_id) {
        this.editId = param.edit_id;
        this.getDietOnEdit(this.editId);
      } else if (param.view_id) {
        this.viewId = param.view_id;
        this.getDietOnEdit(this.viewId);
      }
    });

    if (this.editId == undefined && this.viewId == undefined) {
      for (let ele of this.dietTimeName) {
        let obj = JSON.parse(JSON.stringify(this.emptyArray));
        obj.diet_start_time = ele.start;
        obj.diet_end_time = ele.end;
        obj.diet_time_slot = ele.value;
        this.model.diet_array.push({ ...obj });
      }
    }
  }

  searchFun(term, item) {
    term = term.toLowerCase();
    return item.label.includes(term)

  }

  getEnum() {
    this.enumService.getDietEnums().subscribe((res) => {
      if (res.success) {
        console.log(res)
        this.unit = res.data.units
        this.categories = res.data.categories
        this.durationSpec = res.data.duration
      }
    })
  }

  getUrl() {
    this.url = sessionStorage.getItem('url')
  }

  getDietOnEdit(id) {
    this.dietChartService.getDietPlanById(id).subscribe((response) => {
      if (response.success) {
        this.model = response.data;
        let i = 0
        for (let day of this.days) {
          let kcal = new CalculateKcalPipe();
          this.kcal_array[i] = kcal.transform(this.model.diet_array, day);
          i++;
        }
      }
    });
  }

  setDietTimeArray(slot_name) {
    this.dietTimeArray = [...this.dietTimeName];
    for (let ele of this.model.diet_array) {
      if (ele.diet_time_slot != 'Snacks' && ele.diet_time_slot != slot_name) {
        let index = this.dietTimeArray
          .map((e) => {
            return e.name;
          })
          .indexOf(ele.diet_time_slot);
        this.dietTimeArray.splice(index, 1);
      }
    }
    console.log('diet time array', this.dietTimeArray);
  }

  // Diet Time

  addRow() {
    this.timeModel = {
      diet_time_slot: '',
      diet_start_time: '',
      diet_end_time: '',
    };
    this.setDietTimeArray('');
    let ele = document.getElementById('add-time-modal');
    ele.click();
    //this.model.diet_array.splice(0,0,{ ...this.emptyArray });
  }

  removeRow(i) {
    if (this.model.diet_array.length > 1) {
      this.model.diet_array.splice(i, 1);
    }
  }

  addTimeModal() {
    this.timeModel = { ...this.emptyArray, ...this.timeModel };
    this.setRowByTime();
  }

  timeModalIndex: any;
  async editTimeModal(i) {
    this.timeModalIndex = i;
    let temp = this.model.diet_array[i];
    await this.setDietTimeArray(temp.diet_time_slot);
    this.timeModel.diet_time_slot = temp.diet_time_slot;
    this.timeModel.diet_start_time = temp.diet_start_time;
    this.timeModel.diet_end_time = temp.diet_end_time;
  }

  updateTimeModal() {
    if (this.timeModalIndex != undefined) {
      this.timeModel = {
        ...this.model.diet_array[this.timeModalIndex],
        ...this.timeModel,
      };
      this.model.diet_array.splice(this.timeModalIndex, 1);
      this.setRowByTime();
    }
  }

  setRowByTime() {
    let temp = JSON.parse(JSON.stringify(this.model.diet_array));
    let i = 0;
    for (let ele of temp) {
      let start = ele.diet_start_time.split(':');
      let tempStart = this.timeModel.diet_start_time.split(':');
      let end = ele.diet_end_time.split(':');
      let tempEnd = this.timeModel.diet_end_time.split(':');
      let startTime = moment([Number(start[0]), Number(start[1])], 'HH:mm');
      let tempStartTime = moment(
        [Number(tempStart[0]), Number(tempStart[1])],
        'HH:mm'
      );
      let endTime = moment([Number(end[0]), Number(end[1])], 'HH:mm');
      let tempEndTime = moment(
        [Number(tempEnd[0]), Number(tempEnd[1])],
        'HH:mm'
      );
      if (tempStartTime.isBefore(startTime)) {
        this.model.diet_array.splice(i, 0, this.timeModel);
        break;
      } else if (tempStartTime.isSame(startTime)) {
        if (tempEndTime.isBefore(endTime) || tempEndTime.isSame(endTime)) {
          this.model.diet_array.splice(i, 0, this.timeModel);
          break;
        } else {
          this.model.diet_array.splice(i, 0, this.timeModel);
          break;
        }
      } else {
        if (i == temp.length) {
          this.model.diet_array.push(this.timeModel);
        }
      }
      i++;
    }
    this.timeModalIndex = undefined;

    this.timeModel = {
      diet_time_slot: '',
      diet_start_time: '',
      diet_end_time: '',
    };
  }

  // Diet Inner

  dietInnerArray = [];
  root: any;
  tempDay: any;
  tempTimeSlot: any
  showCheckbox = true;
  addDietToDay(root, day, i, slot) {
    this.checkbox_array = [];
    this.showCheckbox = false;
    this.root = root;
    this.tempTimeSlot = day.charAt(0).toUpperCase() + day.slice(1) + ' - ' + slot
    this.tempDay = this.sort_days[i];
    Array.from(document.querySelectorAll('input[type=checkbox]')).forEach(
      (e: any) => {
        if (e.name == this.tempDay) {
          e.checked = true;
        } else {
          e.checked = false;
        }
      }
    );

    let arr = JSON.parse(JSON.stringify(this.model.diet_array));
    this.dietInnerArray = arr[root][`${day}`]['diet'].slice();
    if (this.dietInnerArray[0].name == '') {
      this.showCheckbox = true;
    }
    this.checkbox_array.push(day);
  }

  addRowToInner() {
    this.dietInnerArray.push({
      name: '',
      qty: '',
      unit: '',
      kcal: '',
    });
  }

  changeCheckbox(i, e) {
    if (e.target.checked) {
      this.checkbox_array.push(this.days[i]);
    } else {
      let index = this.checkbox_array.findIndex((e) => {
        return e == this.days[i];
      });
      if (index != -1) {
        this.checkbox_array.splice(index, 1);
      }
    }
  }

  removeRowFromInner(i) {
    if (this.dietInnerArray.length > 1) {
      this.dietInnerArray.splice(i, 1);
    }
  }

  kcal_array = [0, 0, 0, 0, 0, 0, 0];

  addDietToModel() {
    for (let ele of this.dietInnerArray) {
      if (ele.name == '') {
        this.toastr.error('Properly add diet item');
        return;
      }
    }
    let close = document.getElementById('close-modal-button');
    close.click();

    for (let ele of this.checkbox_array) {
      let total_cal = 0;
      let obj = {
        diet: [],
        total_cal: 0,
      };
      let dietItem = this.model.diet_array[this.root][`${ele}`]
      if (dietItem ?.diet.length != 0 && dietItem.diet[0].name != '') {
        console.log('dietItem', dietItem)
        obj = JSON.parse(JSON.stringify(dietItem))
        total_cal = dietItem.total_cal
      }
      for (let ele of this.dietInnerArray) {
        if (ele.kcal) {
          total_cal += ele.kcal;
        }
        obj.diet.push(ele);
      }
      obj.total_cal = total_cal;

      this.model.diet_array[this.root][`${ele}`] = JSON.parse(
        JSON.stringify(obj)
      );
    }
    let i = 0;
    this.model.total_kcal = 0
    for (let day of this.days) {
      let kcal = new CalculateKcalPipe();
      this.kcal_array[i] = kcal.transform(this.model.diet_array, day);
      this.model.total_kcal += this.kcal_array[i]
      i++;
    }
    console.log('total_kcal', this.model.total_kcal)
    this.checkbox_array = [];
  }

  onSubmit() {
    this.spinner.show();
    for (let item of this.model.diet_array) {
      if (item.diet_time_slot == '') {
        this.spinner.hide();
        window.alert('Please Select Time Slot');
        return;
      }
    }
    if (!this.editId) {
      this.dietChartService.addDietPlan(this.model).subscribe(
        (response) => {
          this.spinner.hide();
          if (response.success) {
            this.toastr.success('Diet is added successfully');
            if (this.url) {
              sessionStorage.setItem('id', response.data.id)
            }
            this.router.navigate([this.url ? this.url : '/diet-chart/chart']);
          }
        },
        (err) => {
          this.spinner.hide();
          this.toastr.error(err.error.error);
          console.log(err);
        }
      );
    } else {
      this.dietChartService.updateDietPlanById(this.model, this.editId).subscribe(
        (response: any) => {
          this.spinner.hide();
          if (response.success) {
            this.toastr.success('Diet is updated successfully');
            this.router.navigate(['/diet-chart/chart']);
          }
        },
        (err) => {
          this.spinner.hide();
          this.toastr.error(err.error.error);
          console.log(err);
        }
      );
    }
  }
}
