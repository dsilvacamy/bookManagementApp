import {NgModule} from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';
import {RouterModule} from '@angular/router';

@NgModule({
imports:[
    SharedModule,
    RouterModule.forChild([
        {path:'login',component:LoginComponent}
    ])
],
declarations:[
    LoginComponent
]
})

export class UserModule{}