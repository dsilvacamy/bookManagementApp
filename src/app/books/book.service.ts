import { Injectable } from '@angular/core';
import { IBook } from './book';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {tap,catchError,map} from 'rxjs/operators';
 
@Injectable({
    providedIn:'root'
})

export class BookService {
  private bookUrl = './api/books/books.json';
  constructor(private http:HttpClient){};
getBooks():Observable<IBook[]>{
    return this.http.get<IBook[]>(this.bookUrl).pipe(
      tap(data => console.log('All: '+ JSON.stringify(data) )),
      catchError(this.handleError)
    );
  }
  //book detail component
  getBook(id: number): Observable<IBook | undefined> {
    return this.getBooks()
      .pipe(
        map((books: IBook[]) => books.find(p => p.bookId === id))
      );
  }
    private handleError(err: HttpErrorResponse){
      let errorMessage= '';
      if(err.error instanceof ErrorEvent){
        //handle clientside error
        errorMessage = `An error occured: ${err.error.message}`;
      }
      else{
        //handle serverside error
        errorMessage = `server returned code ${err.status}, error message is : ${err.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);

   

}
}