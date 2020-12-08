import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/model/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { Plugins} from '@capacitor/core';
const { Clipboard } = Plugins;


@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.page.html',
  styleUrls: ['./zoom.page.scss'],
})
export class ZoomPage implements OnInit {

  recipe: Recipe;
  title: String;
  image: String;
  content: String;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeServ: RecipeService
  ) { }

  ngOnInit() {

    //Get id from the url recipe (From Recipe Service)
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    //If id is not null set text and image
    if (id != null) {
      this.recipe = this.recipeServ.getRecipeFromId(+id);
      this.title = this.recipe.name;
      this.image = this.recipe.image;
      this.content = this.recipe.content;
    }

    console.log(id);

  }


  //Read only content
  isReadonly() {
    return true;
  }


}
