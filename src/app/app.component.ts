import {Component} from '@angular/core';

@Component({
  selector:'bm-root',
  template:
  // <div>
  // <h1>{{pageTitle}}</h1>
  // <bm-books></bm-books>
  // </div>
  `
    <nav class="navbar navbar-expand navbar-light bg-light" >
    <a class="navbar-brand">{{pageTitle}}</a>
    <ul class="nav nav-pills">
      <li><a class="nav-link" routerLinkActive='active'
       [routerLink]="['/welcome']">Home</a></li>
      <li><a class="nav-link" routerLinkActive='active' [routerLinkActiveOptions]="{exact:true}"
      [routerLink]="['/books']">Book List</a></li>
      <li><a class="nav-link" routerLinkActive='active' [routerLinkActiveOptions]="{exact:true}"
      [routerLink]="['/books','0','edit']">Add Book</a></li>
    </ul>
    </nav>
    <div class="container">
    <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent{
  pageTitle:string = 'Camy Book Management';
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