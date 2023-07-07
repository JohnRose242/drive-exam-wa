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
  flashcards: any[] = [];
  index = 0;

  constructor(
    private examService: ExamService
  ) {}

  public ngOnInit() {
    this.flashcards = this.examService.getExam(500);
    this.setFlashcard();
  }

  public setFlashcard(index = 0) {
    const card = this.flashcards[index];
    const showAll = card.options.find((opt: any) => opt.id === card.answer).text === 'All of these.';
    this.flashcard = {
      frontImage: card.imageId,
      frontText: card.question,
      backText: showAll
        ? card.options.map((opt: any) => opt.text).filter((t: string) => t !== 'All of these.')
        : [card.options.find((opt: any) => opt.id === card.answer).text]
    };
    this.index = index;
  }

  public next() {
    this.flipped = false;
    setTimeout(() => {
      this.setFlashcard(this.index + 1);
    }, 200);
  }

  public previous() {
    this.flipped = false;
    setTimeout(() => {
      this.setFlashcard(this.index - 1);
    }, 200);
  }

  public toggle() {
    this.flipped = !this.flipped;
  }
}
