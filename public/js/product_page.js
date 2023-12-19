import { albums } from './query.js';
import { getCardPageHTML, getUrlVars } from './product_card_function.js';

let productID = (getUrlVars()).id;
let product = albums.find(album => album.id == productID);

if (!product) {
    window.location = '404.html';
}


$('main').html(getCardPageHTML(product));

$('.product_buy').on('click', function (e) {
    e.preventDefault();
    let productID = $(this).closest('.product').data('productId');
    let currentBasket = JSON.parse(localStorage.getItem('basketProducts'));
    
    $(this).toggleClass('basket_card');
    $(this).parent().find('.product_count').toggleClass('no-show');

    if ($(this).hasClass('basket_card')) {
        currentBasket.push({
            "productID": productID,
            "count": 1,
        });

        $(this).html('В КОРЗИНЕ');
    } else {
        currentBasket = currentBasket.filter(product => product.productID != productID);

        $(this).parent().find('.product_count').find('.number').html('1');
        $(this).html('КУПИТЬ');
    }

    localStorage.setItem(`basketProducts`, JSON.stringify(currentBasket));
});

$('.plus').on('click', function (e) {
    e.preventDefault();
    let productID = $(this).closest('.product').data('productId');
    let currentBasket = JSON.parse(localStorage.getItem('basketProducts'));
    let currentPorudctInBasket = currentBasket.find(product => product.productID == productID);
    currentPorudctInBasket.count++;
    localStorage.setItem(`basketProducts`, JSON.stringify(currentBasket));

    $(this).parent().find('.number').html(currentPorudctInBasket.count);
});

$('.minus').on('click', function (e) {
    e.preventDefault();
    let productID = $(this).closest('.product').data('productId');
    let currentBasket = JSON.parse(localStorage.getItem('basketProducts'));
    let currentPorudctInBasket = currentBasket.find(product => product.productID == productID);

    if (currentPorudctInBasket.count == 1) {
        currentBasket = currentBasket.filter(product => product.productID != productID);

        $(this).parent().toggleClass('no-show');
        $(this).parent().parent().find('.product_buy').html('КУПИТЬ').toggleClass('basket_card');
        $(this).parent().find('.number').html('1');
    } else {
        currentPorudctInBasket.count--;

        $(this).parent().find('.number').html(currentPorudctInBasket.count);
    }

    localStorage.setItem(`basketProducts`, JSON.stringify(currentBasket));

});