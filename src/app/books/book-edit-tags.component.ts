import {Component, OnInit} from '@angular/core';
import {IBook} from './book';
import {ActivatedRoute} from '@angular/router';

@Component({
    templateUrl:'./book-edit-tags.component.html'
})

export class BookEditTagsComponent implements OnInit {
    errorMessage:string;
    newTags = '';
   // book = { id:1, category:'test', tags: ['test']};
    book:IBook;
    constructor(private route : ActivatedRoute){}

    ngOnInit():void{
      this.route.parent.data.subscribe( data =>{
        this.book = data['resolvedData'].book;                                    
      }); 
    }

    //add the defined tags
    addTags() : void{
        //if no tags
        if (!this.newTags) { 
            this.errorMessage = 'Enter the search keywords separated by commas and then press Add';
            
          } else{
            const tagArray = this.newTags.split(',');
            this.book.tags = this.book.tags ? this.book.tags.concat(tagArray) : tagArray;
            this.newTags = '';
            this.errorMessage = '';
          }
    }

     // Remove the tag from the array of tags.
  removeTag(idx: number): void {
    this.book.tags.splice(idx, 1);
  }
}