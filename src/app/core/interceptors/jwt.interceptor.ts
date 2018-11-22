import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {tap} from 'rxjs/internal/operators';

@Injectable()

export class JwtInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            return next.handle(request).pipe(tap(
                (event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                    }
                }, (err: any) => {
                    // if the token has expired.
                    if (err instanceof HttpErrorResponse) {
                        if (err.status === 401) {
                            // this is where you can do anything like navigating
                            this.router.navigateByUrl('login');
                        }
                    }
                }
            ));
        }
        return next.handle(request);
    }
}
