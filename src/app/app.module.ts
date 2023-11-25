import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LibraryComponent } from './library/library.component';
import { DetailsComponent } from './details/details.component';
import { SearchComponent } from './search/search.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {AddBookComponent} from "./library/add-book/add-book.component";
import {DeleteBookComponent} from "./library/delete-book/delete-book.component";
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
      LibraryComponent,
      DetailsComponent,
      SearchComponent,
      AddBookComponent,
      DeleteBookComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
