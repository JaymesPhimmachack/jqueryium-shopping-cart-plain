var updateItemTotal = function(el) {
  var price = parseInt($(el).find('.price').text().slice(1), 10);
  var quantity = parseInt($(el).find('.quantity input').val(), 10);

  if (!isNaN(quantity)) {

    var itemTotal = quantity * price;

    $(el).find('.item-total-price').text('$' + quantity * price + '.00');

    return itemTotal;

  } else {

    $(el).find('.item-total-price').text('$--.--');

    return 0;
  }

};

var sum = function(acc, cur) {
  return acc + cur;
};

var updateTotalPrice = function() {
  var itemPrices = [];

  $('table tbody tr').each(function(i, el) {

    var itemPrice = updateItemTotal(el);
    itemPrices.push(itemPrice);
  });

  var totalPrice = itemPrices.reduce(sum);

  $('#overall-total').text(totalPrice + '.00');
};

$(document).ready(function() {

  $(document).on('click', '#btn-remove', function() {
    $(this).closest('tr').remove();
    updateTotalPrice();
  });

  $(document).on('input', 'tr input', function() {
    console.log('hi')
    updateTotalPrice();

  });

  $('#add-item').on('submit', function(event) {
    event.preventDefault();

    var name = $(this).children('[name=item]').val();
    var price = $(this).children('[name=price]').val();

    $('tbody').append('<tr>' +
      '<td class="item">' + name.slice(0, 1).toUpperCase() + name.slice(1) + '</td>' +
      '<td class="price">$' + price + '.00</td>' +
      '<td class="quantity reduce-width">QTY <input type="text"></td>' +
      '<td class="reduce-width"><button class="btn btn-dark" id="btn-remove">Remove</button></td>' +
      '<td class="item-total-price">$--.--</td>' +
      '<tr>')

    $(this).children('[name=item]').val('');
    $(this).children('[name=price]').val('');

  });

});
