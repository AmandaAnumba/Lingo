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
	$('.words').click(function() {
		$('.words').removeClass('highlighter');
		$(this).addClass('highlighter');
		var words = $(this).text();
		// console.log(words);
		// doubleTrouble(words);
	});
	
	search_dict(query);
	search2(query);
}

// make definition request to Google Dictionary
// function search(query) {
// 	var url = "http://www.google.com/dictionary/json?callback=?&q=" + query + "&sl=en&tl=en&restrict=pr%2Cde&client=te";
// 	$.getJSON(url, handleRequest);
// }

// // get definitions
// function handleRequest(data) {
// 	$('#dictionary').empty();
// 	for (var i = 0; i < 5; i++) {
// 		$('#dictionary').append(printDefn(data.webDefinitions[0].entries[i]))
// 		}
// }
// // print definitions
// function printDefn(defn) {
// 	return "<p>" + defn.terms[0].text + "</p>";
// }


function search_dict(query) {
	var key = "AiDwz6xRBaLzcYATfWuJC3jaSeC8hjwM";
	var q = query.toLowerCase().replace(/[^a-z0-9\s]/gi, ''); 
	var url = "https://api.pearson.com/v2/dictionaries/ldoce5/entries?search="+q+"&jsonp=data&apikey="+key;
	$.getJSON(url, request);
	$('#dictionary').empty().append("<strong>Word: </strong><small class='query' id='q'>"+q+"</small>");
}

// get definitions
function request(data) {
	console.log(data);
	var search = $('#q').text();

	for (var i = 0; i < data.results.length; i++) {
		var head = data.results[i].headword;
		// console.log(head);
		// console.log(head, " ", search);
		if (head.toLowerCase() == search) {
			var pos = data.results[i].part_of_speech;
			var def = data.results[i].senses[0].definition;
			$('#dictionary').append("<p style='text-align:left;'><strong>Part of speech: </strong><small class='pos'>"+pos+"</small></p>");
			$('#dictionary').append("<p style='text-align:left;'><strong>Definition: </strong><small class='def'>"+def+"</small></p>");
		}
		
		else {
			continue
		}
	}
}

// //FOR THESAURUS
// // make request to Big Huge Thesaurus
// function search2(query) {
// 	var apiKey = "aqq3UFVvHqr7E7PSQki8";
// 	var url = "http://thesaurus.altervista.org/thesaurus/v1?word=" + query + "&language=en_US&output=json&key=" + apiKey + "&callback=?";
// 	$.getJSON(url, carryoutRequest);
// }

// //get and print synonyms
// function carryoutRequest(palabras) { 
//   output = ""; 
//   for (key in palabras.response) { 
//     list = palabras.response[key].list; 
//     output += list.synonyms+"<p>"; 
//   } 
//   if (output) 
//     document.getElementById("thesaurus").innerHTML = output; 
// }

//FOR THESAURUS
// make request to Big Huge Thesaurus
function search2(query) {
	var apiKey = "aqq3UFVvHqr7E7PSQki8";
	var q = query.toLowerCase().replace(/[^a-z0-9\s]/gi, ''); 
	var url = "http://thesaurus.altervista.org/thesaurus/v1?word=" + q + "&language=en_US&output=json&key=" + apiKey + "&callback=?";
	$.getJSON(url, carryoutRequest);
	$('#thesaurus').empty().append("<strong>Word: </strong><small class='query'>"+q+"</small>");
}

//get and print synonyms
function carryoutRequest(word) { 
	var output = ""; 
	console.log(word);

	for (var i=0; i<2; i++) { 
		var key = word.response[i].list.synonyms; 
		var data = "<p>"+key+"</p>";
		output += data;
	} 

	if (output != "") {
		$('#thesaurus').append('<p><small>'+output+'</small></p>');
	}

	else {
		$('#thesaurus').append('<p><small>No Results</small></p>');
	}
		
}
