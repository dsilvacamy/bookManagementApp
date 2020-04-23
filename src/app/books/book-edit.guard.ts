 import { Injectable } from '@angular/core';
 import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
 import { Observable } from 'rxjs';
 import {BookEditComponent} from './book-edit.component';


@Injectable({
  providedIn: 'root'
})
 export class BookEditGuard implements CanDeactivate<BookEditComponent>   {

//check if there are any unsaved changes in book data
  canDeactivate(component : BookEditComponent,
    currentRoute : ActivatedRouteSnapshot,
    currentState : RouterStateSnapshot,
    nextState ?: RouterStateSnapshot ) : Observable<boolean> | Promise<boolean> | boolean{
    if(component.isDirty){
      //code ask for confirmation
      const bookName = component.book.bookName || 'New Product';
      return confirm(`Navigate away and loose all changes to ${bookName}?`);
    }
    return true;
  }
 }
