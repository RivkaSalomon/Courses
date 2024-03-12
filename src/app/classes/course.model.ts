export enum EHowToLearn{
    Frontal,Zoom
}
export class Course{
id?: number
name?: string
categoryId?: number
countLessons?: number
Syllabus?: string[]=[]
howToLearn?: EHowToLearn
startDate?: Date
static instructions: string[] = [];
lecturerId?: number
imgPath?: string
 }