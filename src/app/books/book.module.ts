import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BookListComponent } from './book-list.component';
import { ConvertToSpacesPipe } from '../shared/covert-to-spaces.pipe';
import { BookDetailComponent } from './book-detail.component';
import { BookDetailGuard } from './book-detail.guard';
import { BookEditComponent } from './book-edit.component';
import{BookResolver} from './book-resolver.service';
//import { BookEditGuard } from './book-edit.guard';
import { BookData } from './book-data';
import { BookEditInfoComponent } from './book-edit-Info.component';
import { BookEditTagsComponent } from './book-edit-tags.component';
//import {AuthGuard} from '../user/auth.guard';
import { BookEditGuard } from './book-edit.guard';



@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
     /* {
        //component less route  
        path:"books",
        //add the guard directly to parent 
        canActivate:[AuthGuard],
        children:[*/
          {
            path:"",
            component:BookListComponent
          },
          {
            path:":id",
            component:BookDetailComponent,
            resolve:{resolvedData : BookResolver}
            },
            {
            path:":id/edit",
            component:BookEditComponent,
            canDeactivate:[BookEditGuard],
            resolve: {resolvedData : BookResolver},
            children:[
              {path:'',redirectTo:'info',pathMatch:'full'},
              {path:'info',component: BookEditInfoComponent},
              {path:'tags',component:BookEditTagsComponent}
            ]
          }

        ]
     // },
      
    //]
    )
    // InMemoryWebApiModule.forRoot(BookData),
    // RouterModule.forChild([
    //   {path:"books",component:BookListComponent},
    //   {path:"books/:id",canActivate:[BookDetailGuard],component:BookDetailComponent},
    //   {path:"books/:id/edit",canDeactivate:[BookEditGuard],component:BookEditComponent}
      
    //])
    
  ],
  declarations: [
    BookListComponent,
    ConvertToSpacesPipe,
    BookDetailComponent,
    BookEditComponent,
    BookEditInfoComponent,
    BookEditTagsComponent
  ]
 
})
export class BookModule { }
