import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Recipe } from 'src/app/recipe';
import { RecipeService } from '../../services/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-recipe-new",
  templateUrl: "./recipe-new.component.html",
  styleUrls: ["./recipe-new.component.css"]
})
export class RecipeNewComponent implements OnInit {
  public recipe: Recipe;
  private ingredientsArr = new FormArray([]);
  private stepsArr = new FormArray([]);
  private timersArr = new FormArray([]);
  // @Output() newRecipe:EventEmitter<any>=new EventEmitter();
  private id: number;
  public recipeForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    imgURL: new FormControl("", Validators.required),
    originalURL: new FormControl(""),
    ingredients: this.ingredientsArr,
    steps: this.stepsArr,
    timers: this.timersArr
  });


  constructor(private recipeService: RecipeService, private route: ActivatedRoute, public router: Router) {
    this.route.params.subscribe(
      (params) => {
        let index = +params['id']
        if (index) {
          this.id = index
          let recipe = recipeService.getRecipeByID(index)
          this.displayIngredients(recipe.ingredients);
          this.displaySteps(recipe.steps);
          this.displayTimers(recipe.timers);

          this.recipeForm.setValue(
            {
              name: recipe.name,
              imgURL: recipe.imageURL,
              originalURL: recipe.originalURL,
              ingredients: this.ingredientsArr,
              timers: this.timersArr,
              steps: this.stepsArr,
            }
          )
        }
        else {
          this.id = this.recipeService.getLength() + 1
          this.addIngredient()
          this.addStep()
          this.addTimer()
        }
      })
  }
  displayIngredients(ing: any[]) {
    for (let i = 0; i < ing.length; i++) {
      let form = new FormGroup({
        quantity: new FormControl(ing[i].quantity, Validators.required),
        name: new FormControl(ing[i].name, Validators.required),
        type: new FormControl(ing[i].type, Validators.required)
      })
      this.ingredientsArr.push(form)
    }
  }
  displaySteps(steps: any[]) {
    for (let i = 0; i < steps.length; i++) {
      this.stepsArr.push(new FormControl(steps[i], Validators.required))
    }
  }
  displayTimers(timers: any[]) {
    for (let i = 0; i < timers.length; i++) {
      this.timersArr.push(new FormControl(timers[i], Validators.required))
    }
  }
  addIngredient() {
    let form = new FormGroup({
      quantity: new FormControl("", Validators.required),
      name: new FormControl("", Validators.required),
      type: new FormControl("", Validators.required)
    })
    this.ingredientsArr.push(form)
  }
  addStep() {
    this.stepsArr.push(new FormControl("", Validators.required))

  }
  addTimer() {
    this.timersArr.push(new FormControl("", Validators.required))
    // let form=new FormGroup({
    //   timer:new FormControl("",Validators.required)
    // })
    // this.timersArr.push(form)
  }
  removeIngredient(index: number) {
    if (this.ingredientsArr.length == 1) return
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }
  removeStep(index: number) {
    if (this.stepsArr.length == 1) return
    (<FormArray>this.recipeForm.get('steps')).removeAt(index)

  }
  removeTimer(index: number) {
    if (this.timersArr.length == 1) return
    (<FormArray>this.recipeForm.get('timers')).removeAt(index)

  }
  ngOnInit(): void { }
  onSubmit() {
    if (this.recipeForm.invalid) {
      return

    }
    else {
      this.recipe = {
        id: this.id,
        name: this.recipeForm.controls.name.value,
        ingredients: this.recipeForm.controls.ingredients.value,
        steps: this.recipeForm.controls.steps.value,
        timers: this.recipeForm.controls.timers.value,
        imageURL: this.recipeForm.controls.imgURL.value,
        originalURL: this.recipeForm.controls.originalURL.value
      }
      this.recipeService.addNewRecipe(this.recipe)
      // this.newRecipe.emit(this.recipe)
      // this.display.addNewRecipe(this.recipe)
      this.router.navigate(['/recipes'])
    }

  }
  cancel() {
    this.router.navigate(['/recipes'])
  }
}
