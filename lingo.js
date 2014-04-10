//FOR DICTIONARY
// to split the text that was submitted and add to #outputbox
function splitText() {
	document.getElementById('textbox').select();
	var textString = document.getElementById('textbox').value;
	var splitString = textString.split(" ");
	for (var i = 0; i < splitString.length; i++) {
		$('#outputbox').append(space(splitString[i]));	
	}
}

// to space out each string and make the word clickable
function space(word) {
	return "<span class='words'  onclick='doubleTrouble(\"" + word + "\");'>" + word + "</span>";
}

//call the two search functions
function doubleTrouble(query) {
	search(query);
	search2(query);
}

// make definition request to Google Dictionary
function search(query) {
	var url = "http://www.google.com/dictionary/json?callback=?&q=" + query + "&sl=en&tl=en&restrict=pr%2Cde&client=te";
	$.getJSON(url, handleRequest);
}

// get definitions
function handleRequest(data) {
	$('#dictionary').empty();
	for (var i = 0; i < 5; i++) {
		$('#dictionary').append(printDefn(data.webDefinitions[0].entries[i]))
		}
}

// print definitions
function printDefn(defn) {
	return "<p>" + defn.terms[0].text + "</p>";
}

//FOR THESAURUS
// make request to Big Huge Thesaurus
function search2(query) {
	var apiKey = "aqq3UFVvHqr7E7PSQki8";
	var url = "http://thesaurus.altervista.org/thesaurus/v1?word=" + query + "&language=en_US&output=json&key=" + apiKey + "&callback=?";
	$.getJSON(url, carryoutRequest);
}

//get and print synonyms
function carryoutRequest(palabras) { 
  output = ""; 
  for (key in palabras.response) { 
    list = palabras.response[key].list; 
    output += list.synonyms+"<p>"; 
  } 
  if (output) 
    document.getElementById("thesaurus").innerHTML = output; 
}
