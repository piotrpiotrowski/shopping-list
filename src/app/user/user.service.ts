import {Injectable} from '@angular/core';
import {ParamMap} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly DEFAULT_USER = 'p';
  private readonly KNOWN_USERS = [this.DEFAULT_USER, 'm'];
  private foundUserId: string | null = null;

  constructor() {
  }

  resolveUser(params: ParamMap) {
    if (this.foundUserId) {
      return this.foundUserId;
    }
    let userId = params.get('userId') || this.DEFAULT_USER;
    this.foundUserId = this.KNOWN_USERS.includes(userId) ? userId : this.DEFAULT_USER;
    return this.foundUserId;
  }

  getUserId = () => this.foundUserId || this.DEFAULT_USER;
}
