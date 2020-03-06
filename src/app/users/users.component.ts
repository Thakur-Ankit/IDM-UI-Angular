import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UserService} from '../services/user.service';

export interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: boolean;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild(MatSort, null) sort: MatSort;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'status', 'edit'];
  customDataSource;
  userData: UserData[] = [];

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(res => {
        console.log(res);
        res.forEach(user => {
          this.userData.push(this.convertToUserData(user));
        });
        this.customDataSource = new MatTableDataSource(this.userData);
        this.customDataSource.sort = this.sort;
        this.customDataSource.paginator = this.paginator;
      }, err => {
        console.log(err);
        throw err;
      });
  }

  convertToUserData(user): UserData {
    return {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      role: user.userType,
      status: user.status
    };
  }

  navigate(location: string) {
    this.router.navigate([location]);
  }
}
