import { Injectable } from '@angular/core';
import GameState from './game-state-';
import { ButtonService } from './button.service';
import FeinmannSound from './FeinmannSound';
import { FaceService } from './face.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private gameState :GameState = new GameState();
  
  private newGameSound :FeinmannSound;
  private gameOverSound :FeinmannSound;
  private newRoundSound :FeinmannSound;

  public gameStateSubject: BehaviorSubject<GameState>;

  private isFirstRound = false;

  constructor(private btnService : ButtonService, faceService: FaceService) { 
    this.newGameSound = new FeinmannSound('assets/audio/me haces el sanguchito.wav',faceService);
    this.gameOverSound = new FeinmannSound('assets/audio/no la verda que no.wav',faceService);
    this.newRoundSound = new FeinmannSound('assets/audio/notegustaasi.wav',faceService);
    this.gameStateSubject = new BehaviorSubject<GameState>(this.gameState);
  }

  private notifyGameStateChange(){
    this.gameStateSubject.next(this.gameState);
  }

  private sayRecipe(){
    this.btnService.disableButtons();
    this.gameState.currentProgress = [];

    const playRecursive = (index) => {

      const btnValue = this.gameState.currentGoal[index];
      const howl = this.btnService.buttons[btnValue].sound.howl;

      howl.once('end',() => {
        if(index+1 != this.gameState.currentGoal.length){
          playRecursive(index+1);
        }else{
          this.btnService.enableButtons();
          this.gameState.currentProgress = [];
          this.notifyGameStateChange();
        }
      });
      howl.play();
      this.gameState.currentProgress.push(btnValue);
      this.notifyGameStateChange();
      window.scroll(0,document.body.scrollHeight);
    };
    
    playRecursive(0);
  }

  public onButtonClick(btnId: number){
    this.btnService.disableButtons();
    this.gameState.currentProgress.push(btnId);

    let correct = this.checkCorrectness();
    
    if(!correct){
      this.gameOver();
      return;
    }
    
    //Play button sound
    const howl = this.btnService.buttons[btnId].sound.howl;
    howl.once('end', ()=>{
      if(this.gameState.currentProgress.length === this.gameState.currentGoal.length){
        this.processNewRound();
      }else{
        this.btnService.enableButtons();
      }
    })
    howl.play();
    setTimeout( () => window.scroll(0,document.body.scrollHeight), 0);
  }

  public startGame(){
    this.isFirstRound = true;
    this.gameState.gameStarted = true;
    this.gameState.currentProgress = [];
    this.gameState.currentGoal = [];

    this.notifyGameStateChange();

    this.newGameSound.howl.once('end', ()=>{
      this.processNewRound();
      this.btnService.enableButtons();
    });
    this.newGameSound.howl.play();
  }

  private checkCorrectness() : boolean{
    for(let i = 0; i< this.gameState.currentProgress.length; i++){
      if(this.gameState.currentProgress[i] != this.gameState.currentGoal[i])
        return false;
    }
    return true;
  }

  private processNewRound(){

    const newRound = () => {
      this.gameState.currentGoal.push(Math.floor(Math.random() * this.btnService.buttonComponents.length));
      this.gameState.currentProgress = [];
      this.notifyGameStateChange();
      this.sayRecipe();
    }

    if(this.isFirstRound){
      this.isFirstRound = false;
      newRound();
    }else{
      this.newRoundSound.howl.once('end', newRound);
      this.newRoundSound.howl.play();
      this.btnService.disableButtons();
    }
  }

  private gameOver(){
    this.gameOverSound.howl.once('end', () => {
      this.gameState.gameStarted = false;
      this.gameState.currentGoal = [];
      this.gameState.currentProgress = [];
      this.notifyGameStateChange();
    });
    this.gameOverSound.howl.play();
    this.btnService.disableButtons();
  }
}
