import { Injectable } from '@angular/core';
import { Recipe } from '../recipe';

@Injectable()
export class ShoppingService{
    private recipes:Recipe[]
    constructor(){

    }
    addToList(recipe:Recipe){
        this.recipes.push(recipe)
    }
    getLength(){
       return this.recipes.slice().length
    }
    getList(){
        return this.recipes.slice()
    }
}