$(document).ready(function() {
// Timer functionality
let time;
let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");
let totalSeconds = 0;

function setTime()
{
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds%60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
    minutes = pad(totalSeconds%60);
    seconds = pad(parseInt(totalSeconds/60));
}

function pad(val)
{
    var valString = val + "";
    if(valString.length < 2)
    {
        return "0" + valString;
    }
    else
    {
        return valString;    
    }
}


// Modal functionality

// Get modal element
let modal = $('#simpleModal');
// Get close button
let closeBtn = $('.close-btn');
// Get Play 
let playAgainBtn = $('#play-again');
// Get Restart Button
let restartBtn = $('.restart');
// Function to open modal;
let openModal = function() {
	modal.css('display', 'block'); 
}
// Function to close modal;
let closeModal = function() {
	modal.css('display', 'none');
}
//Listen for click to close modal with close button
closeBtn.click(closeModal);

//create a list that holds all the cards images
let cardsImages = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"]
let deck = $('.deck');
let cardHtml = [];
let cards = $('.card');
let winMessage = $('.win-message');
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

shuffle(cardsImages);
console.log(cardsImages);

//loop through each card and create its HTML
let createCardHtml = function () {
	for(let i = 0; i < cardsImages.length; i++) {
		cardHtml[i] = `<i class="${cardsImages[i]}"></i>`;
	}
	return cardHtml;	
}

createCardHtml();

//add each card's HTML to the page
cards.each(function (index) {
    $(this).html(cardHtml[index]);
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
let openCards = [];
let move = 0;
let matchedCardsArray = [];

//returns 1 if the cards matched
let cardsMatched = function() {
	if(openCards[0].innerHTML === openCards[1].innerHTML) {
	return 1;
	} else {
		return 0;
	}
};

//flips back the cards
let hideCards = function() {
	openCards.removeClass("open");
	openCards.removeClass("show");
	openCards = [];
	//openCards.css("background", "#2e3d49");
	console.log(openCards);
}

//increase the moves counter
let moves = function() {
	move++;
	if(move === 1) {
		$('.moves').text("   " + move + " Move");
	} else {
		$('.moves').text("   " + move + " Moves");
	}
}

// Adds win message to the page and hides the cards deck
let win = function () {
	deck.addClass('hidden');
	winMessage.append(`<p>You got ${displayStarNumber()} with <strong>${move}</strong> Moves after <strong>${pad(parseInt(totalSeconds/60))}</strong> minutes and <strong>${pad(totalSeconds%60)}</strong> seconds. Woooooo!</p>`);
	openModal();
	clearInterval(time);

}

// New game function
let newGame = function() {
	matchedCardsArray.removeClass('match');
	matchedCardsArray.removeClass('open');
	matchedCardsArray.removeClass('show');
	winMessage.html('');
	deck.removeClass('hidden');
	move = -1;
	moves();
	closeModal();
	shuffle(cardsImages);
	console.log(cardsImages);
	totalSeconds = 0;
	flag = 0;
	stars = 3;
	$('#star3').removeClass('lostAStar');
	$('#star2').removeClass('lostAStar');

}

// Restart game function
let restartGame = function() {
	//matchedCardsArray.removeClass('match');
	//matchedCardsArray.removeClass('open');
	//matchedCardsArray.removeClass('show');
	//winMessage.html('');
	//deck.removeClass('hidden');
	move = -1;
	moves();
	closeModal();
	shuffle(cardsImages);
	createCardHtml();
	cards.each(function (index) {
    	$(this).html(cardHtml[index]);
	});
	console.log(cardsImages);
	totalSeconds = 0;
	flag = 0;
	stars = 3;
	$('#star3').removeClass('lostAStar');
	$('#star2').removeClass('lostAStar');

}

let noOfStars = 3;
//Function which sets the correct number of stars above the deck
let setStars = function() {
	if(move > 14) {
		// Removes one of the stars above the deck
		$('#star3').addClass('lostAStar');
		// Set the number of remaining stars
		noOfStars = 2;
	}
	if(move > 16) {
		// Removes another star above the deck
		$('#star2').addClass('lostAStar');
		// Set the number of remaining stars
		noOfStars = 1;
	}
}

let displayStarNumber = function() {
	if(noOfStars === 1) {
		return noOfStars + " Star";
	} else {
		return noOfStars + " Stars";
	}
}

//Start timer
let startTimer = function() {
	if(flag) {
		time = setInterval(setTime, 1000);
		flag = 0;
	}
}

cards.addClass('show');

// Flag which permits the timer to start only at the first click on the deck
let flag = 1;

cards.click(function() {
	startTimer();

	if(openCards.length < 2) {
		$(this).addClass("open show");
	}

	openCards = $('.open');
	if(openCards.length === 2) {
		if (cardsMatched()) {
			openCards.addClass("match");
			hideCards();
			moves();
		} else {
			setTimeout(func, 500);
			function func() {
				hideCards(); 
			}
			moves();
		}	
	}
	matchedCardsArray = $('.match');

	setStars();

	//show win message
	if(matchedCardsArray.length == 16) {
		win();
	}

	//start a new game
	playAgainBtn.click(newGame);

});

restartBtn.click(restartGame);
});






