import { Component, Input, OnInit } from '@angular/core';
import { WindowRef } from 'src/app/core/injectables/WindowRef.injectable';
import { ApiService } from 'src/app/utils/api.service';

@Component({
  selector: 'app-ingredient-modal',
  templateUrl: './ingredient-modal.component.html',
  styleUrls: ['./ingredient-modal.component.scss']
})
export class IngredientModalComponent implements OnInit {

  currentIngredient: any = {};
  currentIndex: number = 0;
  selectedIngredients: any[] = []

  @Input() ingredients: any;
  @Input() recipeData: any;

  constructor(
    private api: ApiService,
    private winRef: WindowRef
  ) { }

  ngOnInit(): void {
     // Modal Initializer
     var elemsC = document.querySelectorAll('.modal');
     var instancesC = this.winRef.nativeWindow.M.Modal.init(elemsC);
  }

  firstIngredient() {
    if (this.ingredients.length) {
      this.api.searchIngredients(this.ingredients[0].ing).then((data) => {
        this.currentIngredient = data;
        this.currentIndex = 0;

        if (data.results.length > 0) {
          data.results[0].checked = true;
          this.selectedIngredients.push(data.results[0]);
        }
      });
    }
  }

  nextBtn() {
    this.currentIndex = this.currentIndex + 1;
    if (this.currentIndex < this.ingredients.length) {
      this.api.searchIngredients(this.ingredients[this.currentIndex].ing).then((data) => {
        this.currentIngredient = data;

        if (data.results.length > 0) {
          data.results[0].checked = true;
          this.selectedIngredients.push(data.results[0]);
        }
      });
    }
  }

  selectIngredient(ingredient: any) {
    const foundIngIndex = this.selectedIngredients.findIndex((s) => {
      return s.slug == ingredient.slug;
    });

    if (foundIngIndex > -1) {
      this.selectedIngredients.splice(foundIngIndex, 1);
    }
    else {
      ingredient.checked = true;
      this.selectedIngredients.push(ingredient);
    }
  }

  checkboxDisplay(slug: string) {
    const foundIngredient = this.selectedIngredients.find((s) => {
      return s.slug == slug;
    });

    if (foundIngredient) {
      return "check_box";
    }
    else {
      return "check_box_outline_blank";
    }
  }

  finalCheckboxDisplay(slug: string) {
    const foundIngredient = this.selectedIngredients.find((s) => {
      return s.slug == slug;
    });

    if (foundIngredient && foundIngredient.checked) {
      return "check_box";
    }
    else {
      return "check_box_outline_blank";
    }
  }

  doneBtn() {
    let cart: any = {
      recipes: [],
      ingredients: []
    };

    const savedCard = localStorage.getItem('cart');

    // Checks if there was data saved in local storage already
    // This helps add info to local storage, rather than replace
    if (savedCard != null) {
      cart = JSON.parse(savedCard);
    }

    // Loops through cards checked by user
    for (let i = 0; i < this.selectedIngredients.length; i++) {
      const ing = this.selectedIngredients[i];
      // Adds each cards info to this object
      const ingredientInfo = {
        link: ing.slug,
        image: ing.imageThumbnail,
        brand: ing.brand,
        name: ing.name,
        price: ing.regularPrice,
        quantity: 1
      }
      // Checks if new ingredient added already exists
      const ingredientExists = cart.ingredients.find(function (savedIngredient: any) {
        return savedIngredient.link == ingredientInfo.link;
      });

      if (!ingredientExists) {
        // Pushes cards info into array
        cart.ingredients.push(ingredientInfo);
      }
    }

    const recipe = {
      id: this.recipeData.idMeal,
      name: this.recipeData.strMeal,
      image: this.recipeData.strMealThumb,
      ingredients: this.ingredients,
    }

    // Checks if new recipe added already exists
    const recipeExists = cart.recipes.find(function (savedRecipe: any) {
      return savedRecipe.Id == recipe.id;
    });
    if (!recipeExists) {
      cart.recipes.push(recipe);
    }
    // Saved information to localStorage under name cart
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
