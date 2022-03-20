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
      });
    }
  }

  nextBtn() {
    this.currentIndex = this.currentIndex + 1;
    this.api.searchIngredients(this.ingredients[this.currentIndex].ing).then((data) => {
      this.currentIngredient = data;
    });

  }

}
