import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../../core/services/login.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() public headerLinks: {route?: string, text: string}[] = [];
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
