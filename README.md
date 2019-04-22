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
 ```
 export class BooksResolverService implements Resolve<Book[] | BookTrackerError> {

  constructor(private dataService: DataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book[] | BookTrackerError> {
    /**
     * Angular is now automatically subscribing to 'getAllBooks()
     * We can then remove '.subscribe...' when calling this method.
     * See DashBoard Component.
     */
    return this.dataService.getAllBooks()
      .pipe(
        catchError(err => of(err))
      );
  }
```
 * Code BookResolverService
 * (2) Update route
 ```
 { path: 'dashboard', component: DashboardComponent, resolve:{resolvedBooks: BooksResolverService} },
 ```
 * (3) Replace the Dashboard Component method
 ```
 ngOnInit() {

    /* Updated to use 'BookResolverService' */
    let resolvedData: Book[] | BookTrackerError =
          this.route.snapshot.data['resolvedBooks'];

    if (resolvedData instanceof BookTrackerError) {
      console.error(`Dashboard component error: ${resolvedData.friendlyMessage}`);
    }
    else {
      this.allBooks = resolvedData;
    }

    /* --- ORIGINAL METHOD ---
    this.dataService.getAllBooks()
      .subscribe(
        (data: Book[]) => this.allBooks = data,
        (err: BookTrackerError) => console.error(err.friendlyMessage),
        () => console.log('All done getting books')
      );
    */

 ```
 ## Using http Interceptor

 ## Using http Interceptors with cache