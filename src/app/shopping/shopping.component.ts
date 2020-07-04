import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../services/shopping.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {
  public ingredients: any;
  public result: any;
  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients()
    let result = this.ingredients.reduce(function (res, ing) {
      if (ing && ing.name) {
        let ingr = res[ing.name] || 0
        ing.quantity = ing.quantity ? ing.quantity.length > 1 ? (parseInt(ing.quantity.split(' ')[0])) : parseInt(ing.quantity) : 0
        ingr = parseInt(ingr) + ing.quantity
        res[ing.name] = ingr;
      }
      return res;
    }, Object.create(null));
    this.result = result
  }
  download() {
    let a = document.createElement('a');
    let blob = new Blob([JSON.stringify(this.result, null, 2)], { type: "application/octet-stream" });
    let url = window.URL.createObjectURL(blob);
    a.href = url;
    let date = new Date(Date.now())
    a.download = `shopping_list_${date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()}`;
    a.click()
    window.URL.revokeObjectURL(url);
  }

}
