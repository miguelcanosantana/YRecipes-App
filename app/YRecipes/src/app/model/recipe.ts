import { noUndefined } from '@angular/compiler/src/util';


export class Recipe {
    id: number;
    name: String;
    image: String;
    content: String;
    plantBased: number; //0 = No, 1 = Vegetarian, 2 = Vegan
    timesDone?: number;
    estimatedTime?: number; //In minutes
    difficulty?: number; //Default = Unknown, 0 = Easy, 1 = Normal, 2 = Hard
}