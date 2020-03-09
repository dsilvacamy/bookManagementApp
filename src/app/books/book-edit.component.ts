import { Component, OnInit,OnDestroy } from '@angular/core';
import {IBook} from './book';
import {BookService} from './book.service';
import {ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup,FormBuilder } from '@angular/forms';

@Component({
  templateUrl: './book-edit.component.html'
})
export class BookEditComponent implements OnInit {
  pageTitle= "Edit Book Detail";
  book:IBook;
  private sub:Subscription;
  bookForm: FormGroup;
  //dependency injection
  constructor(private bookService: BookService,
    private route : ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit() {
    //create a root form group
    this.bookForm = this.fb.group({
      productName :'',
      productCode: '',
      starRating:'',
      tag:'',
      description:''
   });
   // read id of book from URL
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        //this.getBook(id);
      }
    );
  }

  //we use ngOnDestroy to clean the subscription by unsubscribing
  ngOnDestroy(): void{
    this.sub.unsubscribe();
  }

  //definition of getBook() to read id
 

}
