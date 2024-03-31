// // import { Directive, ElementRef, HostListener, Input } from '@angular/core';

// // @Directive({
// //   selector: '[highLightColor]',
// //   standalone: true
// // })
// // export class CourseDirective {

// //   @Input()
// //   public highLightColor = 'red'

// //   constructor(private element: ElementRef) { }

// //   @HostListener('')
// //   onThisWeek(){
// //     this.element.nativeElement.style.color = this.highLightColor;
// //   }


//   // @HostListener('mouseout')
//   // onMouseOut() {
//   //   this.element.nativeElement.style.color = 'blue';
//   // }

// // }



// import { Directive, ElementRef, Input, OnInit } from '@angular/core';

// @Directive({
//   selector: '[dateColor]',
//   standalone: true
// })
// export class DateColorDirective implements OnInit {
//     // @Input
//     //  ('dateColor') date!: Date;


//    @Input()
//    public date:Date|undefined = new Date();
//   constructor(private el: ElementRef) {    
// }
//   currentDate: Date = new Date();

//   ngOnInit() {debugger
// console.log("aaa",this.date?.getFullYear,this.currentDate.getDay)
//     if (this.date?.getFullYear==this.currentDate.getFullYear) {
//       this.el.nativeElement.style.color = 'red';
//     } else {
//       this.el.nativeElement.style.color = 'yellow';
//     }
//   }
// }
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[dateColor]',
  standalone: true

})
export class DateColorDirective implements OnInit {
  @Input('dateColor') date: Date | any;

  currentDate: Date = new Date();

  constructor(private el: ElementRef) {}
  
  ngOnInit() {
    this.date = new Date(this.date);
    if (this.isDateInCurrentWeek(this.date)) {
      this.el.nativeElement.style.color = 'red';
      } 
  }

  private isDateInCurrentWeek(date: Date): boolean {
    const currentWeekNumber = this.getWeekNumber(this.currentDate);
    const targetWeekNumber = this.getWeekNumber(date);

    return (
      currentWeekNumber === targetWeekNumber &&
      this.currentDate.getFullYear() === date.getFullYear()
    );
  }

  private getWeekNumber(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }
}
