import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'duration',
  standalone: true
})
export class DurationPipe implements PipeTransform {

  transform(value: string | null | undefined, ...args: unknown[]): unknown {
    console.log(value)
    if (!!value) {
      if (value.includes(" ")){
        const [days, time] = value.split(" ")
        const [hours, minutes, seconds] = time.split(":").map(Number)
        return `${days ? days + 'يوم' : ''} ${hours ? hours + 'ساعه' : ''}  ${minutes||seconds ? minutes + Math.ceil(seconds/60) + "دقيقة":""}  `;
      }else{
        const [hours, minutes, seconds] = value.split(":").map(Number)
        return ` ${hours ? hours + 'ساعه' : ''}  ${minutes || seconds? minutes + Math.ceil(seconds/60) + "دقيقة":""} `;
      }
    } else {
      return ""
    }
  }

}
 
