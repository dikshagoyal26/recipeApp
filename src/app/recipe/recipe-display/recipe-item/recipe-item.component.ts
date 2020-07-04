import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/recipe';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ShoppingService } from 'src/app/services/shopping.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  private readonly notifier: NotifierService;
  public authStatus: boolean = false;
  constructor(private router: Router, private authService: AuthService, private shoppingService: ShoppingService, notifierService: NotifierService) {
    this.authService.authStatus.subscribe((status: boolean) => {
      this.authStatus = status
    })
    this.notifier = notifierService;

  }

  ngOnInit(): void {
  }
  viewDetails(id: number) {
    console.log({ id })
    this.router.navigate([`recipes/details/${id}`])
  }
  addToCart(recipe: Recipe) {
    this.shoppingService.addToList(recipe)
    this.notifier.notify("success", "Ingredients added to list");
  }
}
