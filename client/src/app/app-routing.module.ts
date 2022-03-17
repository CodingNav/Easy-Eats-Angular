import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './features/cart-page/cart-page.component';
import { HomePageComponent } from './features/home-page/home-page.component';
import { RecipePageComponent } from './features/recipe-page/recipe-page.component';
import { SearchPageComponent } from './features/search-page/search-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'recipe', component: RecipePageComponent },
  { path: 'cart', component: CartPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
