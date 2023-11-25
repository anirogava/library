import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchTerm: string = '';

  @Output() searchEvent = new EventEmitter<string>();

  constructor() { }


  search(): void {
    this.searchEvent.emit(this.searchTerm);
  }
}
