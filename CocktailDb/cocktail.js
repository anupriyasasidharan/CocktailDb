
// global variables
var ajaxAnfrage;
var selectedFilter;

function pageInit()
{
	if( sessionStorage.getItem("selectedFilter") != null)
	{
		//when page reloads, previous filter info is accessed from sessionStorage and call the previousfilterload function
		var previousFilter = sessionStorage.getItem("selectedFilter");
		loadPreviousFilter();
		
	}
	else{
		//when page loads for the first time 'Random cocktails are loaded by calling the function
		loadCocktailType('c','Cocktail');
		
	}
}

//**Function to clear previous filter type when a new filter is selected
function clearFilter(filter){
	//checks the current filter and remove all other filters
	//1.removes the text from the search textbox 
	//2. selectitem of Intgredients selectbox is set to zero( option 0 = true;)
	//3.loops through the cocktailtype radiobuttonlist and if any radio button is already 'checked', makes it 'unchecked'
	switch (filter) {
	case 'searchText':
	
		//3.
		var radList = document.getElementsByName("cocktailType");
		for (var i = 0; i < radList.length; i++) {
			
			if(radList[i].checked) document.getElementById(radList[i].id).checked = false;
		}
	
		//2.
		var select = document.getElementById('intgridientId');
		select.options[0].selected = true;
	 
    break;
	
	case 'cocktailType':
  
		//1.
		document.getElementById('searchText').value = '';
		
		//2.
		var select = document.getElementById('intgridientId');
		select.options[0].selected = true;
    break;
	
	case 'cocktailsIngredient':
	
		//1.
		document.getElementById('searchText').value = '';
	
		//3.
		var radList = document.getElementsByName("cocktailType");
		for (var i = 0; i < radList.length; i++) {
			if(radList[i].checked) document.getElementById(radList[i].id).checked = false;
		}
    break;
	
	case 'CocktailsFirstLetter':
		
		//1.
		document.getElementById('searchText').value = '';
	
		//2.
		var radList = document.getElementsByName("cocktailType");
		for (var i = 0; i < radList.length; i++) {
			if(radList[i].checked) document.getElementById(radList[i].id).checked = false;
		}
	 
		//3.
		var select = document.getElementById('intgridientId');
		select.options[0].selected = true;
}
	
} 

//Function  to retain the  previously selected filter and data when the page reloads 
function loadPreviousFilter(){
	
	//gets the previous Filter info from sessionStorage
	var previousFilter = sessionStorage.getItem("selectedFilter");
	var re = previousFilter.split("-");
		
		
		var filterType = re[0]; //Type of filter ex: searchTextbox / intgredients
		var filterValue = re[1]; //selected value eg. Rum
		
		switch (filterType) {
			case 'searchText': 
					//calls the corresponding function 
					document.getElementById('searchText').value = filterValue;
					loadCocktails();
	 
		break;
	
	case 'cocktailType': 
				//checks the filterValue to select the corresponding Radiobutton and to call the corresponding function
				if(filterValue =='Random Cocktails'){
					loadCocktailType('c','Cocktail');
					document.getElementById('randomCocktailtype').checked = true;
					
				}else if(filterValue =='Ordinary Drinks'){
					loadCocktailType('c','Ordinary_Drink');
					document.getElementById('ordinaryCocktailtype').checked = true;
					
				}else if(filterValue =='Alcoholic Cocktails'){
					loadCocktailType('a','Alcoholic');
					document.getElementById('alcoholicCocktailtype').checked = true;
					
				}else if(filterValue =='Nonalcoholic Cocktails'){
					loadCocktailType('a','Non_Alcoholic');
					document.getElementById('nonalcoholicCocktailtype').checked = true;
				}
		
    break;
	
	case 'ingredient':
	document.getElementById('intgridientId').value = filterValue;
		loadCocktailsWithIngredient();
		
    break;
	
	case 'firstLetter':
		//charAt is used to get the last character of the filterValue ex: filterValue = cocktail with a
		var letter = filterValue.charAt(filterValue.length - 1);
		loadCocktailsFirstLetter(letter);
		
		
		
		
		
}
}






// Fuction to list Cocktails based on the search text on the textbox
function loadCocktails(){

	
	var searchText = document.getElementById('searchText').value;
	//seachword is set  to the global variable 
	selectedFilter = searchText;
	//filter info is stored to sessionStorage to access the info when page reloads
	sessionStorage.setItem("selectedFilter", 'searchText-' +searchText);
	
	
	if(searchText != ''){
		//clear the previous filter by calling the function
		clearFilter('searchText');
		//Api url with search text
		var url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + searchText;
		console.log(url);
		
		ajaxAnfrage = new XMLHttpRequest();
		ajaxAnfrage.open('GET', url, true);
		ajaxAnfrage.onreadystatechange = getCocktails;
		ajaxAnfrage.send(); 
	}
	else{
		//if search textbox is empty
		alert('Please enter a cocktail name');
	}
	
}




//function calls on cocktailtype radiobutton change
function loadCocktailType(letter,type){
	//clears the previous filter by calling the function
	clearFilter('cocktailType');
	
	//get all radiobuttons with the same name loops through radiobuttonlists to fetch the value of checked radio button
	var radList = document.getElementsByName("cocktailType");
	for (var i = 0; i < radList.length; i++) {
        if(radList[i].checked) {
			//value of checked radiobutton is set  to the global variable 
			//selectedFilter = document.getElementById(radList[i].id).value;
			//filter info is stored to sessionStorage to access the info when page reloads
			sessionStorage.setItem("selectedFilter",'cocktailType-'+ document.getElementById(radList[i].id).value);
		}
     }
	
	
	//Api url with cocktailtype
	var url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?' + letter + '=' + type;
	console.log(url);
	
	ajaxAnfrage = new XMLHttpRequest();
	ajaxAnfrage.open('GET', url, true);
	ajaxAnfrage.onreadystatechange = getCocktails;
	ajaxAnfrage.send(); 
}

