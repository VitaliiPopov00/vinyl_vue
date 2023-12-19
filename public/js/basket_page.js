import { getBasketCard } from './product_card_function.js';
import { albums } from './query.js';

function setHTML() {
    let basket = JSON.parse(localStorage.getItem('basketProducts'));
    let products = [];
    let allPriceBasket = 0;
    let HTML = "";

    basket.forEach(product => {
        albums.forEach(album => {
            if (product.productID == album.id) {
                products.push(album);
                allPriceBasket += Number(album.price) * Number(product.count);
            }
        })
    });
    
    if (products.length) {
        products.forEach(product => {
            HTML += getBasketCard(product);
        });

        $('.basket_is_empty').addClass('no-show');
        $('.basket_is_not_empty').removeClass('no-show');
    } else {
        $('.basket_info').hide();
        $('.basket_is_not_empty').addClass('no-show');
        $('.basket_is_empty').removeClass('no-show');
    }
    
    $('.basket_product_list').html(HTML);
    $('.basket_all_price').html(allPriceBasket.toLocaleString('ru-RU') + ' ₽')
}

setHTML();

$('.basket_product_list').on('click', '.plus', function (e) {
    e.preventDefault();

    let productID = $(this).closest('.basket_product').data('productId');
    let currentBasket = JSON.parse(localStorage.getItem('basketProducts'));
    let currentPorudctInBasket = currentBasket.find(product => product.productID == productID);
    currentPorudctInBasket.count++;

    localStorage.setItem(`basketProducts`, JSON.stringify(currentBasket));
    
    setHTML();
});

$('.basket_product_list').on('click', '.minus', function (e) {
    e.preventDefault();
    let productID = $(this).closest('.basket_product').data('productId');
    let currentBasket = JSON.parse(localStorage.getItem('basketProducts'));
    let currentPorudctInBasket = currentBasket.find(product => product.productID == productID);

    if (currentPorudctInBasket.count == 1) {
        currentBasket = currentBasket.filter(product => product.productID != productID);
    } else {
        currentPorudctInBasket.count--;
        $(this).parent().find('.number').html(currentPorudctInBasket.count);
    }

    localStorage.setItem(`basketProducts`, JSON.stringify(currentBasket));
    setHTML();
});

$('.basket_button').on('click', function (e) {
    e.preventDefault();
});



