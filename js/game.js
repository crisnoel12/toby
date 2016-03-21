/*jslint browser: true*/
/*global $, jQuery*/

'use strict';
$(document).ready(function(){
	$('.ttc').show();
	$('#game-selector').change(function(){
		if ($(this).val() == 1) {
			$('.rpsls').hide();
			$('.ttc').show();
		} else {
			$('.ttc').hide();
			$('.rpsls').show();
		}
	});
});

var $winCountTtc = 0,
	$lossCountTtc = 0,
	$tieCountTtc = 0,
	$winCountRpsls = 0,
	$lossCountRpsls = 0,
	$tieCountRpsls = 0,
	$playCount = 0,
	$winsTtc = $('.win-ttc span'),
	$lossTtc = $('.loss-ttc span'),
	$tiesTtc = $('.tie-ttc span'),
	$winsRpsls = $('.win-rpsls span'),
	$lossRpsls = $('.loss-rpsls span'),
	$tiesRpsls = $('.tie-rpsls span'),
	gamePiece = 'X',
	i = 0;

/**
 * Rock, Paper, Scissors, Lizard, Spock
 */
$('button').click(function(){
	$playCount++;
	var $randomPick = Math.floor(Math.random() * 5) + 1,
		$tobysPick,
		$playersPick = $(this).text();
	if ($randomPick === 1){
		$tobysPick = 'Rock';
	} else if ($randomPick === 2){
		$tobysPick = 'Paper';
	} else if ($randomPick === 3){
		$tobysPick = 'Scissors';
	} else if ($randomPick === 4){
		$tobysPick = 'Lizard';
	} else{
		$tobysPick = 'Spock';
	}
	if ($playersPick === 'Rock'){
		if($tobysPick === 'Lizard' || $tobysPick === 'Scissors'){
			win();
		} else if($tobysPick === 'Rock'){
			tie();
		} else {
			loss();
		}
	} else if($playersPick === 'Scissors'){
		if($tobysPick === 'Paper' || $tobysPick === 'Lizard'){
			win();
		} else if($tobysPick === 'Scissors'){
			tie();
		} else {
			loss();
		}
	} else if($playersPick === 'Paper'){
		if($tobysPick === 'Spock' || $tobysPick === 'Rock'){
			win();
		} else if($tobysPick === 'Paper'){
			tie();
		} else {
			loss();
		}
	} else if($playersPick === 'Lizard'){
		if($tobysPick === 'Paper' || $tobysPick === 'Spock'){
			win();
		} else if($tobysPick === 'Lizard'){
			tie();
		} else {
			loss();
		}
	} else {
		if($tobysPick === 'Rock' || $tobysPick === 'Scissors'){
			win();
		} else if($tobysPick === 'Spock'){
			tie();
		} else {
			loss();
		}
	}

	function win(){
		alert("You Win!");
		$winCountRpsls++;
		$winsRpsls.text($winCountRpsls);
		$('.legend').after('<tr><td>'+$playCount+'</td><td>'+$playersPick+'</td><td>'+$tobysPick+'</td><td class="green">Win</td></tr>');
	}
	function loss(){
		alert("You Lose!");
		$lossCountRpsls++;
		$lossRpsls.text($lossCountRpsls);
		$('.legend').after('<tr><td>'+$playCount+'</td><td>'+$playersPick+'</td><td>'+$tobysPick+'</td><td class="red">Lose</td></tr>');
	}
	function tie(){
		alert("We Tie!");
		$tieCountRpsls++;
		$tiesRpsls.text($tieCountRpsls);
		$('.legend').after('<tr><td>'+$playCount+'</td><td>'+$playersPick+'</td><td>'+$tobysPick+'</td><td class="blue">Tie</td></tr>');
	}

});

/**
 * Tic-Tac-Toe Game
 */

$('.board td').click(function(){
	if($(this).text() === ''){
		$(this).text(gamePiece);
		switchPlayer();
	}
});

function switchPlayer(){
	i++;
	if (checkForWin(gamePiece)) {
		if(gamePiece === 'X'){
			alert('You Win!');
			win();
			resetBoard();
		} else {
			alert('You Lose!');
			loss();
			resetBoard();
		}

	} else if(gamePiece === 'X' && i < 9){
		tobysTurn();
	} else if(i === 9){
		alert('We Tie!');
		tie();
		resetBoard();
	} else {
		gamePiece = 'X'
	}
}

function tobysTurn(){
	gamePiece = 'O';
	do {
		var randomCell = Math.floor(Math.random() * 8) + 1;
	} while ($('.board td').eq(randomCell).text() !== '');
	setTimeout(function(){
		$('.board td').eq(randomCell).click();
	},200);
}

function getCell(number){
	return $('.board td').eq(number).text();
}

function checkThree(a, b, c, piece){
	var result = false;
	if(getCell(a) === piece && getCell(b) === piece && getCell(c) === piece){
		result = true;
	}
	return result;
}

function checkForWin(piece){
	var result = false;
	if(checkThree(0, 1, 2, piece) ||
	   checkThree(3, 4, 5, piece) ||
	   checkThree(6, 7, 8, piece) ||
	   checkThree(0, 3, 6, piece) ||
	   checkThree(1, 4, 7, piece) ||
	   checkThree(2, 5, 8, piece) ||
	   checkThree(2, 4, 6, piece) ||
	   checkThree(0, 4, 8, piece)){
		result = true;
	}
	return result;
}

function resetBoard(){
	$('.board td').each(function(){
		$(this).text('');
	});
	i = 0;
	gamePiece = 'X';
}

function win(){
	$winCountTtc++;
	$winsTtc.text($winCountTtc);
}
function loss(){
	$lossCountTtc++;
	$lossTtc.text($lossCountTtc);
}
function tie(){
	$tieCountTtc++;
	$tiesTtc.text($tieCountTtc);
}
