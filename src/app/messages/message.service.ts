import {Injectable} from '@angular/core';
@Injectable({
    providedIn:'root'
})
export class MessageService{
    //declare a array variable
    private _messages : string[] = [];
    //variable to check if messages r displayed 
    isDisplayed = false;
    //create a getter 
    get messages() : string[]{
        return this._messages;
    }

    //create a method to consolidate date and message obtained
    addMessage(message : string) : void {
        const currentDate = new Date();
        this.messages.unshift(message + ' at ' + currentDate.toLocaleString());

    }

    

  


}