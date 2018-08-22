"use strict";

/*MERCH STORE JAVASCRIPT*/

window.addEventListener("load", function() {
   var orderForm = document.forms.orderForm;
   orderForm.elements.orderDate.value = new Date().toDateString();
   orderForm.elements.model.focus();
   
   //calculate the cost of the order
   calcOrder();
   
   //event handlers for the web form
   orderForm.elements.model.onchange = calcOrder;
   orderForm.elements.qty.onchange = calcOrder;
   
   var planOptions = document.querySelectorAll('input[name="protection"]');
   for (var i = 0; i < planOptions.length; i++) {
      planOptions[i].onclick = calcOrder;
   }

});

function calcOrder() {
   var orderForm = document.forms.orderForm;
   
   //calculate the initial cost of the order
   var mIndex = orderForm.elements.model.selectedIndex;
   var mCost = orderForm.elements.model.options[mIndex].value;
   var qIndex = orderForm.elements.qty.selectedIndex;
   var quantity = orderForm.elements.qty[qIndex].value;
   
   //initial cost = model cost x quantity
   var initialCost = mCost*quantity;
   orderForm.elements.initialCost.value = formatUSCurrency(initialCost);
   
   //retrieve the cost of the users size (if applicable)
   var pCost = document.querySelector('input[name="protection"]:checked').value*quantity;
   orderForm.elements.protectionCost.value = formatNumber(pCost, 2);
   
   //calculate the order subtotal
   var subTotal = orderForm.elements.subtotal.value = formatNumber(initialCost + pCost, 2);
   
   //calculate the sales tax
   var salesTax = .05 * (initialCost + pCost);
   orderForm.elements.salesTax.value = formatNumber(salesTax, 2);
   
   //calculate the cost of the total order
   var totalCost = initialCost + pCost + salesTax;
   orderForm.elements.totalCost.value = formatUSCurrency(totalCost);

   //store the order details
   orderForm.elements.modelName.value = 
     orderForm.elements.model.options[mIndex].text;
   orderForm.elements.protectionName.value =
     document.querySelector('input[name="protection"]:checked').nextSibling.nodeValue;
   
}

function formatNumber(val, decimals) {
   return val.toLocaleString(undefined, 
   {minimumFractionDigits: decimals,
   maximumFractionDigits: decimals});
}

function formatUSCurrency(val) {
   return val.toLocaleString('en-US',
   {style: "currency", currency: "USD"} );
}
