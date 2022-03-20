import { Component, Input, OnInit } from '@angular/core';
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

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
  }

  firstIngredient() {
    if (this.ingredients.length) {
      this.api.searchIngredients(this.ingredients[0].ing).then((data) => {
        this.currentIngredient = data;
        this.currentIndex = 0;

        if (data.results.length > 0) {
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
      this.selectedIngredients.push(ingredient);
    }
    console.log(this.selectedIngredients);
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
}
