import {Component, Input} from '@angular/core';
import {Route, Router} from '@angular/router';
import {MatSidenav} from '@angular/material/sidenav';
import {routes} from '../app-routes';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  paths: string[];
  private labels = new Map<string, string>(
    [
      ['', 'Build list'],
      ['selected-items', 'Display list'],
      ['history-list', 'Display history'],
    ]
  );

  constructor(private router: Router) {
    this.paths = routes.map((route: Route) => route.path!);
  }

  @Input() nav!: MatSidenav;

  public routeTo(path: string): any {
    return this.router.navigateByUrl(path).then(_ => this.nav.close());
  }

  getLabel(key: string) {
    return this.labels.get(key)!;
  }
}
