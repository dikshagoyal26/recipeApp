import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private authService:AuthService){}
    canActivate(activateRoute:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        alert("login to access this feature")
        return this.authService.isAuthenticated();
    }
}