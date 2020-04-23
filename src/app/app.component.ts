import {Component} from '@angular/core';
import {AuthService} from '../app/user/auth.service';
import {Router,Event,NavigationStart,NavigationEnd,NavigationCancel,NavigationError, RouterEvent} from '@angular/router';
import { slideInAnimation } from './app.animation';
import {MessageService} from './messages/message.service';


@Component({
  selector:'bm-root',
  templateUrl:'./app.component.html',
  styleUrls:['./app.component.css'],
  //register the animation,
  animations: [slideInAnimation]

 // template:
  // <div>
  // <h1>{{pageTitle}}</h1>
  // <bm-books></bm-books>
  // </div>

  //later commented
  // `
  //   <nav class="navbar navbar-expand navbar-light bg-light" >
  //   <a class="navbar-brand">{{pageTitle}}</a>
  //   <ul class="nav nav-pills">
  //     <li><a class="nav-link" routerLinkActive='active'
  //      [routerLink]="['/welcome']">Home</a></li>
  //     <li><a class="nav-link" routerLinkActive='active' [routerLinkActiveOptions]="{exact:true}"
  //     [routerLink]="['/books']">Book List</a></li>
  //     <li><a class="nav-link" routerLinkActive='active' [routerLinkActiveOptions]="{exact:true}"
  //     [routerLink]="['/books','0','edit']">Add Book</a></li>
  //   </ul>
  //   </nav>
  //   <div class="container">
  //   <router-outlet></router-outlet>
  //   </div>
  // `
})
export class AppComponent{
  pageTitle:string = 'Camy Book Management';
  //Property to check loading
  loading = true;

  constructor(private authService : AuthService,
              private router : Router,
              private messageService : MessageService){
          //to watch the routerEvents
          router.events.subscribe((routerEvent : Event)=>{
            this.checkRouterEvent(routerEvent);
          });
  }

  checkRouterEvent(routerEvent : Event) : void{
    if(routerEvent instanceof NavigationStart){
      this.loading = true; //here we start the spinner
    }
    if(routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError){
        this.loading = false; //here we stop the spinner
      }
  }

  get isMessageDisplayed() : boolean{
    return this.messageService.isDisplayed;
  }

  get isLoggedIn() : boolean{
    return this.authService.isLoggedIn;
  }

  get  userName():string{
    if(this.authService.currentUser){
      return this.authService.currentUser.userName;
    }
    return '';
  }

  displayMessages(): void{
    this.router.navigate([{outlets : {popup : ['messages']}}]);
    this.messageService.isDisplayed = true;
  }

  hideMessages(): void {
    this.router.navigate([{outlets : {popup : null}}]);
    this.messageService.isDisplayed = false;
   
  }
  logOut():void{
   
    document.getElementById('name').remove();
   this.router.navigateByUrl('/welcome');
  }
}


// import { Component } from '@angular/core';

// @Component({
//   selector: 'pm-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'Angular: Getting Started';
// }