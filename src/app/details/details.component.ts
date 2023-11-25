import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibraryService } from '../services/library.service';
import { Book } from '../models/library.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  book: Book | undefined;

  constructor(
    private route: ActivatedRoute,
    private libraryService: LibraryService
  ) { }

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    this.book = this.libraryService.getBookDetails(bookId);
  }
}
