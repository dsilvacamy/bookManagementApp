import { Injectable } from '@angular/core';
import { CanDeactivate} from '@angular/router';
import { Observable } from 'rxjs';
import {BookEditComponent} from './book-edit.component';


@Injectable({
  providedIn: 'root'
})
export class BookEditGuard implements CanDeactivate<BookEditComponent>   {
  canDeactivate(component : BookEditComponent) : Observable<boolean> | Promise<boolean> | boolean{
    if(component.bookForm.dirty){
      //code ask for confirmation
      const bookName = component.bookForm.get('bookName').value || 'NewProduct';
      return confirm(`Navigate away and loose all changes to ${bookName}?`);
    }
    return true;
  }
}
