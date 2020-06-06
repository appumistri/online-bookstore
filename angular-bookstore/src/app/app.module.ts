import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { BookCategoryComponent } from './components/book-category/book-category.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SearchBooksComponent } from './components/search-books/search-books.component';
import { BookService } from './services/book.service';
import { CartStatusComponent } from './components/cart-status/cart-status.component';

const routes: Routes = [
    { path: 'books', component: BookListComponent },
    { path: 'books/:id', component: BookDetailsComponent },
    { path: 'search/:keyword', component: BookListComponent },
    { path: 'category/:id', component: BookListComponent },
    { path: '', redirectTo: 'books', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    declarations: [
        AppComponent,
        BookListComponent,
        PageNotFoundComponent,
        BookCategoryComponent,
        SearchBooksComponent,
        BookDetailsComponent,
        CartStatusComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        NgbModule
    ],
    providers: [BookService],
    bootstrap: [AppComponent]
})
export class AppModule { }