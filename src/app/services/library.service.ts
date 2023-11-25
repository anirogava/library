import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../models/library.model';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private jsonFolderPath = 'assets/data';
  private localStorageKey = 'libraryData';
  private booksSubject: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);

  constructor(private http: HttpClient) {
    this.loadBooks();
  }

  private loadBooks(): void {
    const storedData = localStorage.getItem(this.localStorageKey);

    if (storedData) {
      const initialData: Book[] = JSON.parse(storedData);
      this.booksSubject.next(initialData);
    } else {
      const jsonFileUrl = `${this.jsonFolderPath}/data.json`;
      this.http.get<Book[]>(jsonFileUrl).subscribe(
        (books) => {
          this.booksSubject.next(books);
          this.updateLocalStorage(books);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  private updateLocalStorage(books: Book[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(books));
  }

  isBookExists(newBook: Book): boolean {
    const existingBooks = this.booksSubject.value;
    return existingBooks.some(
      (book) => book.title === newBook.title && book.author === newBook.author
    );
  }

  addBook(newBook: Book): void {
    const updatedBooks = [...this.booksSubject.value, newBook];
    this.booksSubject.next(updatedBooks);
    this.updateLocalStorage(updatedBooks);
  }

  deleteBook(bookId: string): void {
    const updatedBooks = this.booksSubject.value.filter(
      (book) => book.id !== bookId
    );
    this.booksSubject.next(updatedBooks);
    this.updateLocalStorage(updatedBooks);
  }

  getBooks(): BehaviorSubject<Book[]> {
    return this.booksSubject;
  }

  getBookDetails(id: string | null): Book | undefined {
    return this.booksSubject.value.find(book => book.id === id);
  }
}
