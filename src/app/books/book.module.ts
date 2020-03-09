import { NgModule } from '@angular/core';
import { BookListComponent } from './book-list.component';
import { ConvertToSpacesPipe } from '../shared/covert-to-spaces.pipe';
import { BookDetailComponent } from './book-detail.component';
import { RouterModule } from '@angular/router';
import { BookDetailGuard } from './book-detail.guard';
import { SharedModule } from '../shared/shared.module';
import { BookEditComponent } from './book-edit.component';
import { BookEditGuard } from './book-edit.guard';


@NgModule({
  imports: [
    RouterModule.forChild([
      {path:"books",component:BookListComponent},
      {path:"books/:id",canActivate:[BookDetailGuard],component:BookDetailComponent},
      {path:"books/:id/edit",canDeactivate:[BookEditGuard],component:BookEditComponent}
      
    ]),
    SharedModule
  ],
  declarations: [
    BookListComponent,
    ConvertToSpacesPipe,
    BookDetailComponent,
    BookEditComponent,
  ]
 
})
export class BookModule { }
