
var correctCards = 0;
var numbers;
$( init );
$(test);


function init() {

  

  // Reset the game
  correctCards = 0;
  $('#cardPile').html( '' );
  $('#cardSlots').html( '' );

  // Create the pile of shuffled cards
   
  initPile();
  
 
    
	
  // Create the card slots
  var answers = ["", "<b>80*</b>","<b>79*</b>", "<b>78*</b>","<b>77*</b>", "<b>76*</b>", "<b>75*</b>",
  				"<b>30*</b>", "54%SW","65%W", "67%W","79%W", "75%W", "72%NW",
  				"<b>29*</b>", "55%S","69%SW", "95%SW","100%W", "95%NW", "78%NW",
  				"<b>28*</b>", "65%S","74%S", "98%S","<b>Eye</b>", "98%N", "78%N",
  				"<b>27*</b>", "60%S","75%SE", "100%SE","100%E", "94%NE", "77%NE",
  				"<b>26*</b>", "58%S","74%SE", "78%E","80%E", "75%E", "69%NE",
  				"<b>25*</b>", "55%SE","57%E", "59%E","62%E", "60%E", "58%NE",];
  for ( var i=0; i<answers.length; i++ ) {
  
    	$('<div>' + answers[i] + '</div>').data( 'number', answers[i] ).appendTo( '#cardSlots' ).droppable( {
      	accept: '#cardPile div',
      	hoverClass: 'hovered',
      	drop: handleCardDrop
    	} );
    }
  
}//end of init

function initPile(){
	
	numbers = [ "54%SW","65%W", "67%W","79%W", "75%W", "72%NW",
  				 "55%S","69%SW", "95%SW","100%W", "95%NW", "78%NW",
  				 "65%S","74%S", "98%S", "98%N", "78%N",
  				 "60%S","75%SE", "100%SE","100%E", "94%NE", "77%NE",
  				 "58%S","74%SE", "78%E","80%E", "75%E", "69%NE",
  				 "55%SE","57%E", "59%E","62%E", "60%E", "58%NE",];
  
  numbers.sort( function() { return Math.random() - .5 } );
	
  for ( var i=0; i<numbers.length; i++ ) {
  	
  	
    $('<div>' + numbers[i] + '</div>').data( 'number', numbers[i] ).attr( 'id', 'card'+numbers[i] ).appendTo( '#cardPile' ).draggable( {
      containment: null,
      stack: '#cardPile div',
      cursor: 'move',
      revert: true
    } ); 
  }

}//initPile





var index  = 0;
var correctAnswers = 0;

function  test (){
	var selectionsIndex = 0;
	if (index !== 0){
		if(index === 1){
			selectionsIndex = 4;
		}
		else{
			selectionsIndex = 8;
		}
	}

	var questions = ["What is a dropsonde?",
					"What does a dropsonde do?",
					"What does a dropsonde measure?"];
	var selections = ["teardrop", "weather device", "air plane", "submarine",
					"measures time", "measures weather", "measures nothing", "measures height",
					  "measures time", "measures weather", "measures height","measures nothing"];
				
	$("#question").text(questions[index++]);
	$("#label1").text(selections[selectionsIndex]);
	$("#label2").text(selections[++selectionsIndex]);
	$("#label3").text(selections[++selectionsIndex]);
	$("#label4").text(selections[++selectionsIndex]);
	
	
	var selection = $('input[name="group1"]:checked').val();
	var choice;
	if(selection == 1){
		choice = $("#label1").text();
	
	}else if(selection == 2){
		choice = $("#label2").text();
	
	}else if(selection == 3){
		choice = $("#label3").text();
	
	}else if (selection == 4){
		choice = $("#label4").text();
	}
		console.log(selection);
		console.log(choice);
	
	if(  $("#label2").text() == choice ){//   all correct answers are the second choice
		
		correctAnswers++;
		console.log( 'hey');
		}
		
	if(index > questions.length){

			//pass or fail stuff
			if(correctAnswers > 1 ){
			$("#question").text("You are a Dropsonde Expert!");
		
			$("#label1").text("You are a Dropsonde Expert!");
			$("#label2").text("You are a Dropsonde Expert!");
			$("#label3").text("You are a Dropsonde Expert!");
			$("#label4").text("You are a Dropsonde Expert!");
		
		
			}else{
				$("#question").text("Looks like your going to summer school!");
				$("#label1").text("Looks like your going to summer school!");
				$("#label2").text("Looks like your going to summer school!");
				$("#label3").text("Looks like your going to summer school!");
				$("#label4").text("Looks like your going to summer school!");
			}
		
			$("#button").text("Try Again");
			correctAnswers = 0;
			index = 0;
		}
		  
	return false;

}// end of test function







function handleCardDrop( event, ui ) {
  var slotNumber = $(this).data( 'number' );
  var cardNumber = ui.draggable.data( 'number' );

  // If the card was dropped to the correct slot,
  // change the card colour, position it directly
  // on top of the slot, and prevent it being dragged
  // again

  if ( slotNumber == cardNumber ) {
    ui.draggable.addClass( 'correct' );
    ui.draggable.draggable( 'disable');
    $(this).droppable( 'disable' );
    ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
    ui.draggable.draggable( 'option', 'revert', false );
    correctCards++;
  } 
  
  // If all the cards have been placed correctly then display a message
  // and reset the cards for another go

  if ( correctCards == 1 ) {
 
    
   
	playVideo("http://www.youtube.com/embed/"+ "hd50uFn2bec" +"?rel=0&autoplay=1")

    //$("#successVideo").attr("src", "http://www.youtube.com/embed/"+ "hd50uFn2bec" +"?rel=0&autoplay=1");
     
  }

}//end of handleCardDrop

function playVideo( videoSrc){
	
	 var $iframe = $("<iframe>").attr("src", videoSrc).css({"width": 400, "height": 300});
    
    $("#success").append($iframe);
    //$iframe.wrap("<div >");
    $("#success").css("background", "#25b55f");

}


