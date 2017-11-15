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
//cards.addClass('match');

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
	//openCards.css("background", "#2e3d49");
	console.log(openCards);
}

//increase the moves counter
let moves = function() {
	move++;
	if(move === 1) {
		$('.moves').text(move + " Move");
	} else {
		$('.moves').text(move + " Moves");
	}
}

let win = function () {
	deck.addClass('hidden');
	winMessage.html(`<h2>Congratulations! You Won!</h2>
		<p>With ${move} Moves and. Woooooo!</p>
		<button class="play-again">Play again</button>`);
}

cards.click(function() {
	$(this).addClass("open show");
	openCards = $('.open');
	if(openCards.length === 2) {
		if(cardsMatched()) {
		openCards.addClass("match");
		hideCards();
		//openCards.css("background", "#02ccba");
		moves();
		} else {
			//openCards.css('background', 'red');
			setTimeout(func, 500);
			function func() {
				hideCards(); 
			}
			//openCards.css('background', '#2e3d49');
			moves();
		}	
	}
	matchedCardsArray = $('.match');
	//show win message
	if(matchedCardsArray.length == 16) {
		win();
	}
	//start a new game
	$('.play-again').click(function() {
		matchedCardsArray.removeClass('match');
		matchedCardsArray.removeClass('open');
		matchedCardsArray.removeClass('show');
		winMessage.html('');
		deck.removeClass('hidden');
		move = -1;
		moves();
	});
});









