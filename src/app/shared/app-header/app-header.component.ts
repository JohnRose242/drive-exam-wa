import { Component } from '@angular/core';
import { LoginService } from '../../core/services/login.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {

  public isLoggedIn$ = this.loginService.userIsLoggedIn$;

  constructor(
    private dialog: MatDialog,
    private loginService: LoginService
  ) {}

  public logout(): void {
    const data = {
      title: 'Logout',
      message: 'Are you sure that you want to logout?'
    }
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.loginService.logout();
      }
    });
  }

}
