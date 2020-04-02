import { Recipe } from '../recipe';
import { Injectable } from '@angular/core';
import {recipes} from '../recipes'
@Injectable()
export class RecipeService{
    public recipes:Recipe[];
    constructor(){
        this.recipes=recipes
    }
    getRecipeByID(id:number){
        id=id-1;
        return this.recipes[id];
    }
    addNewRecipe(recipe:Recipe){
        this.recipes.push(recipe)
    }
    fetchAllRecipes(){
        return this.recipes.slice()
    }
}