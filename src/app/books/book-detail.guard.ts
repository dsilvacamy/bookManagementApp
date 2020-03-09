import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree ,Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookDetailGuard implements CanActivate {
  //for routing back to productList
  constructor(private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //we need to get second parameter from URL
    const id = +next.url[1].path;
    if(isNaN(id) || id < 1){
      alert("invalid book id");
      this.router.navigate(['/books']);
      return false;
    };
      return true;
  }
  
}
