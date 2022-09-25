import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {MatSidenav} from '@angular/material/sidenav';
import {routes} from '../app-routes';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  paths: string[];

  constructor(private router: Router) {
    this.paths = routes.slice(1).map((route: any) => route.path as string);
  }

  @Input() nav!: MatSidenav;

  public routeTo(path: string): any {
    return this.router.navigateByUrl(path).then(_ => this.nav.close());
  }
}
