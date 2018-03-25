import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public loginClick:boolean;
  
  constructor(public bhushanService: ServiceService, public router: Router){


  }
  
  ngOnInit() {
    this.loginClick = true;
    this.bhushanService.afterLogin = false;
  }

  navigateToLogin() {
    this.loginClick = false
    this.bhushanService.afterLogin = true;
    this.router.navigate(['login']);
    
  }

}
