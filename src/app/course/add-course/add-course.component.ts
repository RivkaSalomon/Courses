import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../user/user.service';
import { CourseService } from '../course.service';
import { Course, EHowToLearn } from '../../classes/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../classes/category.model';
import Swal from 'sweetalert2';
import { CategoryService } from '../../category.service';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.scss'
})

export class AdddeditComponent implements OnInit {
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }
  course: Course=new Course();
  courseId?: number
  courseForm!: FormGroup
  categories:Category[]=[];
  typeLearning =EHowToLearn;
  constructor(private route: ActivatedRoute, private _courseService: CourseService, private _categoriesService: CategoryService, private router:Router) { }
  
  get syllabusControls(): FormArray {
    return this.courseForm.controls['syllabus'] as FormArray;
  }



  addSyllabusItem() {
    this.syllabusControls.push(new FormControl('', Validators.required));
  }
  cancel() {
    this.course = new Course();
    this.router.navigate(['/course/All-Courses'])
  }
  ngOnInit(): void {
    this.getCourse();
    this.getCategories();
    this.initForm();
  }
  
  getCourse() {
    this.route.params.subscribe((param) => {
      this.courseId = param['course'];
      this._courseService.getCourses().subscribe({
        next: (res) => {
          this.course = res.filter(x => x.id == this.courseId)[0];
        }
      })
    })
  }
  getCategories() {
    this._categoriesService.getCategory().subscribe({
      next: (res) => { this.categories = res }
    })
  }
  initForm() {
    this.courseForm = new FormGroup({
      'name': new FormControl(this.course?.name, [Validators.required]),
      'categoryId': new FormControl(this.course?.categoryId, [Validators.required]),
      'countLessons': new FormControl(this.course?.count, [Validators.required]),   
      'dateStart': new FormControl(this.course?.startDate , [Validators.required]),
      'syllabus': new FormArray([new FormControl('', [Validators.required])]),
      'type': new FormControl(this.course?.learningWay, [Validators.required]),
      'image': new FormControl(this.course?.img, [Validators.required])
    })
    this.updateFormValues();
    console.log(this.course?.startDate,"edit")
    // window.location.reload();
  }
  updateFormValues() {
    const silibusFormArray = this.courseForm.get('syllabus') as FormArray;
    silibusFormArray.removeAt(0);
    this.course?.syllabus?.forEach((silibusItem) => {
      silibusFormArray.push(new FormControl(silibusItem, [Validators.required]));
    });
   
  }
  removeSyllabusItem(i: number) {
    const silibusFormArray = this.courseForm.get('syllabus') as FormArray;
    silibusFormArray.removeAt(i);
  }
  getChanges():boolean {
    let flag:boolean=true
    if(this.course==undefined)
    this.course=new Course();
    {this.course.name = this.courseForm.controls['name'].value;
    this.course.categoryId = parseInt(this.courseForm.controls['categoryId'].value);
    this.course.count = this.courseForm.controls['countLessons'].value;
    this.course.startDate = this.courseForm.controls['dateStart'].value;
    this.course.syllabus = this.courseForm.controls['syllabus'].value;
    this.course.learningWay = this.courseForm.controls['type'].value == "פרונטלי" ? 0 : 1;
    if (this.course.lecturerId==undefined)
     { 
      flag=false;
      this.course.lecturerId = JSON.parse(sessionStorage.getItem("userId")!)
    }
    this.course.img = this.courseForm.controls['image'].value;}
    return flag;
  }
  onSubmit() {
    let flag:boolean=true;
    this.getCourse();
    console.log(this.course?.name+"lkjbv")
    flag=this.getChanges();
    if(this.course)
    {
    if (flag)
     { this._courseService.edit(this.course, this.course.id).subscribe({
        next: (res) => { 
              
          Swal.fire({
            position: "center",
           icon: "success",
            title: "עודכן בהצלחה!!",
            showConfirmButton: false,
            timer: 1500
          }
          );
  
          
        }
        
      });}
      else {   
      
        this._courseService.save(this.course!).subscribe({
          next: res => {
                Swal.fire({
                position: "center",
                icon: "success",
                title: "נוסף בהצלחה!!",
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                this.router.navigate(['/course/All-Course']);
              });
          }
        });
      }
    }
    
  }
  
}
 




// export class AddCourseComponent {
//   addCourseform?: FormGroup;

//   constructor(private formBuilder: FormBuilder,
//     private router: Router,
//     private courseService :CourseService) { 

//   this.addCourseform = this.formBuilder.group({
//     id: ['', Validators.required],
//     name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6), Validators.pattern('^\\d{4,6}$')]]
//   });}


//   ngOnInit(): void {
//     this.addCourseform = this.formBuilder.group({
//       id: [null, Validators.required],
//       name: ['', [Validators.required, Validators.minLength(3)]], 
//       categoryId: [null, Validators.required],
//       countLessons: [null, Validators.required],
//       syllabus: this.formBuilder.array([new FormControl('', Validators.required)]), // Initialize with one empty syllabus input
//       howToLearn: ['', Validators.required],
//       startDate: [null, Validators.required],
//       instructions: [''],
//       lecturerId: [null, Validators.required],
//       imgPath: ['']
//     });
// }
// public save() {
// console.log("jkhgkj")
// }

