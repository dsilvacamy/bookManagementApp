import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
    templateUrl:'./login.component.html'
})

export class LoginComponent{
    pageTitle = "Log In";
    errorMessage : string;

    constructor(private authService : AuthService,
                private router : Router){ }

    login(loginForm : NgForm){
        if(loginForm && loginForm.valid){
            const userName = loginForm.form.value.userName;
            const password = loginForm.form.value.password;
            this.authService.login(userName,password);

            //after log in navigate to the book list page 
           // this.router.navigate(['/books']);
           
           //we will redirect to the original url
           //check if the user has clicked any other url , other than login
           if(this.authService.redirectUrl){
               this.router.navigateByUrl(this.authService.redirectUrl);
           }
           //if user has directly clicked login 
           else{
            this.router.navigate(['/books']); 
           }
        }
        else{
            this.errorMessage = 'Please enter a user name and password';
        }
    }

}