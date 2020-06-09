import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardGameComponent } from './board-game/board-game.component';


const routes: Routes = [
  { path:'', component: BoardGameComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  


}

