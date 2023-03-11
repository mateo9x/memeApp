import {Component, OnInit} from '@angular/core';
import {AuthenticateService} from "../../../service/authenticate.service";

@Component({
  template: `

  `,
  selector: 'logout'
})
export class LogoutComponent implements OnInit {

  constructor(private authenticateService: AuthenticateService) {
  }

  ngOnInit() {
    this.authenticateService.logoutUser();
  }

}
