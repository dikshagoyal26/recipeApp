import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-recipe-new",
  templateUrl: "./recipe-new.component.html",
  styleUrls: ["./recipe-new.component.css"]
})
export class RecipeNewComponent implements OnInit {

  @Output() newRecipe:EventEmitter<any>=new EventEmitter();
  recipeForm: FormGroup;
  constructor() {
    this.recipeForm = new FormGroup({
      name: new FormControl("")
    });
  }

  ngOnInit(): void {}
  onSubmit() {
    console.log(this.recipeForm.controls.name.value);
    this.newRecipe.emit({'name':this.recipeForm.controls.name.value})
  }
}
