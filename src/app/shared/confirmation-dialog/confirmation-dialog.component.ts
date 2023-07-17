import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmDialogModel {
  title: string;
  message: string;
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  standalone: true,
  imports: [ MatButtonModule, MatDialogModule ]
})
export class ConfirmationDialogComponent {
  public title: string;
  public message: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel,
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
  ) {
    this.title = this.data.title;
    this.message = this.data.message;
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
