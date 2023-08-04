import { Component } from '@angular/core';
import { LoginService } from './core/services/login.service';
import { ConfirmationDialogComponent } from "./shared/confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public isLoggedIn$ = this.loginService.userIsLoggedIn$;
  public headerLinks: any[] = [];

  constructor(
    private dialog: MatDialog,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {
    const ignoreMobile = localStorage.getItem('prep-2-test-ignore-mobile');
    if(!ignoreMobile && (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))){
      const data = {
        title: 'Mobile Device Detected',
        message: 'Prep2Test on mobile devices is best used in Portrait mode. You may experience some issues in Landscape mode.',
        proceedText: 'OK',
        hideCancel: true
      }
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data
      });
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          localStorage.setItem('prep-2-test-ignore-mobile', JSON.stringify(true));
        }
      });
    }

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      tap((event) => {
        this.headerLinks = this.getHeaderLinks(this.route.firstChild);
        this.title.setTitle(`Prep2Test - ${this.getPageTitle(this.route.firstChild)}`);
      })
    ).subscribe();
  }

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

  private getHeaderLinks(
    activatedRoute: ActivatedRoute | null
  ): any[] {
    while (activatedRoute) {
      if (activatedRoute.firstChild) {
        activatedRoute = activatedRoute.firstChild;
      } else if (
        activatedRoute.snapshot.data &&
        activatedRoute.snapshot.data['headerLinks']
      ) {
        return activatedRoute.snapshot.data['headerLinks'];
      } else {
        return [];
      }
    }
    return [];
  }

  private getPageTitle(
    activatedRoute: ActivatedRoute | null
  ): string {
    while (activatedRoute) {
      if (activatedRoute.firstChild) {
        activatedRoute = activatedRoute.firstChild;
      } else if (
        activatedRoute.snapshot.data &&
        activatedRoute.snapshot.data['pageTitle']
      ) {
        return activatedRoute.snapshot.data['pageTitle'] as string;
      } else {
        return '';
      }
    }
    return '';
  }
}
