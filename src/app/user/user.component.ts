import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


interface User {
  name: string;
  email: string;
  address: {
    city: string;
  };
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userId: number=1;
  user!: User;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.fetchUserData();
    });
  }

  fetchUserData(): void {
    const url = `https://jsonplaceholder.typicode.com/users/${this.userId}`;
    this.http.get<User>(url).subscribe(data => {
      this.user = data;
    });
  }
}
