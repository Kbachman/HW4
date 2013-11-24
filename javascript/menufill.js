//menufill.js

$(function(){
	renderPizza();
	renderDrinks();
	renderDesserts();
	


	/*var drink;
	for(idx = 0; idx < com.dawgpizza.menu.drinks.length; ++idx) {
		drink = com.dawgpizza.menu.drinks[idx];
		instance = $('.drink-template').clone();
		instance.find('.drink-name').html(drink.name);
		instance.find('.drink-prices').html(drink.price);
		instance.removeClass('template');
		$('.drinks-menu').append(instance);
	}*/



		


});


function renderPizza() {
	var idx;
	var pizza;
	var instance;
	var template = $('.pizza-template').clone();
	for(idx = 0; idx < com.dawgpizza.menu.pizzas.length; ++idx) {
		pizza = com.dawgpizza.menu.pizzas[idx];
		instance = template.clone();
		instance.find('.pizza-name').html(pizza.name);
		instance.find('.pizza-description').html(pizza.description);
		instance.find('.pizza-prices').html("$" + pizza.prices[0] + "/ " + "$" + pizza.prices[1] + "/ " + "$" + pizza.prices[2]);

		instance.removeClass('template');
		if(pizza.vegetarian == true) {
			$('.vege-pizzas').append(instance);
		} else {
			$('.meat-pizzas').append(instance);
		}

	}	
}

function renderDrinks() {
	var idx;
	var drink;
	var instance;
	var template = $('.drink-template').clone();
	var container = $('.drinks-menu');
	for(idx = 0; idx < com.dawgpizza.menu.drinks.length; ++idx) {
		drink = com.dawgpizza.menu.drinks[idx];
		instance = template.clone();
		instance.find('.drink-name').html(drink.name);
		instance.find('.drink-price').html(drink.price);
		instance.removeClass('template');
		container.append(instance);
	}
}

function renderDesserts() {
	var idx;
	var dessert;
	var instance;
	var template = $('.dessert-template').clone();
	for(idx = 0; idx < com.dawgpizza.menu.desserts.length; ++idx) {
		dessert = com.dawgpizza.menu.desserts[idx];
		instance = template.clone();
		instance.find('.dessert-name').html(dessert.name);
		instance.find('.dessert-price').html(dessert.price);
		instance.removeClass('template');
		$('.desserts-menu').append(instance);

	}
}