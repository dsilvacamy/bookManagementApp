import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {BookResolved} from './book';
import { Observable, of, } from 'rxjs';
import { BookService } from './book.service';
import { catchError,map } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})

export class BookResolver implements Resolve<BookResolved> {
    //inject the book service
    constructor(private bookService : BookService){}

    resolve(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) : Observable<BookResolved>{
        //get the id from url
       // const id = +route.paramMap.get('id');
       const id = route.paramMap.get('id');
        
       //to check if the id is a number
       if(isNaN(+id)){
        const message = `Book id was not a number ${id}`;
        console.error(message);
        //return object, since the resolve method returns observable we use of method
        return of({book: null,error: message});
       }
        //fetch the data using http service 
        //return this.bookService.getBook(id);
        return this.bookService.getBook(+id)
        .pipe(
            map(book => ({book:book})),
            catchError( error => {
                const message = `Retrieved error : ${error}`;
                console.error(message);
                return of({book : null , error : message});
            })
        );
    }
    
}