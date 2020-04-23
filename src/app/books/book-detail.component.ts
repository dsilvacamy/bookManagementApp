import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { IBook, BookResolved} from './book';
import {BookService} from './book.service';

@Component({
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  pageTitle:string ="Book Detail";
  book:IBook | undefined;
  errorMessage = '';
//dependency injection
  constructor(private route : ActivatedRoute, 
    private router : Router
  )  // private bookService : BookService
   { }

    //get route parameter id from the url
  ngOnInit() {
    //we get data using resolver
    const resolvedData : BookResolved = this.route.snapshot.data['resolvedData'];
    //since we also handle error in the resolved data
    this.errorMessage = resolvedData.error;
    // we pass the book to a method
    this.OnBookRetrieved(resolvedData.book);
    // const param = this.route.snapshot.paramMap.get('id');
    // if(param){
    //   const id = +param;
    //   this.getBook(id);
    // }
  }
  //here we get the product using http
    // getBook(id:number){
    //   this.bookService.getBook(id).subscribe({
    //     next:book=> this.book = book,
    //     error:err => this.errorMessage = err 
    //   });   
    // }
    
    OnBookRetrieved(book : IBook) : void{
      //assign retrieved data to local property 
      this.book = book;
      //handles page header
      if(this.book){
        this.pageTitle = `Book Detail : ${this.book.bookName}`;
      }
      else {
      this.pageTitle = 'No Book Found';
      }
    };
  
  onBack():void {
    this.router.navigate(['/books'],
    {queryParamsHandling : "preserve"}
    );
  }

}
