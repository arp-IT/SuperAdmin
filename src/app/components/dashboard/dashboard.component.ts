import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private user: UserService,  private router: Router,private route: ActivatedRoute,) { }

  ngOnInit() {
  }

  logout() {
      this.user.set(false);
      this.user.get();
      this.user.setUserLoggedIn(this.user.value);
      this.router.navigate(['']);
  }

  AddOrganization() {
      this.router.navigate([ './AddOrganization' ], { relativeTo: this.route });
  }

  ViewOrganizationList() {
    this.router.navigate([ './ViewOrganizationList' ], { relativeTo: this.route });
  }

}
