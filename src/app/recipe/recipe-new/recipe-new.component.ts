import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Recipe } from 'src/app/recipe';

@Component({
  selector: "app-recipe-new",
  templateUrl: "./recipe-new.component.html",
  styleUrls: ["./recipe-new.component.css"]
})
export class RecipeNewComponent implements OnInit {

  @Output() newRecipe:EventEmitter<any>=new EventEmitter();
  recipeForm: FormGroup;
  public recipe:Recipe;
  private ingredientsArr = new FormArray([]);
  private stepsArr = new FormArray([]);
  private timersArr = new FormArray([]);

  constructor() {
    this.recipeForm = new FormGroup({
      name: new FormControl("", Validators.required),
      imgURL:new FormControl("",Validators.required),
      originalURL:new FormControl("",Validators.required),
      ingredients:this.ingredientsArr,
      steps:this.stepsArr,
      timers:this.timersArr
    });
    this.addIngredient()
    this.addStep()
    this.addTimer()
  }
  addIngredient(){
    let form=new FormGroup({
      quantity:new FormControl("",Validators.required),
      name: new FormControl("",Validators.required),
      type: new FormControl("",Validators.required)
    })
    this.ingredientsArr.push(form)
  }
  addStep(){
    this.stepsArr.push(new FormControl("",Validators.required))

  }
  addTimer(){
    this.timersArr.push(new FormControl("",Validators.required))
    // let form=new FormGroup({
    //   timer:new FormControl("",Validators.required)
    // })
    // this.timersArr.push(form)
  }
  removeIngredient(index:number){
    (<FormArray> this.recipeForm.get('ingredients')).removeAt(index)
  }
  removeStep(index:number){
    (<FormArray> this.recipeForm.get('steps')).removeAt(index)

  }
  removeTimer(index:number){
    (<FormArray> this.recipeForm.get('timers')).removeAt(index)

  }
  ngOnInit(): void {}
  onSubmit() {
    console.log(this.recipeForm.controls);
    this.recipe={
      name:this.recipeForm.controls.name.value,
      ingredients:this.recipeForm.controls.ingredients.value,
      steps:this.recipeForm.controls.steps.value,
      timers:this.recipeForm.controls.timers.value,
      imageURL:this.recipeForm.controls.imgURL.value,
      originalURL:this.recipeForm.controls.originalURL.value
    }
    console.log(this.recipe)
    this.newRecipe.emit(this.recipe)
  }
}
