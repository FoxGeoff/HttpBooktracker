import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book } from 'app/models/book';
import { DataService } from 'app/core/data.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styles: []
})
export class EditBookComponent implements OnInit {

  selectedBook: Book;

  constructor(private route: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit() {
    let bookID: number = parseInt(this.route.snapshot.params['id']);
    this.dataService.getBookById(bookID)
      .subscribe(
        (data: Book) => this.selectedBook = data,
        (err:any) => console.log(err),
        () => console.log('All done getting the select book')
      );
  }

  setMostPopular(): void {
    this.dataService.setMostPopularBook(this.selectedBook);
  }

  saveChanges(): void {
    this.dataService.updateBook(this.selectedBook)
      .subscribe(
        (data: void) => console.log(`${this.selectedBook.title} updated sucessfully.`),
        (err: any) => console.log(err),
        () => console.info('Save changes to book')
      )
  }
}
