import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.css']
})

export class GameOverComponent {
  text = `You Solved The Puzzle!!!`;

  constructor(private router:Router) {}

  onNewGame() {
    this.router.navigate(['/game-board']);  
  }
}