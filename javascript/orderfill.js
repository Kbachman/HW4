//orderfill.js

$(function(){
	renderPizza();
	renderDrinks();
	renderDesserts();

    $("#sticker").sticky({ topSpacing: 50 });

  //create a cart model as a simple object with
    //the properties we eventually need to post to
    //the server
    var cart = {
        name: null,
        address1: null,
        zip: null,
        phone: null,
        items: [] //empty array
    }; //cart data

    //click event handler for all buttons with the
    //style class 'add-to-cart'
    $('.add-to-cart').click(function(){
        //use the attributes on the button to construct
        //a new cart item object that we can add to the
        //cart's items array
		if (this.getAttribute('data-type') === "Pizza") {
                var newCartItem = {
                    type: this.getAttribute('data-type'),
                    name: this.getAttribute('data-name'),
                    size: this.getAttribute('data-size'),
                    price: this.getAttribute('data-price'),
                    quantity: 1
                };
            var index = pizzaFind(cart.items, newCartItem.name, newCartItem.size);
        } else {
                var newCartItem = {
                type: this.getAttribute('data-type'),
                name: this.getAttribute('data-name'),
                price: this.getAttribute('data-price'),
                quantity: 1
            };
            var index = find(cart.items, newCartItem.name);
        }

        if(index === -1) 
                cart.items.push(newCartItem);
        else 
                cart.items[index].quantity += 1;

        //render the cart's contents to the element
        //we're using to contain the cart information
        //note that you would need a <div> or some
        //other grouping element on the page that has a
        //style class of 'cart-container'
        renderCart(cart, $('.cart-container'));

        console.log(cart.items);

    });

	$(document).on('click', '.remove-item', function() {
		var idxToRemove = this.getAttribute("data-index");
		cart.items.splice(idxToRemove, 1);
		renderCart(cart, $('.cart-container'));	    
	});


    $('.place-order').click(function(){
    	var totalPrice = $('.total-price').html(); 
    	console.log(totalPrice);
	  	if( totalPrice < 20 && totalPrice) {
	  		alert('Minimum $20 for delivery!');
	  		return false;
	  	}
	  	if(!totalPrice) {
	  		alert('Your cart is empty!');
	  		return false;
	  	}
	  	cart.name = $('#first-name').val();
	  	if(cart.name.length === 0) {
	  		alert('You must enter a first and last name for delivery!');
	  		return false;
	  	}
	  	cart.phone = $('#phone-number').val();
	  	if(cart.phone.length === 0) {
	  		alert('You must enter a phone number for delivery!');
	  		return false;
	  	}
	  	cart.address1 = $('#addr-1').val();
	  	if(cart.address1.length === 0) {
	  		alert('You must enter your address for delivery!');
	  		return false;
	  	}
	  	cart.zip = $('#zip').val();
	  	if(cart.zip.length === 0 ) {
	  		alert('You must enter a valid zipcode for delivery!')
	  		return false;
	  	}
        
        //TODO: validate the cart to make sure all the required
        //properties have been filled out, and that the 
        //total order is greater than $20 (see homework 
        //instructions) 
        postCart(cart, $('.cart-form'));
    });  

    $('.start-over').click(function(){
    	cart.items = [];
    	renderCart(cart, $('.cart-container'));
    });

});

function find(cart, newName) {
    for (var i = 0; i < cart.length; i++)
            if (cart[i].name === newName) return i;
    return -1;
}
function pizzaFind(cart, newName, newSize) {
        for (var i = 0; i < cart.length; i++)
                if (cart[i].name === newName) {
                        if(cart[i].size === newSize) return i;
                }
                return -1;
}
 
// renderCart()
// renders the current cart information to the screen
// parameters are:
//  - cart (object) reference to the cart model
//  - container (jQuery object) reference to the container <div>
//
function renderCart(cart, container) {
    var idx, item;
    var instance;
    var template = $('.cart-item-template').clone();
    var totalPrice;
    container.empty();
    var subTotal = 0;

    for (idx = 0; idx < cart.items.length; ++idx) {
        item = cart.items[idx];
        instance = template.clone();
        var itemSubTotal = item.price * item.quantity;
        instance.find('.name').html("[" + item.quantity + "] : "+ item.name);
        instance.find('.price').html(itemSubTotal);
        if(item.size) {
        	instance.find('.size').html("("+item.size+")");
        }
		instance.find('.remove-item').attr({
			'data-index': idx
		});

        instance.removeClass('cart-item-template');
        subTotal += itemSubTotal;
        container.append(instance);
    } 
    $('.total-price').html(subTotal);
    var tax = subTotal * 0.095;
    $('.tax-price').html(tax.toFixed(2));
    $('.grand-total-price').html((subTotal + tax).toFixed(2));

} //renderCart()




// postCart()
// posts the cart model to the server using
// the supplied HTML form
// parameters are:
//  - cart (object) reference to the cart model
//  - cartForm (jQuery object) reference to the HTML form
//
function postCart(cart, cartForm) {
    //find the input in the form that has the name of 'cart'    
    //and set it's value to a JSON representation of the cart model
    cartForm.find('input[name="cart"]').val(JSON.stringify(cart));

    //submit the form--this will navigate to an order confirmation page
    cartForm.submit();

} //postCart()




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
		instance.find('.small-pizza').html("Small - $" + pizza.prices[0]);
		instance.find('.medium-pizza').html("Medium - $" + pizza.prices[1]);
		instance.find('.large-pizza').html("Large - $" + pizza.prices[2]);

		instance.find('.small-pizza').attr({
			'data-name': pizza.name,
			'data-price': pizza.prices[0],
			'data-type': "Pizza",
			'data-size': "Small"
		});
		instance.find('.medium-pizza').attr({
			'data-name': pizza.name,
			'data-price': pizza.prices[1],
			'data-type': "Pizza",
			'data-size': "Medium"
		});
		instance.find('.large-pizza').attr({
			'data-name': pizza.name,
			'data-price': pizza.prices[2],
			'data-type': "Pizza",
			'data-size': "Large"
		});

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

		instance.find('.drink-price').attr({
			'data-name': drink.name,
			'data-price': drink.price
		});


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

		instance.find('.dessert-price').attr({
			'data-name': dessert.name,
			'data-price': dessert.price
		});


		instance.removeClass('template');
		$('.desserts-menu').append(instance);

	}
}