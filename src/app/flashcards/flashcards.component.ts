import { Component, OnInit } from '@angular/core';
import { ExamService } from '../core/services/exam.service';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.scss']
})
export class FlashcardsComponent implements OnInit {
  flipped = false;
  flashcard: any;

  constructor(
    private examService: ExamService
  ) {}

  public ngOnInit() {
    this.setFlashcard();
  }

  public setFlashcard() {
    const card = this.examService.getExam(1)[0];
    this.flashcard = {
      frontImage: card.imageId,
      frontText: card.question,
      backText: card.options.find((opt: any) => opt.id === card.answer).text
    }
  }

  public next() {
    this.flipped = false;
    this.setFlashcard();
  }

  public toggle() {
    this.flipped = !this.flipped;
  }
}
