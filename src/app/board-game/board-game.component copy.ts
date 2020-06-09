import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, state, transition } from '@angular/animations';

export class Card {
  isClickable: boolean;
  value: any;
  moveTo:string;  
  constructor(value:any, isClickable: boolean) {
    this.value = value;
    this.isClickable = isClickable;
    this.moveTo = this.isClickable? 'move' : '';
  }
}

@Component({
  selector: 'app-board-game',
  templateUrl: './board-game.component.html',
  styleUrls: ['./board-game.component.css'],
  animations: [
    trigger('moveCard', [
      state('move', style({
        transform: 'translateX(0)'
      })),
      state('moveRight', style({
        transform: 'translateX(150px)'
      })),
      state('moveLeft', style({
        transform: 'translateX(-150px)'
      })),
      state('moveUp', style({
        transform: 'translateY(-150px)'
      })),
      state('moveDown', style({
        transform: 'translateY(150px)'
      })),
      transition('move => moveRight', animate(1000)),
      transition('move => moveLeft', animate(1000)),
      transition('move => moveUp', animate(1000)),
      transition('move => moveDown', animate(1000)),
      transition('* => move', animate(0))
    ])
  ] 
})

export class BoardGameComponent implements OnInit {
  SIZE = 16;
  EMPTY = 'empty';
  ROW_MATRIX_SIZE = 4;
  emptyIndex: number;
  cards:Card[] = [];
  isClicked = false;

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
      this.isClicked = true;
      this.animateCard(index);
    }
  }
  // AnimationEvent
  onAnimationEvent(event, index: number) {
    if(event.phaseName =='done'){
      console.log("event done index: " + index + " fromState: " + event.fromState);
      if(this.isClicked) {
        let temp: Card;
        this.cards[index].moveTo = 'stay';
        temp = this.cards[this.emptyIndex];
        this.cards[this.emptyIndex] = this.cards[index];
        this.cards[index] = temp;
        this.updateEmptyIndex();
        this.updateClickableCards();
        this.isClicked = false;
        console.log(this.cards);
      }
    }
    else if(event.phaseName == 'start') {
      console.log("event start index: " + index + " fromState: " + event.fromState);
    }
    else {
      console.log("event unknown index: " + index + " fromState: " + event.fromState);
    }
  }

  animationEnded(index: number){
    if(this.isClicked) {
      let temp: Card;
      this.cards[index].moveTo = '';
      temp = this.cards[this.emptyIndex];
      this.cards[this.emptyIndex] = this.cards[index];
      this.cards[index] = temp;
      this.updateEmptyIndex();
      this.updateClickableCards();
      this.isClicked = false;
      console.log(this.cards);
    }
  }

  animateCard(cardIndex: number) {
    if(cardIndex + 1 == this.emptyIndex){
      this.cards[cardIndex].moveTo = 'moveRight';
    }
    else if(cardIndex < this.emptyIndex){
      this.cards[cardIndex].moveTo= 'moveDown';
    }
    else if(cardIndex - 1 == this.emptyIndex){
      this.cards[cardIndex].moveTo = 'moveLeft';
    }
    else {
      this.cards[cardIndex].moveTo = 'moveUp';
    }
  }

  private updateClickableCards() {
    const rowSize = this.ROW_MATRIX_SIZE;
    const emptyI = Math.floor(this.emptyIndex / rowSize);
    const emptyJ = Math.floor(this.emptyIndex % rowSize);
    let neighborIndex: number;
    this.cards.forEach(card => {
      card.isClickable = false;
      card.moveTo = '';
    });
    if(emptyI - 1 >= 0){
      neighborIndex = rowSize * (emptyI - 1) + emptyJ;
      this.cards[neighborIndex].isClickable = true;
      this.cards[neighborIndex].moveTo = 'move';
    }
    if(emptyI + 1 < rowSize){
      neighborIndex = rowSize * (emptyI + 1) + emptyJ;
      this.cards[neighborIndex].isClickable = true;
      this.cards[neighborIndex].moveTo = 'move';
    }
    if(emptyJ - 1 >= 0){
      neighborIndex = rowSize * emptyI + (emptyJ - 1);
      this.cards[neighborIndex].isClickable = true;
      this.cards[neighborIndex].moveTo = 'move';
    }
    if(emptyJ + 1 < rowSize){
      neighborIndex = rowSize * emptyI + (emptyJ + 1);
      this.cards[neighborIndex].isClickable = true;
      this.cards[neighborIndex].moveTo = 'move';
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


/*
animations: [
    trigger('moveCard', [
      state('move', style({
        transform: 'translateX(0)'
      })),
      state('stay', style({
        transform: 'translateX(0)',
      })),
      state('moveRight', style({
        transform: 'translateX(150px)'
      })),
      state('moveLeft', style({
        transform: 'translateX(-150px)'
      })),
      state('moveUp', style({
        transform: 'translateY(-150px)'
      })),
      state('moveDown', style({
        transform: 'translateY(150px)'
      })),
      transition('move => moveRight', animate(1000)),
      transition('move => moveLeft', animate(1000)),
      transition('move => moveUp', animate(1000)),
      transition('move => moveDown', animate(1000)),
      transition('* => stay', animate(0))
    ])
  ] 











@Component({
  selector: 'app-board-game',
  templateUrl: './board-game.component.html',
  styleUrls: ['./board-game.component.css'],
  animations: [
    trigger('moveCard', [
      state('move', style({
        transform: 'translateX(0)'
      })),
      state('moveRight', style({
        transform: 'translateX(150px)'
      })),
      state('moveLeft', style({
        transform: 'translateX(-150px)'
      })),
      state('moveUp', style({
        transform: 'translateX(150px)'
      })),
      state('moveDown', style({
        transform: 'translateX(-150px)'
      })),
      transition('move => moveRight', [
        style({
          transform: 'translateX(150px)'
        }),
        animate(1000)
      ]),
      transition('move => moveLeft', [
        style({
          transform: 'translateX(-150px)'
        }),
        animate(1000)
      ]),
      transition('move => moveUp', [
        style({
          transform: 'translateY(150px)'
        }),
        animate(1000)
      ]),
      transition('move => moveDown', [
        style({
          transform: 'translateY(-150px)'
        }),
        animate(1000)
      ])
    ])
  ] 
})
*/