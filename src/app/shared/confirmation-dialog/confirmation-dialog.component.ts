import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmDialogModel {
  title: string;
  message: string;
  proceedText?: string,
  hideCancel?: boolean
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  standalone: true,
  imports: [ MatButtonModule, MatDialogModule, CommonModule ]
})
export class ConfirmationDialogComponent {
  public title: string;
  public message: string;
  public proceedText: string;
  public hideCancel: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel,
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
  ) {
    this.title = this.data.title;
    this.message = this.data.message;
    this.proceedText = this.data.proceedText ?? 'Yes';
    this.hideCancel = !!(this.data.hideCancel);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