//function on intgredient selectchange
function loadCocktailsWithIngredient(){
	//calls the function to clear previous filter
	clearFilter('cocktailsIngredient');
	
	// get the search word from input text
	var searchText = document.getElementById('intgridientId').value;
	
	//sets the searchText to global variable and to sessionStorage
	selectedFilter = searchText;
	sessionStorage.setItem("selectedFilter", 'ingredient-'+ searchText);
	//Api url with intgredient name
	var url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + searchText;
	ajaxAnfrage = new XMLHttpRequest();
	ajaxAnfrage.open('GET', url, true);
	ajaxAnfrage.onreadystatechange = getCocktails;
	ajaxAnfrage.send(); 
}

//on intgredient selectchange
function loadCocktailsFirstLetter(letter){
	
	//1. calls the function to clear previous filter
	//2. sets global variable with filter type
	//3. sets url with filter type 
	//4. mention the name of the fuction to be called when the response is recieved
	//5. sends request using Ajax
	
	clearFilter('CocktailsFirstLetter');
	selectedFilter = 'Cocktails with ' + letter;
	var p = 'Cocktails with ' + letter;
	sessionStorage.setItem("selectedFilter",'firstLetter-' + p);
	
	var url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=' + letter;
	console.log(url);
	// 1. Anfrage Objekt vorbereiten
	ajaxAnfrage = new XMLHttpRequest();
	
	// 2. Methode, Ziel und Asynchronität festlagen
	ajaxAnfrage.open('GET', url, true);
	
	// 2.a) Methode zum Verarbeiten angeben
	ajaxAnfrage.onreadystatechange = getCocktails;
	
	// 3. Ajax Anfrage stellen
	ajaxAnfrage.send(); 
}

function getCocktails() {
	//ausgabe.innerHTML = '';
	// Prüfen, ob die Kommunikation zu Ende ist
	if(ajaxAnfrage.readyState == 4) {
		
		//Prüfen, ob Antwort erfolgreich war
		if(ajaxAnfrage.status == 200 || ajaxAnfrage.status == 0) {
			
			var ajaxAntwort = ajaxAnfrage.responseText;
			
			var antwortObjekt = JSON.parse(ajaxAntwort);
			
			var ausgabe = document.getElementById('ausgabe');
			ausgabe.innerHTML = '';
			//1.create row and column for heading 
			var headerRow = document.createElement('div');
			headerRow.classList.add("row");
			var headerColumn = document.createElement('div');
			headerRow.classList.add("col-sm-12");
			//2.header receives value from global variable 'selectedFilter'
			var cocktailHeader = document.createElement('h2');
			
			//gets filter info from sessionStorage
			var previousFilter = sessionStorage.getItem("selectedFilter");
			var re = previousFilter.split("-");
			var filterType = re[0]; //Type of filter ex: searchTextbox / intgredients
			var filterValue = re[1]; //selected value eg. Rum
			
			
			cocktailHeader.innerHTML = filterValue;
			//cocktailHeader.innerHTML =  sessionStorage.getItem("selectedFilter");
			console.log(sessionStorage.getItem("selectedFilter"));
			headerColumn.appendChild(cocktailHeader);
			headerRow.appendChild(headerColumn); 
			ausgabe.appendChild(headerRow);	//repeat
			
			//3.create rows and columns for List of cocktails
			var cocktailRow = document.createElement('div');
			cocktailRow.classList.add("row");
			//if there is a list of cocktails in the result
			if (antwortObjekt.drinks != null){
				for( var i = 0; i < antwortObjekt.drinks.length; i++){
					var cocktailList = antwortObjekt.drinks[i];
					var cocktailColumn = document.createElement('div');
					cocktailColumn.classList.add("col-sm-3");
	
					//4.create a,figure,image and figcaption tags to list cocktails in each column	
					var atag = document.createElement('a');
					atag.href = 'inhalt.html?key=' + cocktailList.idDrink;
					var figuretag = document.createElement('figure');	
					var figurecaptiontag = document.createElement('figcaption');
					figurecaptiontag.innerHTML = cocktailList.strDrink;
					var imgtag = document.createElement('img');
					imgtag.src = cocktailList.strDrinkThumb;
					imgtag.width = '200';
					
					//5.append these tags to columns and columns to row
					atag.appendChild(figuretag);
					figuretag.appendChild(imgtag);
					figuretag.appendChild(figurecaptiontag);
					cocktailColumn.appendChild(atag);
					cocktailRow.appendChild(cocktailColumn); 	
					
					
						
			}
			//6.append rows to Ausgabe					
					ausgabe.appendChild(cocktailRow);
			}
			else{ //when no drinks in list or list is null
				
			//1.create row and column for heading 
			var headerRow1 = document.createElement('div');
			headerRow1.classList.add("row");
			var headerColumn1 = document.createElement('div');
			headerRow1.classList.add("col-sm-12");
			//2.header receives value from global variable 'selectedFilter'
			var cocktailHeader1 = document.createElement('h4');
			cocktailHeader1.innerHTML = "No drinks found";
			headerColumn1.appendChild(cocktailHeader1);
			headerRow1.appendChild(headerColumn1); 
			ausgabe.appendChild(headerRow1);	
			}
		
			
		}
	}
}