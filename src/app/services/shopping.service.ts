import { Injectable } from '@angular/core';
import { Recipe } from '../recipe';
import { Subject } from 'rxjs';

@Injectable()
export class ShoppingService {
    private recipes: Recipe[] = []
    public length: Subject<number> = new Subject<number>();
    public ingredients: any = []
    constructor() {

    }
    addToList(recipe: Recipe) {
        this.recipes.push(recipe)
        this.getLength(this.recipes.length)
        console.log(recipe)
        let ings = recipe.ingredients.map((ing) => {
            return ing.type != 'Drinks' ? { quantity: ing.quantity, name: ing.name } : {}
        })
        this.ingredients = [...this.ingredients, ...ings]
        console.log({ ings })
    }
    getLength(value: number) {
        this.length.next(value)
    }
    getList() {
        return this.recipes.slice()
    }
    getIngredients() {
        return this.ingredients
    }
}