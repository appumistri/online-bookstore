import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.css']
})
export class SearchBooksComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void { }

  search(keyword: string) {
    if (keyword.length > 0) {
      this.router.navigate(["/search/" + keyword]);
    }
  }
}
