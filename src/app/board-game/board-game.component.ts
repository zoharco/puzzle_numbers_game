import { Component, OnInit } from '@angular/core';

export class Card {
  isClickable: boolean;
  value: any;
  constructor(value:any, isClickable: boolean) {
    this.value = value;
    this.isClickable = isClickable;
  }
}

@Component({
  selector: 'app-board-game',
  templateUrl: './board-game.component.html',
  styleUrls: ['./board-game.component.css']
})

export class BoardGameComponent implements OnInit {
  SIZE = 16;
  EMPTY = 'empty';
  ROW_MATRIX_SIZE = 4;
  emptyIndex: number;
  cards:Card[] = [];

  ngOnInit(){
    this.initCards();
    this.shuffleCards();
    this.updateClickableCards();
  }
  
  private initCards() {
    for(let i = 0; i < this.SIZE; i++) {
      this.cards.push(new Card((i === this.SIZE - 1)? 'empty': i+1 , false));
    }
  }

  onClickCard(index: number) {
    if(this.cards[index].isClickable){
      let temp: Card;
      temp = this.cards[this.emptyIndex];
      this.cards[this.emptyIndex] = this.cards[index];
      this.cards[index] = temp;
      this.updateEmptyIndex();
      this.updateClickableCards();
    }
  }

  private updateClickableCards() {
    const rowSize = this.ROW_MATRIX_SIZE;
    const emptyI = Math.floor(this.emptyIndex / rowSize);
    const emptyJ = Math.floor(this.emptyIndex % rowSize);
    let neighborIndex: number;
    this.cards.forEach(card => {
      card.isClickable = false;
    });
    if(emptyI - 1 >= 0){
      neighborIndex = rowSize * (emptyI - 1) + emptyJ;
      this.cards[neighborIndex].isClickable = true;
    }
    if(emptyI + 1 < rowSize){
      neighborIndex = rowSize * (emptyI + 1) + emptyJ;
      this.cards[neighborIndex].isClickable = true;
    }
    if(emptyJ - 1 >= 0){
      neighborIndex = rowSize * emptyI + (emptyJ - 1);
      this.cards[neighborIndex].isClickable = true;
    }
    if(emptyJ + 1 < rowSize){
      neighborIndex = rowSize * emptyI + (emptyJ + 1);
      this.cards[neighborIndex].isClickable = true;
    }
    
  }

  private shuffleCards(){
    let j: number;
    let temp: Card;
    for(let i = this.cards.length - 1; i > 0; i--){
      j = Math.floor(Math.random() * (i + 1));
      temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
    this.updateEmptyIndex();
  }

  private updateEmptyIndex(){
    this.emptyIndex = this.cards.findIndex(card => card.value === this.EMPTY);
  }
}
