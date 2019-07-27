var icons = ["fa fa-diamond", "fa fa-diamond",
            "fa fa-paper-plane-o", "fa fa-paper-plane-o",
            "fa fa-anchor", "fa fa-anchor",
            "fa fa-bolt", "fa fa-bolt",
            "fa fa-cube", "fa fa-cube",
            "fa fa-leaf", "fa fa-leaf",
            "fa fa-bicycle", "fa fa-bicycle",
            "fa fa-bomb", "fa fa-bomb"];
var openedCards = [];
var matchedCards = [];
var cardContainer = document.querySelector(".deck"); // icons container
var isFirstClick = true;
var movesContainer = document.querySelector(".moves");
var moves = 0;
var hours, minutes, seconds, totalTime = 0, incrementer;
var secondsContainer = document.querySelector("#seconds");
var minutesContainer = document.querySelector("#minutes");
var hoursContainer = document.querySelector("#hours");


function init() {
    var iconsList = shuffle(icons);
    for(var i = 0; i < iconsList.length; i++) {
      var card = document.createElement("li");
      card.classList.add("card");
      card.innerHTML = "<i class ='" +icons[i]+ "'></i>";
      cardContainer.appendChild(card);
       clickCard(card);
    }
}
 //start the game for first time
 init();

// Adding click eventListener to card
function clickCard(card) {
    card.addEventListener('click', function() {
     
      if(isFirstClick) {
            isFirstClick = false;
            startTimer();
        }

      if(openedCards.length === 1) {
        var currentCard = this; //current card
        var previousCard = openedCards[0];

        card.classList.add("open", "show", "disable");
        openedCards.push(this);
        // we will compare our opened cards
        compare(currentCard,previousCard);
      } else {
          card.classList.add("open", "show", "disable");
          openedCards.push(this);
      }
    });
}
//compare function
function compare(currentCard,previousCard) {
   if(currentCard.innerHTML === previousCard.innerHTML) {
       currentCard.classList.add("match");
       previousCard.classList.add("match");

       matchedCards.push(currentCard,previousCard);

       openedCards = [];

       //check if the game is over
       gameOver();
   } else {
       setTimeout(function() {
        //console.log("Doesn't match");
        currentCard.classList.remove("open", "show", "disable");
        previousCard.classList.remove("open","show", "disable");
       },1200);

       openedCards = [];
   }
   addMove();
}
// gameOver function
function gameOver() {
    if(matchedCards.length === icons.length) {
        stopTimer();
        alert("Game Over");
    }
}

// move function
movesContainer.innerHTML = 0;
function addMove() {
    moves++;
    movesContainer.innerHTML = moves;
    //set the rating
    rating();
}

//rating function
var starContainer = document.querySelector(".stars");
starContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li>`;

function rating() {
    if(moves <= 11 ) {
      starContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>`;
    } else if(moves < 20 && moves > 12) {
       starContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
       <li><i class="fa fa-star"></i></li>`; 
    } else {
        starContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Timer start

function startTimer() {

    //start Incrementer
    incrementer = setInterval(function() {
    // Add totalTime by 1
    totalTime += 1;
    //conver Total Time to H:M:S
    calculateTime(totalTime);
    
    //change the current time values
    secondsContainer.innerHTML = seconds;
    minutesContainer.innerHTML = minutes;
    hoursContainer.innerHTML = hours;
    }, 1000);
}

// Timer [calculate time]

function calculateTime() {
    hours = Math.floor( totalTime / 60 / 60);
    minutes = Math.floor( (totalTime / 60) % 60);
    seconds = totalTime % 60;
}

function stopTimer() {
    clearInterval(incrementer);
}

var restart = document.querySelector(".restart");

restart.addEventListener('click', function() {
    //delete all cards
    cardContainer.innerHTML = "";
    //call init() to start restart game again
    init();
    // reset any related variables
    matchedCards = [];
    openedCards = [];
    //reset moves
    moves = 0;
    minutesContainer.textContent = "";
    hoursContainer.textContent = "";
    secondsContainer.textContent = "";
    movesContainer.innerHTML = moves;
    starContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
    stopTimer();
    isFirstClick = true;
    totalTime = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
});