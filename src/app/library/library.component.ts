import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../services/library.service';
import { Book } from '../models/library.model';
import {MatDialog} from "@angular/material/dialog";
import {DeleteBookComponent} from "./delete-book/delete-book.component";

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  books!: Book[];
  filteredBooks!: Book[];
  noBooksFound: boolean = false;

  constructor(private libraryService: LibraryService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.libraryService.getBooks().subscribe(books => {
      this.books = books;
      this.filteredBooks = this.books;
    });
  }

  onSearch(searchTerm: string): void {
    if (searchTerm) {
      this.filteredBooks = this.books.filter(book => book.author.toLowerCase().includes(searchTerm.toLowerCase()));
      this.noBooksFound = this.filteredBooks.length === 0;
    } else {
      this.filteredBooks = this.books;
      this.noBooksFound = false;
    }
  }
  onDelete(book: Book): void {
    const dialogRef = this.dialog.open(DeleteBookComponent, {
      data: { message: `Are you sure you want to delete ${book.title}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.libraryService.deleteBook(book.id);
      }
    });
  }
}
