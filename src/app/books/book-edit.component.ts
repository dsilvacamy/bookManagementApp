import { Component, OnInit,OnDestroy,AfterViewInit,ViewChildren,ElementRef} from '@angular/core';
import {IBook} from './book';
import {BookService} from './book.service';
import {debounceTime} from 'rxjs/operators';
import {ActivatedRoute,Router} from '@angular/router';
import { Subscription,Observable,merge,fromEvent } from 'rxjs';
import { FormGroup,FormBuilder,FormArray,FormControl,Validators,FormControlName } from '@angular/forms';
import {NumberValidator} from '../shared/number.validator';
import {GenericValidator} from '../shared/generic-validator';

@Component({
  templateUrl: './book-edit.component.html'
})
export class BookEditComponent implements OnInit,AfterViewInit,OnDestroy {
  @ViewChildren(FormControlName,{read:ElementRef}) formInputElements:ElementRef[];
  pageTitle= "Edit Book Detail";
  book:IBook;
  private sub:Subscription;
  bookForm: FormGroup;
  errorMessage:string;

  //use with generic validation message class
  displayMessage: {[key:string]: string} = {};
  private validationMessages:{[key:string] : {[key:string]: string} };
  private genericValidator : GenericValidator; 

  get tags() : FormArray{
    return this.bookForm.get('tags') as FormArray;
  }

  //dependency injection
  constructor(private bookService: BookService,
    private route : ActivatedRoute,
    private router:Router,
    private fb: FormBuilder) { 
        //define all validation rules for the form
      this.validationMessages = {
      bookName: {
        required: 'Book name is required.',
        minlength: 'Book name must be at least three characters.',
        maxlength: 'Book name cannot exceed 50 characters.'
      },
     bookCode: {
        required: 'Book code is required.'
      },
      starRating: {
        range: 'Rate the product between 1 (lowest) and 5 (highest).'
      }
    };
  
     // Define an instance of the validator for use with this form,
      // passing in this form's set of validation messages.
      this.genericValidator = new GenericValidator(this.validationMessages);
    }


  

  ngOnInit() {
    //create a root form group
    this.bookForm = this.fb.group({
      bookName :['',[Validators.required,
                      Validators.minLength(3),
                    Validators.maxLength(50)]],
      bookCode: ['',Validators.required],
      starRating:['',NumberValidator.range(1,5)],
      tags:this.fb.array([]),
      description:''
   });
   // read id of book from URL
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getBook(id);
      }
    );
  }

  //we use ngOnDestroy to clean the subscription by unsubscribing
  ngOnDestroy(): void{
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.bookForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.bookForm);
    });
  }

  addTag(): void {
    this.tags.push(new FormControl());
  }

  deleteTag(index: number): void {
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }
  //definition of getBook() to read id
 getBook(id:number): void{
   this.bookService.getBook(id)
   .subscribe({
    next : (book : IBook) =>this.displayBook(book),
    error : err => this.errorMessage = err
   });
 }

 displayBook(book:IBook):void{
  //if form was already used, it will reset the form 
  if(this.bookForm){
      this.bookForm.reset();
   }
   //get the data model
   this.book = book;
   //change the pageTitle
   if(this.book.id === 0){
     this.pageTitle = "Add Book";
   }
   else{
   this.pageTitle =`Edit Book: ${this.book.bookName}`;
   }

   //update the data on the form
   this.bookForm.patchValue({
     bookName : this.book.bookName,
     bookCode :this.book.bookCode,
     starRating : this.book.starRating,
     description: this.book.description
   });
   this.bookForm.setControl('tags',this.fb.array(this.book.tags || []));
 }

 //delete product
deleteBook():void{
  if(this.book.id === 0){
    //dont delete , if the book was not saved
    this.onSaveComplete();
  }
  else{
    if(confirm(`Really delete the book: ${this.book.bookName}?`)){
      this.bookService.deleteBook(this.book.id)
      .subscribe({
        next : () => this.onSaveComplete(),
        error : err => this.errorMessage = err
      });
    }
  }
}

 saveBook():void{
//no point of saving the form if the form is not valid or dirty
   if(this.bookForm.valid){
     if(this.bookForm.dirty){
      //we create copy of the original form Structure
      const b = {...this.book,...this.bookForm.value};
      if(b.id === 0){
        //we create new book
        this.bookService.createBook(b)
        .subscribe({
          next : () => this.onSaveComplete(),
          error : err => this.errorMessage = err
        });
      }
      else{
        //we update the existing book details
        this.bookService.updateBook(b)
        .subscribe({
          next : () => this.onSaveComplete(),
          error : err => this.errorMessage = err
        });
      }
     }
     else{
      //if the form is valid and not dirty
      this.onSaveComplete();
    }
   }
   //if the form is not valid
   else{
     this.errorMessage="Please correct validation errors";
   }
}



onSaveComplete():void{
  //reset the form to clear the flags
  this.bookForm.reset();
  this.router.navigate(['/books']);
}

}
