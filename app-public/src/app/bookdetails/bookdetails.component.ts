import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {BookserviceService} from "../bookservice.service";
import {Book} from "../book";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {

  newbook:Book;
  constructor(private bookService: BookserviceService, private route:ActivatedRoute) { }

  ngOnInit() { this.route.params.pipe(
    switchMap((params: Params) => {
      return this.bookService.getSingleBook(params['bookid'])
    })
  )
    .subscribe((newbook: Book) => {
      this.newbook = newbook;
    })
  }

}
