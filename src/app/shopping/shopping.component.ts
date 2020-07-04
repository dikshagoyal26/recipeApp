import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../services/shopping.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {
  public ingredients: any;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients()
    let result = this.ingredients.reduce(function (res, ing) {
      if (ing && ing.name) {
        let ingr = res[ing.name] || { name: ing.name, quantity: 0 }
        ing.quantity = ing.quantity ? ing.quantity.length > 1 ? (parseInt(ing.quantity.split(' ')[0])) : parseInt(ing.quantity) : 0
        ingr.quantity = parseInt(ingr.quantity) + ing.quantity
        res[ing.name] = ingr;
      }

      return res;
    }, Object.create(null));
    console.log({ result })
  }

}
