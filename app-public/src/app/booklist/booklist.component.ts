import { Component, OnInit } from '@angular/core';
import {Book} from "../book";
import {BookserviceService} from "../bookservice.service";

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {
  books: Book[]
  constructor(private bookService: BookserviceService) { }

  ngOnInit() {
    this.bookService
      .getBooks()
      .then((books: Book[]) => {
        this.books = books.map(book => {
          return book;
        });
      });
  }

}
