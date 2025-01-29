import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private router: Router,
    private location: Location,
  ) { }

  public back(): void {
    this.location.back();
  }

  public navigateTo(route: string, navigationExtras?: NavigationExtras): void {
    this.router.navigate([route], navigationExtras);
  }

  public getNavigationExtras(): NavigationExtras | undefined {
    return this.router.getCurrentNavigation()?.extras;
  }

  public getState<T>(): T {
    return (this.getNavigationExtras()?.state as T);
  }

}
