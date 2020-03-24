import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameButtonComponent } from './components/game-button/game-button.component';
import { GameAreaComponent } from './components/game-area/game-area.component';

@NgModule({
  declarations: [
    AppComponent,
    GameButtonComponent,
    GameAreaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
