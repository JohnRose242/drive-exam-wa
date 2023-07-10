import { Component, OnInit } from '@angular/core';
import { ExamService } from '../core/services/exam.service';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit {
  public count = 0;
  public exam: FormGroup = new FormGroup<any>({});
  public inprogress = false;
  public startTime: any;
  constructor(
    private examService: ExamService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  get questions() : FormArray {
    return this.exam.get('questions') as FormArray;
  }

  get completed(): number {
    return this.questions.getRawValue().reduce((a: any, b: any) => {
      return a + (b.response ? 1 : 0);
    }, 0);
  }

  get correct(): number {
    return this.questions.getRawValue().reduce((a: any, b: any) => {
      return a + (b.response === b.answer ? 1 : 0);
    }, 0);
  }

  get incorrect(): number {
    return this.questions.getRawValue().reduce((a: any, b: any) => {
      return a + (b.response && b.response !== b.answer ? 1 : 0);
    }, 0);
  }

  get percent(): number {
    return this.completed ? Math.floor(this.correct/this.completed * 100) : 0;
  }

  public ngOnInit() {
    this.exam = this.fb.group({
      name: 'Driving Exam',
      questions: this.fb.array([])
    });
  }

  public start() {
    if (this.count > 0) {
      this.startTime = performance.now();
      this.inprogress = true;
      const questions = this.examService.getExam(this.count);
      this.exam = this.fb.group({
        name: 'Driving Exam',
        questions: this.fb.array(
          questions.map((q: any) => {
            return this.fb.group({
              imageId: q.imageId,
              text: q.question,
              options: [this.examService.randomize(q.options)],
              response: this.fb.control(null, Validators.required),
              answer: q.answer,
              correct: false
            })
          })
        )
      });
    }
  }

  public reset() {
    this.count = 0;
    this.inprogress = false;
    this.exam = this.fb.group({
      name: 'Driving Exam',
      questions: this.fb.array([])
    });
  }

  public disableControl(control: any) {
    control.disable();
    if (this.completed === this.count) {
      const duration = ((performance.now() - this.startTime)/60000).toFixed(2);
      const split = duration.split('.');
      const snackbarRef = this.snackBar.open(`You have finished.
      The test took ${split[0]} minutes and ${(Number(split[1]) * .6).toFixed(0)} seconds.
      Good Job!`, 'Dismiss', {
        duration: 5000,
        verticalPosition: 'top'
      });
    }
  }

  public getCorrectAnswer(question: any): string {
    const option = question.value.options.find((opt: any) => opt.id === question.value.answer);
    return option ? option.text : '';
  }

}
