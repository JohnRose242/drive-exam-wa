import { Injectable } from '@angular/core';
import { examQuestions } from '../data/exams.data';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor() { }

  public getExam(size = 40) {
    examQuestions.forEach((q: any) => {
      const trueSize = new Set(q.options.map((opt: any) => opt.text)).size;
      if (trueSize !== 4) {
        console.log('Duplicate responses!', q);
      }
    })
    return this.randomize(examQuestions).slice(0, size);
  }

  public randomize(questions: any) {
    let m = questions.length, t, i;

    // While there remain elements to shuffle
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = questions[m];
      questions[m] = questions[i];
      questions[i] = t;
    }
    return questions;
  }
}
