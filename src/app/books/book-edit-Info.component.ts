import {Component,OnInit,ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {IBook} from './book';
import {ActivatedRoute} from '@angular/router';

@Component({
    templateUrl:'./book-edit-info-component.html'
})

export class BookEditInfoComponent implements OnInit{
    @ViewChild(NgForm,  {static:false}) bookForm :NgForm;
    errorMessage : string;
   // book = {id:1, bookName: 'test', bookCode: 'test',description:'test'};
   book:IBook;

    constructor(private route : ActivatedRoute){}

    ngOnInit() : void{
//we use observable to prefetch the data using resolver, to differentiate between add and edit
        this.route.parent.data.subscribe(data => {
            //we get the reference to the form 
            if(this.bookForm){
                //reset the form validations
                this.bookForm.reset();
            }
            //we set the resolved data to local data
            this.book = data['resolvedData'].book;
        }); 


    }
}