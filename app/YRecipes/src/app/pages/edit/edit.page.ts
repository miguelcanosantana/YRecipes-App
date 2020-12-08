import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/model/recipe';
import { RecipeService } from 'src/app/services/recipe.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  recipe: Recipe;

  //Input parameters
  id: number;
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
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {}


  ngOnInit() {
    //Get id from the url recipe (From Recipe Service)
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    //Also check data to unfold some inputs
    if (id != null) {

      this.recipe = this.recipeServ.getRecipeFromId(+id);
      this.id = this.recipe.id;
      this.image = this.recipe.image;
      this.name = this.recipe.name;
      this.plantBased = this.recipe.plantBased;

      this.timesDone = this.recipe.timesDone;
      if (this.timesDone > 0) this.doneBefore = true;

      this.estimatedTime = this.recipe.estimatedTime;
      if (this.estimatedTime != null) this.knowsTime = true;
      
      this.difficulty = this.recipe.difficulty;
      if (this.difficulty != null) this.knowsDifficulty = true;

      this.content = this.recipe.content;
    }

    console.log(id);
  }


  //Adjust the recipe based on some input parameters and return it
  adjustRecipe() {

    //Create a Recipe using values
    let tempRecipe: Recipe = {
      id: this.id,
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


  //Update recipe and navigate to recipes (From Recipe Service)
  updateRecipe() {

    let tempRecipe: Recipe = this.adjustRecipe();
    console.log("Try to update recipe");
    this.recipeServ.updateInRecipesList(tempRecipe);
    this.router.navigateByUrl("tabs/tab1")
  }

}
