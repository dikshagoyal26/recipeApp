import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Recipe } from "src/app/recipe";
import { RecipeService } from "../../services/recipe.service";

@Component({
  selector: "app-recipe-display",
  templateUrl: "./recipe-display.component.html",
  styleUrls: ["./recipe-display.component.css"]
})
export class RecipeDisplayComponent implements OnInit {
  public recipes: Recipe[];
  constructor(private recipeService: RecipeService) {
    this.recipes = this.recipeService.fetchAllRecipes();
  }

  ngOnInit(): void {
    console.log(this.recipes);
  }
}
