import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input()
  name: string = "";

  constructor(private apiServ: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.apiServ.logout().subscribe(responseBody => {
      this.router.navigate(["/"]);
    })
  }

  register(){
    this.router.navigate(["/register"]);
  }

}
