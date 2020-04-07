import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Recipe } from "src/app/recipe";
import { RecipeService } from "../../services/recipe.service";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-recipe-display",
  templateUrl: "./recipe-display.component.html",
  styleUrls: ["./recipe-display.component.css"]
})
export class RecipeDisplayComponent implements OnInit {
  public recipes: Recipe[];
  public authStatus:boolean=false;

  constructor(private recipeService: RecipeService,private authService:AuthService) {
    this.recipes = this.recipeService.fetchAllRecipes();
    this.authService.authStatus.subscribe((status:boolean)=>{
      this.authStatus=status
    })
  }

  ngOnInit(): void {
    console.log(this.recipes);
  }
}
