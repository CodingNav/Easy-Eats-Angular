import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  loadRandomRecipe(i: number, usedRecipes: number[]): Promise<any> {

    const randomRecipeURL = "https://www.themealdb.com/api/json/v1/1/random.php?cache=" + i;

    return fetch(randomRecipeURL)
      .then(function (response) {
        return response.json();
      })
      .then((data) => {

        var recipeId = data.meals[0].idMeal;

        if (usedRecipes.includes(recipeId)) {
          return this.loadRandomRecipe(i + 100, usedRecipes);
        }
        return data;
      });
  }

  async getPopRecipes(): Promise<any[]> {
    const usedRecipes: number[] = [];
    const popRecipes: object[] = [];

    for (let i = 0; i < 10; i++) {
      const recipe = await this.loadRandomRecipe(i, usedRecipes);
      popRecipes.push(recipe);
      usedRecipes.push(recipe.meals[0].idMeal);
    }

    return popRecipes;
  }

  searchRecipe(recipe: string): Promise<any> {
    const recipeURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + recipe;

    return fetch(recipeURL)
      .then(function (response) {
        return response.json();
      });
  }
}