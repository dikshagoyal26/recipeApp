import { Recipe } from '../recipe';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { recipes } from '../recipes'
import { HttpRequest } from '@angular/common/http';
@Injectable()
export class RecipeService {
    public recipes: Recipe[];
    private firebaserecipes:any
    constructor(private http:HttpClient) {  //private http:HttpClient
        this.recipes = recipes
    }
    getRecipeByID(id: number) {
        id = id - 1;
        return this.recipes[id];
    }
    addNewRecipe(recipe: Recipe) {
        if (recipes[recipe.id - 1])
            recipes[recipe.id - 1] = recipe;
        else
            this.recipes.push(recipe)
    }
    fetchAllRecipes() {
        // this.http.get('https://recipeapp26.firebaseio.com/create-recipe').subscribe((response:any)=>{
        //     this.firebaserecipes=response
        // })
        return this.recipes.slice()
    }
    getLength() {
        return this.recipes.slice().length;
    }
    fetchRecipes(){
        this.firebaserecipes=this.http.get('https://recipeapp26.firebaseio.com/recipes.json')
    }
}