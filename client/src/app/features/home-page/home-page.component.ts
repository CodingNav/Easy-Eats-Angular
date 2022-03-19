import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../utils/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

  recipes: any[] = [];
  
  homeSearch = new FormGroup({
    search: new FormControl('')
  });

  constructor(
    private api:ApiService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.api.getRandomRecipes().then((data) => {
      this.recipes = data;
    });
  }

  onSubmit() {
    this.router.navigate(["search"], { queryParams: { q: this.homeSearch.value.search } });
  }
}
