import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HomePageComponent } from './features/home-page/home-page.component';
import { SearchPageComponent } from './features/search-page/search-page.component';
import { RecipePageComponent } from './features/recipe-page/recipe-page.component';
import { CartPageComponent } from './features/cart-page/cart-page.component';
import { RecipeCardComponent } from './shared/components/recipe-card/recipe-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IngredientModalComponent } from './features/recipe-page/components/ingredient-modal/ingredient-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomePageComponent,
    SearchPageComponent,
    RecipePageComponent,
    CartPageComponent,
    RecipeCardComponent,
    IngredientModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
