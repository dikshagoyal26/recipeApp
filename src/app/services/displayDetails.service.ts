import { Recipe } from '../recipe';
import { Injectable } from '@angular/core';

@Injectable()
export class displayRecipeDetails{
    public recipe:Recipe;
    constructor(){

    }
    setRecipe(recipe:Recipe){
        this.recipe=recipe
    }
    getRecipe(){
        return this.recipe
    }
}