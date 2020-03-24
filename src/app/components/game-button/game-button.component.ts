import { Component, OnInit, Input, HostListener } from '@angular/core';
import { GameService } from 'src/app/services/game-service.service';
import { ButtonService } from 'src/app/services/button.service';

@Component({
  selector: 'app-game-button',
  templateUrl: './game-button.component.html',
  styleUrls: ['./game-button.component.css']
})
export class GameButtonComponent implements OnInit {

  @Input() color : string;
  imgSrc: string;
  btnId: number;
  public enabled: boolean = false;

  constructor(private gameService: GameService, private btnService: ButtonService) { }

  ngOnInit(): void {
    this.btnId = this.btnService.registerButton(this);
    this.imgSrc = this.btnService.buttons[this.btnId].iconSrc;
  }

  onClick(){
    this.gameService.onButtonClick(this.btnId);
  }

}
