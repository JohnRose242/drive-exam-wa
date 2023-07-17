import { Component, OnInit } from '@angular/core';
import { ExamService } from '../core/services/exam.service';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent implements OnInit {
  public dataSource = [];
  public displayedColumns: string[] = ['date', 'correct', 'completed', 'percent', 'duration'];

  constructor(private dialog: MatDialog, private examService: ExamService) {}

  public ngOnInit() {
    this.getScores();
  }

  public getScores() {
    this.dataSource = this.examService.getScores();
  }

  public resetScores() {
    const data = {
      title: 'Reset Scores',
      message: 'Are you sure that you want to reset your scores?'
    }
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.examService.resetScores();
        this.getScores();
      }
    });
  }
}
