import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LibraryService} from "../../services/library.service";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent {
  addBookForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private libraryService: LibraryService) {
    this.addBookForm = this.fb.group({
      title: ['', Validators.required],
      id: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.addBookForm.valid) {
      const newBook = this.addBookForm.value;
      if (this.libraryService.isBookExists(newBook)) {
        this.errorMessage = 'Book already exists in the library.';
      } else {
        this.libraryService.addBook(newBook);
        this.addBookForm.reset();
        this.errorMessage = '';
      }
    } else {
      this.errorMessage = 'All fields are required.';
    }
  }
}
