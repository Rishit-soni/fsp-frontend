import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculateKcal',
  pure: true
})
export class CalculateKcalPipe implements PipeTransform {

  transform(dietArray: any, day: any) {
    let total_cal = 0
    if(day != ''){
    for(let item of dietArray){
        total_cal += item[day].total_cal
      }
    }
    return total_cal
  }

}
