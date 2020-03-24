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

  constructor(public gameService: GameService, 
    public btnService: ButtonService,
    public faceService: FaceService) { 
      
    }

  ngOnInit(): void {
    this.faceSrcSubscription = this.faceService.faceSubject.subscribe(next => this.faceSrc=next);
  }

  ngOnDestroy(): void{
    this.faceSrcSubscription.unsubscribe();
  }

  onClickStart(){
    this.gameService.startGame();
  }
}
