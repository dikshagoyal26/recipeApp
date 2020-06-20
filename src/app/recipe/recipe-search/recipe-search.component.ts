import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.css']
})
export class RecipeSearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  fetchData() {
    console.log("fetching")
  }
  betterFunc = this.doSomeMagic(this.fetchData, 300)
  doSomeMagic(fn, delay) {
    let timer;
    return function () {
      let context = this, args = arguments
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.fetchData.apply(context, arguments)
      }, delay)
    }
  }
}
