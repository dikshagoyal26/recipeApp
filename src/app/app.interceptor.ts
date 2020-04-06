import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor{
    constructor(private authService:AuthService){}
    intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): Observable<HttpEvent<any>> {
        console.log({req})
        const copiedReq=req.clone({params:req.params.set('auth',this.authService.getToken())})        
        return next.handle(copiedReq)
    }
    
}