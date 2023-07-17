import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { examQuestions } from '../data/exams.data';
import { DatePipe } from '@angular/common';

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

  public getScores() {
    const scores = localStorage.getItem('driver-exam-scores');
    return scores ? JSON.parse(scores) : [];
  }

  public postScore(scoreObj: any) {
    const scores = localStorage.getItem('driver-exam-scores');
    if (scores) {
      const scoresArray = JSON.parse(scores);
      scoresArray.unshift(scoreObj)
      localStorage.setItem('driver-exam-scores', JSON.stringify(scoresArray));
    } else {
      localStorage.setItem('driver-exam-scores', JSON.stringify([scoreObj]));
    }
  }

  public resetScores() {
    localStorage.removeItem('driver-exam-scores');
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
    return questions.sort((a: any, b: any) => {
      return a.text === 'All of these.' ? 1 : -1;
    });
  }

  public sendResults(correct: number, completed: number) {
    const input = {
      subject: 'Driver Test Results',
      email: 'johnrose242@gmail.com',
      body: `A user scored ${correct}/${completed} on ${new DatePipe('en-US').transform(new Date(), 'short')}`
    };
    window.open(`mailto:johnrose242@gmail.com?subject=${input.subject}&body=${input.body}`, '_blank');
    return of(input);
  }
}
