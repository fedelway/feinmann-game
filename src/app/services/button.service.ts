import { Injectable } from '@angular/core';
import * as buttonsJson from './buttonData.json';
import { GameButtonComponent } from '../components/game-button/game-button.component';
import FeinmannSound from './FeinmannSound';
import { FaceService } from './face.service';

interface ButtonData{
  id: number;
  iconSrc: string;
  imgSrc: string;
  sound: FeinmannSound;
}

@Injectable({
  providedIn: 'root'
})
export class ButtonService {

  _buttons : Array<ButtonData>;
  _buttonComponents: Array<GameButtonComponent> = [];

  constructor(private faceService: FaceService) {
    this._buttons = buttonsJson.array.map( (b,idx) => Object.assign(b,
      {
        id: idx,
        sound: new FeinmannSound(b.audioSrc,faceService)
      })
    );
   }

  //returns the assigned Id
  public registerButton(comp: GameButtonComponent) : number{
    this._buttonComponents.push(comp);
    return this._buttonComponents.length - 1;
  }

  public enableButtons(){
    this._buttonComponents.forEach(b => b.enabled = true);
  }

  public disableButtons(){
    this._buttonComponents.forEach(b => b.enabled = false);
  }

  public get buttons() : Array<ButtonData>{
    return this._buttons;
  }

  public get buttonComponents() : Array<GameButtonComponent>{
    return this._buttonComponents;
  }
}
