import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/Account';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string = "";
  account: Account = <Account>{};

  constructor(private apiServ: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  loginAccount(){
    this.apiServ.login(this.account).subscribe({next: responseBody => {
        this.router.navigate(["dashboard"])
    }, 
    error: badRequest => {
        this.message = badRequest.error.message;
    }})
  }

}
