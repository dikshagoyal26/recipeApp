import { Component, OnInit } from "@angular/core";
import { RecipeService } from '../services/recipe.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: "app-recipe",
  templateUrl: "./recipe.component.html",
  styleUrls: ["./recipe.component.css"]
})
export class RecipeComponent implements OnInit {
  private readonly notifier: NotifierService;

  constructor(private recipeService: RecipeService, notifierService: NotifierService) {
    this.recipeService.fetchAllRecipes()
    this.notifier = notifierService;

  }

  ngOnInit(): void {
    this.notifier.notify("success", "Welcome to RecipeApp!");

  }
}
