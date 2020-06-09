import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-screen',
  templateUrl: './game-main-screen.component.html',
  styleUrls: ['./game-main-screen.component.css']
})

export class GameMainScreenComponent {
  constructor(private router: Router) {}

  onGameStart() {
    this.router.navigate(['/game-board']);
  }
}