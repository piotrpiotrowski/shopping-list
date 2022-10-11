import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {MatSidenav} from '@angular/material/sidenav';
import {UserService} from "../user/user.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  paths: string[][] = [
    ['', 'Build list'],
    ['selected-items', 'Display list'],
    ['history-list', 'Display history']
  ];

  constructor(private router: Router, public userService: UserService) {
  }

  @Input() nav!: MatSidenav;

  public routeTo(path: string): any {
    return this.router.navigateByUrl(`${path}/${this.userService.getUserId()}`).then(() => this.nav.close());
  }
}
