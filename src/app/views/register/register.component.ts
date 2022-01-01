import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/Account';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  message: string = "";
  account: Account = <Account>{};

  constructor(private apiServ: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  registerAccount(){
    this.apiServ.registerAccount(this.account).subscribe({next: responseBody => {
      this.router.navigate(["/"]);
    }, 
    error: badRequest => {
      this.message = badRequest.error.message;
    }});
  }

}
