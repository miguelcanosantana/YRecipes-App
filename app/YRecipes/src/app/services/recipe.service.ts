import { templateJitUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Recipe } from '../model/recipe';
import { Plugins } from '@capacitor/core'
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class RecipeService {


  recipe: Recipe = {
    id: 0,
    name: "",
    image:"",
    content: "",
    plantBased: 0
  };

  //List of recipes
  recipesList: Recipe[] = [this.recipe];


  constructor() {

    //Call Get the recipes from the local storage
    this.getRecipesFromStorage().then(
      data => this.recipesList = data
    );


    //Example data
    /*this.recipesList = [
      {
        "id": 1,
        "name": "Soup",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Vegan_brown_lentil_soup.jpg/535px-Vegan_brown_lentil_soup.jpg",
        "content": "blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla",
        "plantBased": 2,
        "timesDone": 0
      },
      {
        "id": 2,
        "name": "SpringRolls",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Vegetarian_Food_at_Maiz_Canela_y_Cilantro.jpg/800px-Vegetarian_Food_at_Maiz_Canela_y_Cilantro.jpg",
        "content": "blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla",
        "plantBased": 1,
        "timesDone": 4,
        "estimatedTime": 120,
        "difficulty": 2
      },
      {
        "id": 3,
        "name": "Skewers",
        "image": "https://cdn.pixabay.com/photo/2020/06/21/15/52/vegan-5325596_960_720.jpg",
        "content": "They are actually vegan, just for testing purposes are labelled as non vegan...blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla",
        "plantBased": 0,
        "timesDone": 2,
        "estimatedTime": 60,
        "difficulty": 1
      }
    ] */

  }

  
  //RecipesList getter
  public getRecipesList() {
    return this.recipesList;
  }


  //Promise for getting the recipes from the local storage
  public async getRecipesFromStorage(): Promise<Recipe[]> {

    const ret = await Storage.get({ key: 'recipesList' });
    return JSON.parse(ret.value) ? JSON.parse(ret.value) : [];
  }


  //Get a Recipe from the id 
  public getRecipeFromId(id: number): Recipe {
    //Need to specify 0 because need to return an array of 1 recipe at index 0
    //Use ... inside {} to create a copy and not use a reference
    //for fixing the problem where you go back and note is saved
    return {...this.recipesList.filter(t => t.id === id)[0]};
  }


  //Add recipe to RecipesList
  public async addToRecipesList(recipe: Recipe) {

    this.recipesList.push(recipe);

    //Call method saveRecipes() to save on local storage
    await this.saveRecipes(this.recipesList);
    console.log("Saved recipe, id: " + recipe.id);
  }


  //Get Max Id of Recipes
  public getRecipesMaxId() {

    let maxId: number = 0;

    for (let r = 0; r < this.recipesList.length; r++) {

      let tempId = this.recipesList[r].id;
      if (tempId > maxId) maxId = tempId;
    }

    return maxId;
  }


  //Save Recipes to local storage method
  public async saveRecipes(recipesList: Recipe[]) {
    await Storage.set({
      key: 'recipesList',
      value: JSON.stringify(recipesList)
    });
  }


  //Update recipe in RecipesList
  public async updateInRecipesList(recipe: Recipe) {

    for (let r = 0; r < this.recipesList.length; r++) {

      if (this.recipesList[r].id == recipe.id) {
        this.recipesList[r] = recipe;
      }

    }

    //Call method saveRecipes() to save on local storage
    await this.saveRecipes(this.recipesList);

  }


  //Count recipe as done
  public async countRecipeAsDone(recipe: Recipe) {
    recipe.timesDone++;

    //Call method saveRecipes() to save on local storage
    await this.saveRecipes(this.recipesList);
  }


  //Delete recipe from RecipesList
  public async deleteFromRecipesList(id: number) {

    //Filter all elemments that their id don't match with the given one
    this.recipesList = this.recipesList.filter(r => r.id != id);

    //Call method saveRecipes() to save on local storage
    await this.saveRecipes(this.recipesList);
    console.log("Removed recipe with id " + id + " from the list");
  }


}
