import { lastSalesProduct } from './last_sales.js';
import { getCardListHTML } from './product_card_function.js';
import { albums } from './query.js';
import { albumsCounter } from './bestseller.js';

$('.main_screen').css('height', `${$(window).height() - $('header').outerHeight(true)}px`);

$(window).on('resize', function () {
    $('.main_screen').css('height', `${$(window).height() - $('header').outerHeight(true)}px`);
});

let data = [];
let data2 = [];

lastSalesProduct.forEach(product => {
    data.push(albums.find(album => album.id == product));
});

albumsCounter.forEach(product => {
    data2.push(albums.find(album => album.id == product[0]));
});

$('[data-index-last-sales]').append(getCardListHTML(data));
$('[data-index-beset-seller]').append(getCardListHTML(data2));

$('.card_button').on('click', function (e) {
    e.preventDefault();
    let productID = $(this).closest('.card').data('productId');
    let currentBasket = JSON.parse(localStorage.getItem('basketProducts')); 

    $(this).toggleClass('basket_card');
    $(this).parent().find('.quantity_operation').toggleClass('no-show');

    if ($(this).hasClass('basket_card')) {
        currentBasket.push({
            "productID": productID,
            "count": 1,
        });
        
        $(this).html('В КОРЗИНЕ');
    } else {
        currentBasket = currentBasket.filter(product => product.productID != productID);

        $(this).parent().find('.quantity_operation').find('.number').html('1');
        $(this).html('КУПИТЬ');
    }

    localStorage.setItem(`basketProducts`, JSON.stringify(currentBasket));
});

$('.plus').on('click', function (e) {
    e.preventDefault();

    let productID = $(this).closest('.card').data('productId');
    let currentBasket = JSON.parse(localStorage.getItem('basketProducts'));
    let currentPorudctInBasket = currentBasket.find(product => product.productID == productID);
    currentPorudctInBasket.count++;
    localStorage.setItem(`basketProducts`, JSON.stringify(currentBasket));
    
    $(this).parent().find('.number').html(currentPorudctInBasket.count);
});

$('.minus').on('click', function (e) {
    e.preventDefault();
    let productID = $(this).closest('.card').data('productId');
    let currentBasket = JSON.parse(localStorage.getItem('basketProducts'));
    let currentPorudctInBasket = currentBasket.find(product => product.productID == productID);

    if (currentPorudctInBasket.count == 1) {
        currentBasket = currentBasket.filter(product => product.productID != productID);
        
        $(this).parent().toggleClass('no-show');
        $(this).parent().parent().find('.card_button').html('КУПИТЬ').toggleClass('basket_card');
        $(this).parent().find('.number').html('1');
    } else {
        currentPorudctInBasket.count--;
        $(this).parent().find('.number').html(currentPorudctInBasket.count);
    }

    localStorage.setItem(`basketProducts`, JSON.stringify(currentBasket));
});

$('.main_screen').css('height', `${$(window).height() - $('header').outerHeight(true)}px`);
$('.card_img').css('height', `${$('.card').width()}px`);
