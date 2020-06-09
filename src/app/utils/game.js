$(document).ready(function(){
  var cards = [];
  var i = 0;
  const SIZE = 16;
  const EMPTY = 'empty';
  const MATRIX_SIZE = 4;
  printCards();
  function printCards(){
      //mixCards();
       cards = [1,2,3,4,5,6,7,8,9,10,11,12,13,14, EMPTY, 15];
      for(let i = 0; i < SIZE; i++){
          cardHtml = '<div class="cardW"><div class="card" id="' + (cards[i] == EMPTY ? EMPTY: ('number' + cards[i])) + '">' + (cards[i] != EMPTY? cards[i]: '')  + '</div></div>';
          $('.board').append(cardHtml);
      }
      bindClickToCards();
  }
  
  function bindClickToCards(){
      let neighborSize = 4;
      let emptyIndex = $('#empty').parent().index();
      let emptyI = parseInt(emptyIndex / MATRIX_SIZE);
      let emptyJ = parseInt(emptyIndex % MATRIX_SIZE);
      let neighborIndex;
      let cardClass = '.card';
      let $cardW = $('.cardW');
      
      $(cardClass).unbind('click touchstart');
      
      if((emptyI - 1) >= 0){
          neighborIndex = MATRIX_SIZE * (emptyI - 1) + emptyJ;
          $cardW.eq(neighborIndex).children(cardClass).bind('click touchstart', cardClicked);
          $cardW.eq(neighborIndex).children(cardClass).addClass('clickable');
      }
      if((emptyI + 1) < MATRIX_SIZE){
          neighborIndex = MATRIX_SIZE * (emptyI + 1) + emptyJ;
          $cardW.eq(neighborIndex).children(cardClass).bind('click touchstart', cardClicked);
          $cardW.eq(neighborIndex).children(cardClass).addClass('clickable');
      }
      if((emptyJ - 1) >= 0){
          neighborIndex = MATRIX_SIZE * emptyI + (emptyJ - 1);
          $cardW.eq(neighborIndex).children(cardClass).bind('click touchstart', cardClicked);
          $cardW.eq(neighborIndex).children(cardClass).addClass('clickable');
      }
      if((emptyJ + 1) < MATRIX_SIZE){
          neighborIndex = MATRIX_SIZE * emptyI + (emptyJ + 1);
          $cardW.eq(neighborIndex).children(cardClass).bind('click touchstart', cardClicked);
          $cardW.eq(neighborIndex).children(cardClass).addClass('clickable');
      }
      
  }
  

  function cardClicked(){
      $('.card').unbind('click touchstart');
      
      let empty = $('#empty');
      let numberIndex = $(this).parent().index();
      let emptyIndex = empty.parent().index();
      let numberI = parseInt(numberIndex / MATRIX_SIZE);
      let numberJ = parseInt(numberIndex % MATRIX_SIZE);
      let emptyI = parseInt(emptyIndex / MATRIX_SIZE);
      let emptyJ = parseInt(emptyIndex % MATRIX_SIZE);
      let temp;

      if(numberI == emptyI){
          if(Math.abs(numberJ - emptyJ) > 1){
              return;
          }
          temp = cards[numberIndex];
          cards[numberIndex] = cards[emptyIndex];
          cards[emptyIndex] = temp;
          if(numberJ > emptyJ){
              $(this).animate({left: "-=150"}, 250, function() {
                  swapHtml(this, empty, numberIndex, emptyIndex);
                  checkEndGame();
                  bindClickToCards();
              });
          }
          else{// numberJ < emptyJ
              $(this).animate({left: "+=150"}, 250, function() {
                  swapHtml(this, empty, numberIndex, emptyIndex);
                  checkEndGame();
                  bindClickToCards();
              });
          }
      }
      else if(numberJ == emptyJ){
          if(Math.abs(numberI - emptyI) > 1){
              return;
          }
          temp = cards[numberIndex];
          cards[numberIndex] = cards[emptyIndex];
          cards[emptyIndex] = temp;
          if(numberI > emptyI){
              $(this).animate({top: "-=150px"}, 250, "linear", function() {
                  swapHtml(this, empty, numberIndex, emptyIndex);
                  checkEndGame();
                  bindClickToCards();
              });
          }
          else{// numberI < emptyI
              $(this).animate({top: "+=150"}, 250, "linear", function() {
                  swapHtml(this, empty, numberIndex, emptyIndex);
                  checkEndGame();
                  bindClickToCards();
              });
          }
      }
      console.log(cards);
  }

  function checkEndGame(){
      for(let i = 0; i < cards.length; i++){
          if(cards[i] != i +1 && i < cards.length - 1){
              return;
          }
          if(cards[i] != EMPTY &&  i == cards.length - 1){
              return;
          }
      }
      alert('GAME OVER!!!');
  }

  function swapHtml(currentCard, empty, numberIndex, emptyIndex){
      temp = $(currentCard).detach();
      $('.cardW').eq(numberIndex).html(empty[0]);
      $(currentCard).css({left : 0, top : 0})
      $('.cardW').eq(emptyIndex).html(temp);
  }

  function mixCards(){
      let mixedCards = new Array(SIZE).fill(false);// boolean array for chosen cards randomly
      let i;
      let cardNum;
      let emptyCardZoneNum;
      i = 0;
      while(i < SIZE - 1){
          cardNum = parseInt(Math.random() * (SIZE - 1));
           if(!mixedCards[cardNum]){
              mixedCards[cardNum] = true;
              cards[i] = cardNum + 1;
              i++
           }
      }
      cards[i] = EMPTY;
      emptyCardZoneNum = parseInt(Math.random() * SIZE);
      cards[cards.length - 1] = cards[emptyCardZoneNum];
      cards[emptyCardZoneNum] = EMPTY;
  }
});



