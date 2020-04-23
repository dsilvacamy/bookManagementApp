import { Injectable } from '@angular/core';
import { IBook } from './book';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError, of} from 'rxjs';
import {tap,catchError,map} from 'rxjs/operators';
 


@Injectable({
    providedIn:'root'
})

export class BookService {
  private bookUrl = 'api/books';
  constructor(private http:HttpClient){};

getBooks():Observable<IBook[]>{
    return this.http.get<IBook[]>(this.bookUrl).pipe(
      tap(data => console.log('All: '+ JSON.stringify(data) )),
      catchError(this.handleError)
    );
  }
  //book detail component
  // getBook(id: number): Observable<IBook | undefined> {
  //   return this.getBooks()
  //     .pipe(
  //       map((books: IBook[]) => books.find(p => p.bookId === id))
  //     );
  // }

  //definition for get request
  getBook(id:number): Observable<IBook | undefined>{
    //check if id is 0 , yes then we need to initialize new book
    if(id === 0){
      //takes book and returns an Observable
      return of(this.initializeBook());
    }
    //if id is not 0
    const url = `${this.bookUrl}/${id}`;
    return this.http.get<IBook>(url)
    .pipe(
      tap(data => console.log('getProduct: ' + JSON.stringify(data))),
      catchError(this.handleError) 
    );
  }

  //create book
  createBook(book:IBook):Observable<IBook>{
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    book.id= null; //for in-memory-web-api
    return this.http.post<IBook>(this.bookUrl,book,{headers})
    .pipe(
      tap(data => console.log('CreateProduct: '+JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
   // private handleError(err: HttpErrorResponse)
   private handleError (err){
      let errorMessage: string;
      if(err.error instanceof ErrorEvent){
        //handle clientside error
        errorMessage = `An error occured: ${err.error.message}`;
      }
      else{
        //handle serverside error
        //errorMessage = `server returned code ${err.status}, error message is : ${err.message}`;
        errorMessage = `server returned code ${err.status}, error message is : ${err.body.error}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    }
    //definition for updateBook method
    updateBook(book:IBook):Observable<IBook>{
      //get headers
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      //set url
      const url = `${this.bookUrl}/${book.id}`;
      return this.http.put<IBook>(url,book,{headers})
      .pipe(
        tap(()=> console.log("update Book: "+book.id)),
        map(()=>book),
        catchError(this.handleError)
      );
    }
   
    //definition for deleting book 
    deleteBook(id: number):Observable<{}>{
      const headers = new HttpHeaders({'Content-Type':'application/json'});
      const url = `${this.bookUrl}/${id}`;
      return this.http.delete<IBook>(url,{headers})
      .pipe(
        tap(data => console.log('delete product : '+id)),
        catchError(this.handleError)
      );
    }

    
 private initializeBook():IBook{
   //returns an initialized book
  return{
  id:0,
  bookName:null,
  bookCode:null,
  category:null,
  tags: [],
  releaseDate:null,
  description:null,
  price:null,
  starRating:null,
  imageUrl:null
};
}
}
