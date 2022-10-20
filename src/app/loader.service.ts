import {Injectable} from '@angular/core';
import {ListService} from "./list/list.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "./user/user.service";
import {map, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(public listService: ListService,
              private route: ActivatedRoute,
              private userService: UserService) {
  }

  load = () =>
    this.route.paramMap
      .pipe(map(params => this.userService.resolveUser(params)))
      .pipe(switchMap(userId => this.listService.loadItemsGroups(userId)));
}
