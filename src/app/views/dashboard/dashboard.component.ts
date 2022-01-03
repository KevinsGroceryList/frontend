import { Component, DoCheck, OnInit } from '@angular/core';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Account } from 'src/app/models/Account';
import { Item } from 'src/app/models/Item';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, DoCheck {

  basketEmpty: boolean = true;
  items: Array<Item> = [];
  account: Account = <Account>{};
  itemInput: string = "";

  constructor(private apiServ: ApiService) { }

  ngOnInit(): void {
    this.apiServ.checkSession().subscribe(responseBody => {
      console.log(responseBody);
      if(responseBody.data){
        this.account = responseBody.data;

        this.getAllItems();
      }
    })
  }

  ngDoCheck(){
    let isInCart = this.items.find(item => item.inCart);

    if(isInCart)
      this.basketEmpty = false;
    else
      this.basketEmpty = true;

  }


  createItem(){
    this.apiServ.createItem(this.account.id, this.itemInput).subscribe(responseBody => {
      this.itemInput = "";
      console.log(responseBody);
      this.items.push(responseBody.data);
    })
  }

  getAllItems(){
    this.apiServ.getAllItems(this.account.id).subscribe(responseBody => {
        console.log(responseBody);
        this.items = responseBody.data;
        this.items.sort((a,b) => a.id - b.id);
    })
  }

  toggleInCart(event: any){
    console.log(event.target.id);
    this.apiServ.toggleInCart(this.account.id, event.target.id).subscribe(resonseBody => {
      console.log(resonseBody);
      let itemIndex = this.getIndex(event.target.id);

      this.items[itemIndex].inCart = !this.items[itemIndex].inCart;
      
    })
  }

  getIndex(itemId: number){

    let itemIndex = 0;
    this.items.forEach((item, i) => {
      if(item.id == itemId){
        itemIndex = i;
      }
    })

    return itemIndex;
  }

  deleteItem(event:any){
    event.stopPropagation();//stops the button from bubbling
    console.log(event.target.parentElement.id);
    this.apiServ.deleteOneItem(this.account.id, event.target.parentElement.id).subscribe(responseBody => {
      let itemIndex = this.getIndex(event.target.parentElement.id);
      this.items.splice(itemIndex,1);
    })
  }

  removeInCartItems(){
    this.apiServ.deleteAllInCartItems(this.account.id).subscribe(responseBody => {
      this.getAllItems();
    })
  }

}
