import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { GameService } from 'src/app/services/game-service.service';
import { ButtonService } from 'src/app/services/button.service';
import { FaceService } from 'src/app/services/face.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-area',
  templateUrl: './game-area.component.html',
  styleUrls: ['./game-area.component.css']
})
export class GameAreaComponent implements OnInit, OnDestroy {

  private faceSrcSubscription :Subscription;
  public faceSrc :string;
  private gameStateSubscription: Subscription;
  public currentProgress :Array<number> = [];
  public gameStarted: boolean = false;

  constructor(private gameService: GameService, 
    public btnService: ButtonService,
    public faceService: FaceService) { 
      
    }

  ngOnInit(): void {
    this.faceSrcSubscription = this.faceService.faceSubject.subscribe(next => this.faceSrc=next);
    this.gameService.gameStateSubject.subscribe(gameState => {
      this.currentProgress = gameState.currentProgress;
      this.gameStarted = gameState.gameStarted;
    });
  }

  ngOnDestroy(): void{
    this.faceSrcSubscription.unsubscribe();
    this.gameStateSubscription.unsubscribe();
  }

  onClickStart(){
    this.gameService.startGame();
  }
}
