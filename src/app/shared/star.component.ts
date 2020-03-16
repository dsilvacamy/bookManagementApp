import {Component, OnChanges,Input, Output,EventEmitter } from '@angular/core';


@Component({
    selector:'bm-star',
    templateUrl:'./star.component.html',
    styleUrls:['./star.component.css']
}
)
export class StarComponent implements OnChanges{
     @Input() rating: number;
    starWidth:number = 0;
    ngOnChanges():void{
        //rating * width of star / number of stars          
        this.starWidth = this.rating * 75 / 5;
    }
    @Output() RatingClicked : EventEmitter<string>=new EventEmitter<string>();
       
    
    onClick():void{
        this.RatingClicked.emit(`The rating clicked is ${this.rating}`);
    }
    
}