import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardService } from './auth-guard.service';
import { UserloginComponent } from './userlogin/userlogin.component';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor( private authService : AuthGuardService, private router : Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.IsAuthenticated()){
      return true;
    }else {
      this.router.navigate(['/userlogin'])
      return false;
    }
  }

  
}

