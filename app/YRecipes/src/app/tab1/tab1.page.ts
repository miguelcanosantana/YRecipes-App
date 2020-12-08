import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Recipe } from '../model/recipe';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  //List of recipes
  recipesList: Recipe[] = [];

  
  constructor(
    //Use RecipeService from the Services folder
    private recipeServ: RecipeService,
    //Create AlertController
    public alertController: AlertController,
    //Router
    private router: Router
  ) {

    //Get recipes (From Recipe Service)
    this.recipesList = this.getRecipes();
  }


  //Get recipes (From Recipe Service)
  getRecipes() {
    return this.recipeServ.getRecipesList();
  }


  //Delete Confirmation Alert
  async deleteAlert(id: number, name: String) {

    const alert = await this.alertController.create({
      header: 'Delete Recipe',
      //Using `` for input info (interpolation)
      message: `'Do you really want to delete the recipe: <strong>"${name}"</strong>?'`,
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
          cssClass: 'secondary'
        }, 
        {
          text: 'Trash it!',
          handler: () => {
            this.trashRecipe(id);
          }
        }
      ]
    }); 

    await alert.present();

  }


  //Trash recipes (From Recipe Service) and get recipes 
  trashRecipe(id: number) {
    this.recipeServ.deleteFromRecipesList(id);
    this.recipesList = this.getRecipes();
  }


  //Count done Confirmation Alert
  async doneAlert(recipe: Recipe, name: String) {

    const alert = await this.alertController.create({
      header: 'Mark as done',
      //Using `` for input info (interpolation)
      message: `'Mark as done the recipe: <strong>"${name}"</strong>?'`,
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
          cssClass: 'secondary'
        }, 
        {
          text: 'Done!',
          handler: () => {
            this.countDone(recipe);
          }
        }
      ]
    }); 

    await alert.present();

  }


  //Count done a recipe (From Recipe Service) and get recipes
  countDone(recipe: Recipe) {

    this.recipeServ.countRecipeAsDone(recipe);
    this.recipesList = this.getRecipes();
  }


  //Go to the zoom page passing id
  goZoom(id: number) {
    this.router.navigateByUrl(`/zoom${id != undefined ? '/' + id : ''}`);
  }


  //Go to the zoom page passing id
  goEdit(id: number) {
    this.router.navigateByUrl(`/edit${id != undefined ? '/' + id : ''}`);
  }
  

}
