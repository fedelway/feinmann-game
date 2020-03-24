import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaceService {

  private closedMouthSrc = "assets/img/feinmann.png";
  private openMouthSrc = "assets/img/feinmannboca.png";

  private faceSrcSubject :BehaviorSubject<string>;
  private changeInterval = 200;

  private isTalking = false;
  
  constructor() { 
    this.faceSrcSubject = new BehaviorSubject<string>(undefined);
    this.faceSrcSubject.next(this.closedMouthSrc);
    setTimeout(this.changeFace.bind(this),this.changeInterval);
  }

  private changeFace(){
    if(this.isTalking !== false){
      if( this.faceSrcSubject.value === this.closedMouthSrc ){
        this.faceSrcSubject.next(this.openMouthSrc)
      }else this.faceSrcSubject.next(this.closedMouthSrc);  
    }
    setTimeout(this.changeFace.bind(this),this.changeInterval);
  }

  public startTalking(){
    this.isTalking = true;
    this.faceSrcSubject.next(this.openMouthSrc);
  }

  public stopTalking(){
    this.isTalking = false;
    this.faceSrcSubject.next(this.closedMouthSrc);
  }

  public get faceSubject(){
    return this.faceSrcSubject;
  }

}
