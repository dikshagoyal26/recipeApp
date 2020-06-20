import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { RecipeComponent } from "./recipe/recipe.component";
import { RecipeDetailComponent } from "./recipe/recipe-detail/recipe-detail.component";
import { RecipeNewComponent } from "./recipe/recipe-new/recipe-new.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RecipeDisplayComponent } from "./recipe/recipe-display/recipe-display.component";
import { RecipeService } from "./services/recipe.service";
import { RecipeItemComponent } from "./recipe/recipe-display/recipe-item/recipe-item.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { RegisterComponent } from "./auth/register/register.component";
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./services/auth-guard.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AppInterceptor } from "./app.interceptor";
import { NotifierModule, NotifierOptions } from "angular-notifier";
import { ShoppingComponent } from './shopping/shopping.component';
import { ShoppingService } from './services/shopping.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RecipeSearchComponent } from './recipe/recipe-search/recipe-search.component'

const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'left',
			distance: 12
		},
		vertical: {
			position: 'bottom',
			distance: 20,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};
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
    ShoppingComponent,
    RecipeSearchComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NotifierModule.withConfig(customNotifierOptions),
    ModalModule.forRoot(),
  ],
  providers: [
    RecipeService,
    AuthService,
    AuthGuard,
    ShoppingService,
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
