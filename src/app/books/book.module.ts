import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import { RouterModule } from '@angular/router';
import { BookListComponent } from './book-list.component';
import { ConvertToSpacesPipe } from '../shared/covert-to-spaces.pipe';
import { BookDetailComponent } from './book-detail.component';
import { BookDetailGuard } from './book-detail.guard';
import { BookEditComponent } from './book-edit.component';
import { BookEditGuard } from './book-edit.guard';
import { BookData } from './book-data';



@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(BookData),
    RouterModule.forChild([
      {path:"books",component:BookListComponent},
      {path:"books/:id",canActivate:[BookDetailGuard],component:BookDetailComponent},
      {path:"books/:id/edit",canDeactivate:[BookEditGuard],component:BookEditComponent}
      
    ])
    
  ],
  declarations: [
    BookListComponent,
    ConvertToSpacesPipe,
    BookDetailComponent,
    BookEditComponent,
  ]
 
})
export class BookModule { }
