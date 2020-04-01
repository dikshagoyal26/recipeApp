import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/recipe';
import { displayRecipeDetails } from 'src/app/services/displayDetails.service';

@Component({
  selector: 'app-recipe-display',
  templateUrl: './recipe-display.component.html',
  styleUrls: ['./recipe-display.component.css']
})
export class RecipeDisplayComponent implements OnInit {

@Input() recipe:Recipe;
@Output() displayRecipe:EventEmitter<any>= new EventEmitter() ;

  constructor(private displayRecipeService:displayRecipeDetails) { }

  ngOnInit(): void {
  }
  viewDetails(recipe:Recipe){
    // this.displayRecipeService.setRecipe(recipe)
    this.displayRecipe.emit(recipe)
    console.log(recipe)
  }
}
