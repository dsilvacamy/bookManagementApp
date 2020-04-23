import { Component} from '@angular/core';
import {IBook, BookResolved} from './book';
import {BookService} from './book.service';
import {MessageService} from '../messages/message.service';
import {ActivatedRoute,Router} from '@angular/router';
@Component({
  templateUrl: './book-edit.component.html',
  styleUrls:['./book-edit.component.css']
})
 
export class BookEditComponent {
  pageTitle= "Edit Book Detail";
  errorMessage:string;

  //define a variable that hold the state
  private dataIsValid: { [key: string]: boolean } = {};

  //this will help us to compare the changes 
  get isDirty(): boolean {
    return JSON.stringify(this.originalBook) !== JSON.stringify(this.currentBook);
  }

  private currentBook: IBook;
  private originalBook: IBook;

  //returns the current book
  get book(): IBook {
    return this.currentBook;
  }

//sets the current book , to the passed in value
  set book(value: IBook) {
    this.currentBook = value;
    // Clone the object to retain a copy
    this.originalBook = value ? { ...value } : null;
  }

   //dependency injection
   constructor(private bookService: BookService,
    private messageService : MessageService,
    private route: ActivatedRoute,
    private router : Router)
{}

ngOnInit(): void {
  this.route.data.subscribe(data => {
    const resolvedData: BookResolved = data['resolvedData'];
    this.errorMessage = resolvedData.error;
    this.displayBook(resolvedData.book);
  });
}

  
 displayBook(book:IBook):void{
 
 this.book = book;
  if(!this.book){
      this.pageTitle ="No Book Found";
   }
 else 
 {
   if(this.book.id === 0){
     this.pageTitle = "Add Book";
   }
   else  {
   this.pageTitle =`Edit Book: ${this.book.bookName}`;
   }
 }
}

 //delete product
deleteBook():void{
  if(this.book.id === 0){
    //dont delete , if the book was not saved
    this.onSaveComplete(`${this.book.bookName} was deleted`);
  }
  else{
    if(confirm(`Really delete the book: ${this.book.bookName}?`)){
      this.bookService.deleteBook(this.book.id)
      .subscribe({
        next : () => this.onSaveComplete(`${this.book.bookName} was deleted`),
        error : err => this.errorMessage = err
      });
    }
  }
}

//takes path of the tab and then performs validations
isValid(path?: string): boolean {
  this.validate();
  if (path) {
    return this.dataIsValid[path];
  }
  return (this.dataIsValid &&
    Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
}

//perform reset after completion of CanDeactivate guard activity
reset(): void {
  this.dataIsValid = null;
  this.currentBook = null;
  this.originalBook = null;
}

 saveBook():void{
  if(this.isValid()){
      if(this.book.id === 0){
        //we create new book
        this.bookService.createBook(this.book)
        .subscribe({
          next : () => this.onSaveComplete(`The new ${this.book.bookName} book was saved`),
          error : err => this.errorMessage = err
        });
      }
    else{
        //we update the existing book details
        this.bookService.updateBook(this.book)
        .subscribe({
          next : () => this.onSaveComplete(`The new ${this.book.bookName} book was updated`),
          error : err => this.errorMessage = err
        });
      }
     }
     else{
      this.errorMessage =  'Please correct the validation errors.';
     }
 }

onSaveComplete(message?: string):void{
 if(message){
   this.messageService.addMessage(message);
 }
 this.reset();

  this.router.navigate(['/books']);
}

//perform validations
 validate(): void {
    // Clear the validation object
    this.dataIsValid = {};

    // 'info' tab
    if (this.book.bookName &&
      this.book.bookName.length >= 3 &&
      this.book.bookCode) {
      this.dataIsValid['info'] = true;
    } else {
      this.dataIsValid['info'] = false;
    }

    // 'tags' tab
    if (this.book.category &&
      this.book.category.length >= 3) {
      this.dataIsValid['tags'] = true;
    } else {
      this.dataIsValid['tags'] = false;
    }
  }
}
