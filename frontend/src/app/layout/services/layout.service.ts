import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class LayoutService {

  $isOpenSidebar = new BehaviorSubject(false);

  constructor() {}

  changeStatusSideBar(status: any) {
    this.$isOpenSidebar.next(status);
  }
}