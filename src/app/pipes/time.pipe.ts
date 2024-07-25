import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
  pure: true
})
export class TimePipe implements PipeTransform {

  transform(value: string): any {
    let temp = value.split(':')
    let left = Number(temp[0])
    let right = temp[1]
    if(left == 12){
      return left +':'+ right + ' PM'
    }
   else if(left > 12 && left <= 23){
      return left - 12 + ':' + right + ' PM'
    }
    else if(left < 12){
      return left + ':' + right + ' AM'
    }
    else{
      return left - 12 + ':' + right + ' AM'
    }
  }

}
