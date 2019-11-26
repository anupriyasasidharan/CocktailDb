


$( document ).ready(function() {
		//gets the selected cocktail id from the query string
		var queries = {};
		var cocktailId; 
		$.each(document.location.search.substr(1).split('&'),function(c,q){
		var i = q.split('=');
		queries[i[0].toString()] = i[1].toString();
		cocktailId = i[1].toString();
  });
  //console.log(queries);
  //  console.log(cocktailId);
	
	//passes the cocktailid to the Api and recieves the response
	$.ajax('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + cocktailId, {
		
		success: function(antwortObjekt) {
			
			var result = antwortObjekt.drinks[0];
			
			//Cocktail name as header - creates row and column to display the Cocktail name
			var inhaltheaderrow = $('<div>');
			inhaltheaderrow.addClass("row");
			var inhaltheadercolumn = $('<div>');
			inhaltheadercolumn.addClass("col-sm-12");
			var cocktailheader = $('<h2>');
			cocktailheader.html(antwortObjekt.drinks[0].strDrink);
			inhaltheadercolumn.append(cocktailheader);
			
			//leftside Div with Image - row and column to display the image of the cocktail
			var inhaltrow = $('<div>');
			inhaltrow.addClass("row");		
			var inhaltcolumnleft =$('<div>');
			inhaltcolumnleft.addClass("col-sm-6");	
			var imgtag = $('<img>');
			imgtag.attr("src",result.strDrinkThumb);
			imgtag.attr("width","400");
			inhaltcolumnleft.append(imgtag);					
			
			//---right side Div----
			
			//Intgredient Heading 
			var inhaltcolumnright = $('<div>');
			inhaltcolumnright.addClass("col-sm-6");
			var intgredientheader = $('<h4>');
			intgredientheader.addClass("inhalth4");
			intgredientheader.html("Intgredients");
			inhaltcolumnright.append(intgredientheader);	

			//Intgredientslist
			
			
			
			
			//1.	creates raws and columns for intgredients
			var irow = $('<div>');
			irow.addClass("row");		
			var icolumn = $('<div>');
			icolumn.addClass("col-sm-12");

			//2.	create arrays to hold intgredientlist and measurementlist
			//3.	loop through the antwortObjekt to get all the notNull values whose keys has the  'strIngredient' or  'strMeasure'.
			//4.	push all the notNull values to corresponding arrays
			var intgarray = [];
			var measurearray = [];
			var intgredientObject = antwortObjekt.drinks[0];
			for (const [key, value] of Object.entries(intgredientObject)) {
				if(value != null){
					var str = key;
					var n = str.includes("strIngredient");
					var m = str.includes("strMeasure");
				if(n == true){	
						intgarray.push(value); 					  
						} 
			    if(m == true){
					measurearray.push(value);
						}
						console.log(key, value);
			}
  
			}
			
			//5.	Display the intgredients by looping through the arrays by createing <p> tags
			//6.	Display the measurements along with intgredients. Check if there is no measurements,if so display only intgredient name. 
			for(var i = 0; i < intgarray.length; i++){
				var intgredient = $('<p>');
				intgredient.addClass("inhapltp");
				if (typeof measurearray[i] != 'undefined'){
					intgredient.html(intgarray[i] + ' ' + measurearray[i]);
				}else{
					intgredient.html(intgarray[i]);
				}
						
					icolumn.append(intgredient);
			}
			//instruction - rows and columns - heading and instruction 
			var instructionheading = $('<h4>');
			instructionheading.html("Instruction");
			instructionheading.addClass("inhalth4");
			icolumn.append(instructionheading);				
			var instruction = $('<p>');
			instruction.addClass("inhapltp");
			instruction.html(result.strInstructionsDE);
			icolumn.append(instruction);


	        //glass	- rows and columns - heading and instruction 
			var glassheading = $('<h4>');
			glassheading.html("Glass");
			glassheading.addClass("inhalth4");
			icolumn.append(glassheading);				
			var glass = $('<p>');
			glass.addClass("inhapltp");
			glass.html(result.strGlass);
			icolumn.append(glass);				
			
			
			irow.append(icolumn);
			inhaltcolumnright.append(irow);
			
			inhaltrow.append(inhaltcolumnleft); 
			inhaltrow.append(inhaltcolumnright); 				
			inhaltheaderrow.append(inhaltheadercolumn);
	
			$('#content').append(inhaltheaderrow);
			$('#content').append(inhaltrow);
		
		},
		error: function() {
			console.log('error');
		}
	});	
});