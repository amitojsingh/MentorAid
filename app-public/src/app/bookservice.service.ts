import { Injectable } from '@angular/core';
import {Book} from './book';
import {Http, Response} from "@angular/http";

@Injectable({
  providedIn: 'root'
})
export class BookserviceService {
  private BooksUrl = 'http://localhost:3000/api/Books';
  getSingleBook(BookId:String): Promise<void | Book>{
    return this.http.get(this.BooksUrl + '/'+BookId)
      .toPromise()
      .then(response => response.json() as Book)
      .catch(this.handleError);
  }
  createBook(newBook:Book): Promise<void | Book>{
    return this.http.post(this.BooksUrl,newBook)
      .toPromise()
      .then(response=> response.json() as Book)
      .catch(this.handleError);
  }
  updteBook(BookId:String,newBook:Book):Promise<void |Book>{
    return this.http.put(this.BooksUrl+'/'+BookId,newBook)
      .toPromise()
      .then(response=>response.json()as Book)
      .catch(this.handleError);
  }
  deleteBook(BookId:String):Promise<void |Book>{
    return this.http.delete(this.BooksUrl+'/'+BookId)
      .toPromise()
      .then(response=>response.json() as Book)
      .catch(this.handleError)
  }

  constructor(private http:Http) { }
  getBooks():Promise<void | Book[]>{

    return this.http.get(this.BooksUrl)
      .toPromise()
      .then(response => response.json() as Book[])
      .catch(this.handleError);
  }

  private handleError(error: any){
    console.log("error");
  }
}
