import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../model/recipe';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  //Input parameters
  image: String;
  name: String;
  plantBased: number = 0;
  doneBefore: boolean = false; //For showing timesDone
  timesDone: number = 1;
  knowsTime: boolean = false; //For showing estimatedTime
  estimatedTime: number = 30;
  knowsDifficulty: boolean = false; //For showing estimatedTime
  difficulty: number = 0;
  content: String;


  constructor(
    private recipeServ: RecipeService,
    private router: Router
  ) {}


  //Adjust the recipe based on some input parameters and return it
  adjustRecipe() {

    //Create a Recipe using values
    let tempRecipe: Recipe = {
      id: this.biggestId() + 1,
      name: this.name,
      image: this.image,
      content: this.content,
      plantBased: this.plantBased,
    }

    if (this.doneBefore == false) tempRecipe.timesDone = 0;
    else tempRecipe.timesDone = this.timesDone;

    if (this.knowsTime == false) this.estimatedTime = null;
    else tempRecipe.estimatedTime = this.estimatedTime;

    if (this.knowsDifficulty == false) this.difficulty = null;
    else tempRecipe.difficulty = this.difficulty;

    return tempRecipe;
  }


  //Clear the inputs when saved or clear
  clearInput() {

    this.image = "";
    this.name = "";
    this.plantBased = 0;
    this.doneBefore = false;
    this.timesDone = 1;
    this.knowsTime = false;
    this.estimatedTime = 30;
    this.knowsDifficulty = false;
    this.difficulty = 0;
    this.content = "";
    console.log("Input cleared")
  }


  //Return the biggest recipe id (From Recipe Service)
  biggestId() {

    console.log("Counted Recipes");
    return this.recipeServ.getRecipesMaxId();
  }


  //Save recipe and navigate to recipes (From Recipe Service)
  saveRecipe() {

    let tempRecipe: Recipe = this.adjustRecipe();
    console.log("Try to save recipe");
    this.recipeServ.addToRecipesList(tempRecipe);
    this.clearInput();
    this.router.navigateByUrl("tabs/tab1")
  }


}
