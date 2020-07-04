import { Injectable } from '@angular/core';
import { Recipe } from '../recipe';
import { Subject } from 'rxjs';
import { recipes } from '../recipes';

@Injectable()
export class ShoppingService {
    private recipes: Recipe[] = []
    public length: Subject<number> = new Subject<number>();
    public ingredients: any = []
    constructor() {
        let recipes = sessionStorage['recipes']
        if (recipes) {
            this.recipes = JSON.parse(recipes)
            this.setLength(this.recipes.length)
            this.recipes.forEach((recipe: Recipe) => this.initIngredients(recipe))
        }
    }
    addToList(recipe: Recipe) {
        this.recipes.push(recipe)
        this.setLength(this.recipes.length)
        this.initIngredients(recipe)
        sessionStorage['recipes'] = JSON.stringify(this.recipes)
    }
    initIngredients(recipe: Recipe) {
        let ings = recipe.ingredients.map((ing: any) => {
            return ing.type != 'Drinks' ? { quantity: ing.quantity, name: ing.name } : {}
        })
        this.ingredients = [...this.ingredients, ...ings]
    }
    setLength(value: number) {
        this.length.next(value)
    }
    getLength() {
        return this.recipes.length
    }
    getList() {
        return this.recipes.slice()
    }
    getIngredients() {
        return this.ingredients
    }
}