import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeNewComponent } from './recipe/recipe-new/recipe-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeDisplayComponent } from './recipe/recipe-display/recipe-display.component';
import { RecipeService } from './services/recipe.service';
import { RecipeItemComponent } from './recipe/recipe-display/recipe-item/recipe-item.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from './app.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    RecipeDetailComponent,
    RecipeNewComponent,
    RecipeDisplayComponent,
    RecipeItemComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [RecipeService, AuthService, AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
