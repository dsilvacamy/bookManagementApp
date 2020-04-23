import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './user/auth.guard';
import { CustomStrategy } from './custom.strategy.service';

const Routes = [
    {path:'welcome',component:WelcomeComponent},
    //specify book lazy loading
    {path:'books',
    //enable canActivate if preloading is required
     // canActivate:[AuthGuard],
      canLoad:[AuthGuard],
      data:{preload : true}, 
       loadChildren : () => 
       import('./books/book.module')
       .then(m => m.BookModule)
     },
    {path:'',redirectTo:'welcome',pathMatch:'full'},
    {path:'**',component: PageNotFoundComponent}
  ];

@NgModule({
imports: [ 
    RouterModule.forRoot(Routes,{preloadingStrategy : CustomStrategy})//,{enableTracing : true})
],
exports:[RouterModule]
})

export class AppRoutingModule{

}