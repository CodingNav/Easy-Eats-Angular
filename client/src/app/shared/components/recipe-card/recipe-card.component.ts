import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {

  @Input() recipeData: any;
  @Input() hiddenCards: boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

}
