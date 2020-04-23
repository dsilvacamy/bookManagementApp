import { Injectable } from '@angular/core';
import { CanActivate,CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Route, CanDeactivate} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})

//we use CanLoad here to load the book module, after login check is done 
export class AuthGuard implements CanActivate , CanLoad{
  //inject dependencies
  constructor(private authService : AuthService, 
    private router : Router){
    
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLoggedIn(state.url); //activatedroutesnapshot has segments of url and not a string
  }

  canLoad(route: Route) : boolean{
    return this.checkLoggedIn(route.path);
  }

  

  checkLoggedIn(url : string):boolean{
    //if the user has logged in , we return true
    if(this.authService.isLoggedIn){
      return true;
    }
    
    this.authService.redirectUrl = url; 
    //if the user has not logged in then return to the log in page
    this.router.navigate(['/login']);
    return false;
  }
  
}
