import {Injectable} from '@angular/core';
import {User} from './user';
import {MessageService} from '../messages/message.service';

@Injectable({
    providedIn:'root'
})

export class AuthService{
    currentUser : User;
    //variable to track redirect URL
    redirectUrl:string;

    get isLoggedIn() : boolean{
        return !!this.currentUser;
    }

    constructor( private messageService: MessageService){}

    login(userName: string, password : string): void{
        //check if username or password is not entered
        if(!userName || !password){
            this.messageService.addMessage('Please enter your username and password');
            return;
        }

        //check if user is admin
        if(userName === 'admin'){
            this.currentUser = {
                id:1,
                userName:userName,
                isAdmin:true
            };
            this.messageService.addMessage("Admin Login");
            return;
        }
        //user other than admin
        this.currentUser = {
            id:2,
            userName:userName,
            isAdmin :false
        };
        this.messageService.addMessage(`User: ${this.currentUser.userName} logged in`)
    }

   
}