import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {BookData} from './books/book-data';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';

//feature modules
import { WelcomeComponent } from './home/welcome.component';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { UserModule } from './user/user.module';
import { MessageModule } from './messages/message.module';
import { AppRoutingModule } from './app-routing.module';
//import the module required for animations
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,//for ngIf and ngfor
    BrowserAnimationsModule,
    HttpClientModule,//for http services
    InMemoryWebApiModule.forRoot(BookData, { delay: 1000 }), //for calls to back-end server
   // BookModule, removed and will be loaded using lazy loading
    UserModule,
    MessageModule,
    AppRoutingModule//specify this last so that wildcard route is not picked
    
    //([
    //   {path:"welcome",component:WelcomeComponent},
    //   {path:'',redirectTo:'welcome',pathMatch:'full'},
    //   {path:'**',redirectTo:'welcome',pathMatch:'full'}
    // ]),    
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
