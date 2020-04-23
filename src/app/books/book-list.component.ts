import { Component, OnInit } from '@angular/core';
import { IBook } from './book';
import { BookService } from './book.service';
import {ActivatedRoute} from '@angular/router';




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
  filteredBooks:IBook[] = [];
  //we use interface as a datatype for strong typing
  books:IBook[] = [] ;
   //declare default calues
  //  constructor(){
  //   this.filteredBooks = this.books;
  //   this.listFilter = 'parker';
  // }

  //dependency injection
  constructor(private bookService:BookService,
    private route : ActivatedRoute){
     
  }
  

  

  onRatingClicked(message:string){
   this.pageTitle = 'Book List ' + message;
  }
 
  //define the lifecycle hook
  ngOnInit():void{
    
    //we will read query parameters 
   this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';
   this.showImage = this.route.snapshot.queryParamMap.get('showImage') ==='true';
   
  //  this.books = this.bookService.getBooks();
   this.bookService.getBooks().subscribe({
     
     next : books =>{ this.books = books;
    this.filteredBooks = this.performFilter(this.listFilter);
    },
     
     error:err => this.errorMessage= err
    } );
    
    
  }
 
    
  
 
  performFilter(filterBy : string):IBook[]{
    filterBy = filterBy.toLocaleLowerCase();
    return this.books.filter((book: IBook) =>
    book.bookName.toLocaleLowerCase().indexOf(filterBy)!==-1);
  }
  toggleImage():void{
    this.showImage = !this.showImage;
  }
}