// to split the text that was submitted and add to #outputbox
function separateText() {
	document.getElementById('textbox').select();
	var textString = document.getElementById('textbox').value;
	var splitString = textString.split(" ");
	for (var i = 0; i < splitString.length; i++) {
		$('#outputbox').append(spaceOut(splitString[i]));	
	}
}

// to space out each string and make the word clickable
function spaceOut(word) {
	return "<span class='words'  onclick='search2(\"" + word + "\");'>" + word + "</span>";
}

// make request to Big Huge Thesaurus
function search2(query) {
	var apiKey = "aqq3UFVvHqr7E7PSQki8";
	var url = "http://thesaurus.altervista.org/thesaurus/v1?word=" + query + "&language=en_US&output=json&key=" + apiKey + "&callback=?";
	//var url = "http://words.bighugelabs.com/api/2/" + apiKey + "/" + query + "/json?callback=?";
	$.getJSON(url, carryoutRequest);
}

function carryoutRequest(palabras) { 
  output = ""; 
  for (key in palabras.response) { 
    list = palabras.response[key].list; 
    output += list.synonyms+"<br>"; 
  } 
  if (output) 
    document.getElementById("thesaurus").innerHTML = output; 
}
