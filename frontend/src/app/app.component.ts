import { Component } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/users.service';
import { NgForm } from '@angular/forms';

declare var M: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent {
  public title = 'Teachers app';
  public user: User;
  public identity = null;
  public token = null;

  constructor(private userService: UserService) {
    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
  }
  ngOnInit() {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    console.log(this.identity);
    console.log(this.token);
  }

  public onSubmitLogin(form: NgForm) {

    const params = {
      email: form.value.email,
      password: form.value.password,
      getHash: true
    };
    if (form.value.getHash) {
    } else {
      // Get data user
      this.userService.signUp(form.value)
        .subscribe(
          response => {
            const identity = response['user'];
            this.identity = identity;
            if (this.token != null) {
              M.toast({ html: 'Ok Login' });
            } else {
              // Create element token
              localStorage.setItem('identity', JSON.stringify(identity));
              // Get Token
              this.userService.signUp(params)
                .subscribe(res => {
                  const token = res['token'];
                  this.token = token;
                  if (this.token.length <= 0) {
                    M.toast({ html: 'Error Login' });
                  } else {
                    localStorage.setItem('token', token);
                  }
                }, err => {
                  M.toast({ html: 'Not Login' });
                }
                );
              // Persist in LocalStorage

            }
            M.toast({ html: 'Login successfully' });
          },
          error => {
            M.toast({ html: 'Not Login' });
          }
        );
    }

  }
  logOut() {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
    M.toast({ html: 'Logout successfully, thanks for you visit' });
  }

}
