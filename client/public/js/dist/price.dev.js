"use strict";

$('.checkbox').on("change", function () {
  // var checkticked = [];//array for checkboxes
  var price = 0;
  $('.checkbox').each(function () {
    // checkticked.push($(this).attr('data-link'));//get checkboxes
    if ($(this).is(':checked')) {
      price = price + parseInt($(this).attr('data-price'));
    } //sum of all price values of this into price


    $('.price').html(price);
  });
});