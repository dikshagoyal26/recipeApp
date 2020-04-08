import { NgModule } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { RecipeComponent } from "./recipe/recipe.component";
import { RecipeNewComponent } from "./recipe/recipe-new/recipe-new.component";
import { RecipeDetailComponent } from "./recipe/recipe-detail/recipe-detail.component";
import { RecipeDisplayComponent } from './recipe/recipe-display/recipe-display.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './services/auth-guard.service';
import { ShoppingComponent } from './shopping/shopping.component';

const routes: Routes = [

  {
    path: "recipes",
    component:RecipeComponent,
    children: [
      {
        path: "",
        component: RecipeDisplayComponent
      },
      {
        path: "details/:id",
        component: RecipeDetailComponent
      },
      {
        path: "edit-recipe/:id",
        component: RecipeNewComponent,
        canActivate:[AuthGuard]
      },
      {
        path: "new-recipe",
        component: RecipeNewComponent,
        canActivate:[AuthGuard]
      }
    ]
  },
  {
    path:"register-user",
    component:RegisterComponent
  },
  {
    path:"cart",
    component:ShoppingComponent
  },
  { path: '',
  redirectTo: '/recipes',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
