import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../utils/api.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss']
})
export class RecipePageComponent implements OnInit {

  recipes: any[] = [];
  recipeData: any = {};

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const recipeId: string = this.route.snapshot.paramMap.get('id') || "";

  // subscribe runs API everytime route/parameter/id changes 
    this.route.params.subscribe(routeParams => {
      this.api.loadRecipeByID(routeParams['id']).then((data) => {
        this.recipeData = data;
      });
      this.scrollToTop();
    });

    this.api.getRandomRecipes().then((data) => {
      this.recipes = data;
    });
  }

    // Smooth scrolls page to top when you go to a new page
  // everytime a route is activated, run this function
  scrollToTop() {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 0);
  }

  recipeTags(tags: string) {
    if (tags) {
      return "Tags: " + tags.replace(/,/g, ", ")
    }
    else {
      return '"recipe made with love'
    }
  }

  recipeInstructions(instructions: string) {
    const orderedInstructions = instructions.split(".");
    let newInstructions = "";

    for (let i = 0; i < orderedInstructions.length; i++) {
      if (orderedInstructions[i].trim() !== "") {
        newInstructions += orderedInstructions[i].trim().replace("\r\n", "") + "." + "<br><br>";
      }
    }
    return newInstructions;
  }

  youtubeURL(url: string): SafeUrl {
    const newURL = url.replace("watch?v=", "embed/");
    return this.sanitizer.bypassSecurityTrustResourceUrl(newURL);
  }

}