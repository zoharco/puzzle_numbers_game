import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardGameComponent } from './board-game/board-game.component';
import { GameOverComponent } from './game-over/game-over.component';
import { GameMainScreenComponent } from './game-main-screen/game-main-screen.component';


const routes: Routes = [
  { path: '', component: GameMainScreenComponent, pathMatch: 'full' },
  { path: 'game-board', component: BoardGameComponent, pathMatch: 'full' },
  { path: 'game-over', component: GameOverComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  


}

