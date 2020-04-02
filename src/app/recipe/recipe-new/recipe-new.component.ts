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
  public recipeForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    imgURL: new FormControl("", Validators.required),
    originalURL: new FormControl("", Validators.required),
    ingredients: this.ingredientsArr,
    steps: this.stepsArr,
    timers: this.timersArr
  });


  constructor(private display: RecipeService, private route: ActivatedRoute) {
  
    this.route.params.subscribe(
      (params) => {
      console.log(params)
      let index = +params['id']
      console.log(index)
       if (index) {
        let recipe = display.getRecipeByID(index)
        console.log(recipe)
       
        this.displayIng(recipe.ingredients);
        this.recipeForm.patchValue(
          {
            name:recipe.name,
            imageURL:recipe.imageURL,
            originalURL:recipe.originalURL,
             ingredients:this.ingredientsArr
          }
        )
       }
       else{
        this.addIngredient()
        this.addStep()
        this.addTimer()
      }
    })

   
   
  }
  displayIng(ing:any[])
  {
  for(let i=0;i<ing.length;i++)
  {
    let form = new FormGroup({
      quantity: new FormControl(ing[i].quantity, Validators.required),
      name: new FormControl(ing[i].name, Validators.required),
      type: new FormControl(ing[i].type, Validators.required)
    })
    this.ingredientsArr.push(form)
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
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }
  removeStep(index: number) {
    (<FormArray>this.recipeForm.get('steps')).removeAt(index)

  }
  removeTimer(index: number) {
    (<FormArray>this.recipeForm.get('timers')).removeAt(index)

  }
  ngOnInit(): void { }
  onSubmit() {
    if(this.recipeForm.invalid)
    {
      return 

    }
    else{
      console.log(this.recipeForm.controls);
      this.recipe = {
        name: this.recipeForm.controls.name.value,
        ingredients: this.recipeForm.controls.ingredients.value,
        steps: this.recipeForm.controls.steps.value,
        timers: this.recipeForm.controls.timers.value,
        imageURL: this.recipeForm.controls.imgURL.value,
        originalURL: this.recipeForm.controls.originalURL.value
      }
      console.log(this.recipe)
      // this.newRecipe.emit(this.recipe)
      this.display.addNewRecipe(this.recipe)
      // this.router.navigate(['/recipes'])
    }
    
  }
}
