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
        return data.meals[0];
      });
  }

  async getRandomRecipes(): Promise<any[]> {
    const usedRecipes: number[] = [];
    const randomRecipes: object[] = [];

    for (let i = 0; i < 10; i++) {
      const recipe = await this.loadRandomRecipe(i, usedRecipes);
      randomRecipes.push(recipe);
      usedRecipes.push(recipe.idMeal);
    }

    return randomRecipes;
  }

  searchRecipe(recipe: string): Promise<any> {
    const recipeURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + recipe;

    return fetch(recipeURL)
      .then(function (response) {
        return response.json();
      });
  }

  // ----------------------[GRABS DATA FROM RECIPES API FOR RECIPE PAGE]-------------------------
  // Recipe API Request by Id
  loadRecipeByID(id: string): Promise<any> {
    const recipeURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id

    return fetch(recipeURL)
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        return data.meals[0];
      })
  }
}