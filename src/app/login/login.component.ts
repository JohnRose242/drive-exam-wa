import { Component } from '@angular/core';
import { LoginService } from '../core/services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public hide = true;
  public error = null;
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      username: this.fb.control(''),
      password: this.fb.control('')
    })
  }

  public login() {
    this.loginService.login(this.form.value.username, this.form.value.password)
      .pipe(take(1))
      .subscribe(() => {
        const snackbarRef = this.snackBar.open('Login Successful', 'Dismiss', {
          duration: 2500,
          verticalPosition: 'top'
        });
        this.error = null;
        this.router.navigate(['home']);
    }, error => {
        this.error = error;
    });
  }

}
