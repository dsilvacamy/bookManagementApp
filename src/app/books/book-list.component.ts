import { Component, OnInit } from '@angular/core';
import { IBook } from './book';
import { BookService } from './book.service';


@Component({
  //since we are using routing the selector is not required
    //selector:'bm-books',
    templateUrl:'./book-list.component.html',
    //encapsulating component styles
    styleUrls:['./book-list.component.css']
})
export class BookListComponent implements OnInit{
 pageTitle:string// = "Book List";
 
  imageWidth:number=75;
  imageMargin:number=7;
  //to work on show Image button
  showImage:boolean=false;
  errorMessage:string ;
  //to work on filter by section
  //filterList:string="parker";
  
 
  //function to check input data and also to check the changes
  _listFilter:string;
  get listFilter():string{
    return this._listFilter;
  }

  set listFilter(value:string){
    this._listFilter = value;
    this.filteredBooks = this.listFilter ? this.performFilter(this.listFilter) : this.books;
  }
//create a new variable to hold the filtered array
  filteredBooks:IBook[];
  //we use interface as a datatype for strong typing
  books:IBook[] ;
   //declare default calues
  //  constructor(){
  //   this.filteredBooks = this.books;
  //   this.listFilter = 'parker';
  // }

  //dependency injection
  constructor(private bookService:BookService){

  }

  onRatingClicked(message:string){
   this.pageTitle = 'Book List ' + message;
  }
  performFilter(filterBy : string):IBook[]{
    filterBy = filterBy.toLocaleLowerCase();
    return this.books.filter((book: IBook) =>
    book.bookName.toLocaleLowerCase().indexOf(filterBy)!==-1);
  }
  toggleImage():void{
    this.showImage = !this.showImage;
  }
  //define the lifecycle hook
  ngOnInit():void{
  //  this.books = this.bookService.getBooks();
   this.bookService.getBooks().subscribe({
     next : book =>{ this.books = book
    this.filteredBooks = this.books;
    },
     
     error:err => this.errorMessage= err
    } );
    

  }
 
}