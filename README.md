# Booktracker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.0.

 Description: Demo project for using the common/http and angular/rxjs APIs

 ## Adding Header definition to a http get
 *
 ```
 getBookById(id: number): Observable<Book> {
    console.log('In getBookById()')
    return this.http.get<Book>(`/api/books/${id}`,
      {
        headers: new HttpHeaders({
          'Accept': 'application/jason',
          'Authorization': 'my-token'
        })
      });
  }
 ```
 ## Using http resolvers
 * (1) Run: ```ng g s core/BookResolver --nospec --dry-run```
 * Code BookResolverService
 * (2) Update route
 ```
 { path: 'dashboard', component: DashboardComponent, resolve:{resolvedBooks: BooksResolverService} },
 ```
 * (3) Replace the Dashboard Component method
 ```

 ```
 ## Using http Interceptor

 ## Using http Interceptors with cache