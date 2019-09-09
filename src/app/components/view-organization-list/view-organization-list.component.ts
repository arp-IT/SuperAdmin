import { Component, OnInit, ViewChild } from '@angular/core';
import { GetOrganizationListService } from 'src/app/Services/get-organization-list.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material';
import { ActivatedRoute, Router, Params, NavigationExtras } from '@angular/router';

export interface PeriodicElement {
  orgUserName: string;
  orgName: string;
  orgAddress: string;
  orgPinCode: string;
  orgContactno: string;
}


@Component({
  selector: 'app-view-organization-list',
  templateUrl: './view-organization-list.component.html',
  styleUrls: ['./view-organization-list.component.css']
})
export class ViewOrganizationListComponent implements OnInit {
  restItems: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  onLoad() {
      this.getOrgList.restItemsServiceGetRestItems()
      .subscribe(
        restItems => {
          this.restItems = restItems;
          this.ELEMENT_DATA = this.restItems;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error => {
          if (error.status === 0) { 
            alert('check your Internet connection');
          }
        }
      );
  }

  onEdit(id:string) {
    this.router.navigate(['../UpdateOrganization'], <NavigationExtras>{
      queryParams: <Params>{
        term: id
      },
      relativeTo: this.route
    });
  }

  ELEMENT_DATA: PeriodicElement[];

  dataSource: any;
  displayedColumns: string[] = ['orgUserName', 'orgName', 'orgAddress', 'orgPinCode' ,'orgContactno', 'Edit', 'Delete' ];
  constructor( private  getOrgList : GetOrganizationListService, private router: Router, private route: ActivatedRoute) {
    
  }
  

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.onLoad();
  }

}
