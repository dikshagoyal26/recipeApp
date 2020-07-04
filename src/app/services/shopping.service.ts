import { Injectable } from '@angular/core';
import { Recipe } from '../recipe';
import { Subject } from 'rxjs';

@Injectable()
export class ShoppingService {
    private recipes: Recipe[] = []
    public length = new Subject<number>();
    constructor() {

    }
    addToList(recipe: Recipe) {
        this.recipes.push(recipe)
        this.getLength(this.recipes.length)
    }
    getLength(value: number) {
        this.length.next(value)
    }
    getList() {
        return this.recipes.slice()
    }
}