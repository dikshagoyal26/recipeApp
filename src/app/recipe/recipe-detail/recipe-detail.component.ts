import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/recipe';
import { ActivatedRoute, Router } from '@angular/router';
import {RecipeService} from '../../services/recipe.service'
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe:Recipe;
  // public recipes:Recipe[];
  public recipe:Recipe;
  constructor(private route:ActivatedRoute,private recipeService:RecipeService,public router:Router)  { 
    this.route.params.subscribe((params)=>{
      let id=params['id']
      this.recipe=this.recipeService.getRecipeByID(id);
    })
  }

  ngOnInit(): void {
  }
  editRecipe(id:number){
    this.router.navigate([`recipes/edit-recipe/${id}`])
  }
}
