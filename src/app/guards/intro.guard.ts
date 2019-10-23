import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {Storage} from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {

  constructor(
      private router: Router,
      private storage: Storage
  ) { }

  async canActivate() {
    const isIntroShowed = await this.storage.get('isIntroShowed');
    if(isIntroShowed) {
      return true;
    } else {
      this.router.navigateByUrl('/intro');
    }
  }
  
}
