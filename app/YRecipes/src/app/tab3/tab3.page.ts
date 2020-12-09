import { Component } from '@angular/core';
import { Recipe } from '../model/recipe';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  level: number = 0; //1000 exp = 1 lvl
  exp: number = 0;
  recipesList: Recipe[] = [];

  constructor(
    private recipeServ: RecipeService
  ) {}


  //Calculate the exp
  calculateScore() {

    this.recipesList = this.recipeServ.getRecipesList();

    this.exp = 0; //Reset exp
    let scoreToBeAdded: number = 100; //Start with 100

    for (let r = 0; r < this.recipesList.length; r++) {
      let tempRecp = this.recipesList[r];

      if (tempRecp.difficulty == 1) scoreToBeAdded *= 1.5;
      if (tempRecp.difficulty == 2) scoreToBeAdded *= 2;

      if (tempRecp.timesDone == null || tempRecp.timesDone == 0) scoreToBeAdded = 0;
      else scoreToBeAdded *= tempRecp.timesDone;

      this.exp += scoreToBeAdded; 
      
    }

    this.calculateLevel();

  }


  //Calculate the level
  calculateLevel() {
    this.level = Math.floor(this.exp / 1000);
  }








}
