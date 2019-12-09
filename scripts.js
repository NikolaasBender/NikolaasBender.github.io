var folder = "images/";

$.ajax({
    url : folder,
    success: function (data) {
        $(data).find("a").attr("href", function (i, val) {
            if( val.match(/\.(jpe?g|png|gif)$/) ) { 
                $("body").append( "<img src='"+ folder + val +"'>" );
            } 
        });
    }
});



//THIS IS THE NAVIGATION OF THE SITE
function switcheroo(choice) {
	var h = document.getElementById("home");
	var s = document.getElementById("projects");
	var c = document.getElementById("contact");
	//var e = document.getElementById("easteregg");

	if(choice == "h"){
		if (h.style.display === "block") {
        	h.style.display = "none";
    	} else {
        	h.style.display = "block";
        	s.style.display = "none";
        	c.style.display = "none";
        	//e.style.display = "none";
    	}
	}


	if(choice == "s"){
		if (s.style.display === "block") {
        	s.style.display = "none";
    	} else {
        	s.style.display = "block";
        	h.style.display = "none";
        	c.style.display = "none";
        	//e.style.display = "none";
    	}
	}


	if(choice == "c"){
		if (c.style.display === "block") {
        	c.style.display = "none";
    	} else {
        	c.style.display = "block";
        	s.style.display = "none";
        	h.style.display = "none";
        	//e.style.display = "none";
    	}
	}
}



// a key map of allowed keys
var allowedKeys = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  65: 'a',
  66: 'b'
};

// the 'official' Konami Code sequence
var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];

// a variable to remember the 'position' the user has reached so far.
var konamiCodePosition = 0;

// add keydown event listener
document.addEventListener('keydown', function(e) {
  // get the value of the key code from the key map
  var key = allowedKeys[e.keyCode];
  // get the value of the required key from the konami code
  var requiredKey = konamiCode[konamiCodePosition];

  // compare the key with the required key
  if (key == requiredKey) {

    // move to the next key in the konami code sequence
    konamiCodePosition++;

    // if the last key is reached, activate cheats
    if (konamiCodePosition == konamiCode.length) {
      activateCheats();
      konamiCodePosition = 0;
    }
  } else {
    konamiCodePosition = 0;
  }
});

function activateCheats() {
  document.body.style.backgroundImage = "url('mtns.jpg')";

  if (e.style.display === "block") {
        e.style.display = "none";
   	} else {
	    e.style.display = "block";
		h.style.display = "none";
	    s.style.display = "none";
	    c.style.display = "none";
	}

  alert("cheats activated");
}