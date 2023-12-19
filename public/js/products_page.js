import { artists, genres, albums } from './query.js';
import { getCardListHTML, getGenreListHTML, getUrlVars, getArtistListHTML } from './product_card_function.js';

$('.products_filter_item_list.artist-list').html(getArtistListHTML(artists));
$('.products_filter_item_list.genre-list').html(getGenreListHTML(genres));

let attrs = getUrlVars();
let resultSearch = [];
let isFilterExists = false;

if (attrs) {
    if (attrs['artistId']) {
        if (!resultSearch.length && !isFilterExists) {
            isFilterExists = true;
            resultSearch = [...albums.filter(album => album.artist_id == attrs['artistId'])];
        } else {
            resultSearch = resultSearch.filter(album => album.artist_id == attrs['artistId']);
        }
        $('p[data-artist-id=""]').data('artistId', attrs['artistId']).text($(`p[data-artist-id=${attrs['artistId']}]`).text());
    }

    if (attrs['genreId']) {
        if (!resultSearch.length && !isFilterExists) {
            isFilterExists = true;
            resultSearch = [...albums.filter(album => album.genres.indexOf(Number(attrs['genreId'])) !== -1)];
        } else {
            resultSearch = resultSearch.filter(album => album.genres.indexOf(Number(attrs['genreId'])) !== -1);
        }
        $('p[data-genre-id=""]').data('genreId', attrs['genreId']).text($(`p[data-genre-id=${attrs['genreId']}]`).text());
    }

    if (attrs['start_price']) {
        if (!resultSearch.length && !isFilterExists) {
            isFilterExists = true;
            resultSearch = [...albums.filter(album => album.price > (Number(attrs['start_price']) - 1))];
        } else {
            resultSearch = resultSearch.filter(album => album.price > (Number(attrs['start_price']) - 1));
        }
        $('input[data-start-price]').val(attrs['start_price']);
    }

    if (attrs['end_price']) {
        if (!resultSearch.length && !isFilterExists) {
            isFilterExists = true;
            resultSearch = [...albums.filter(album => album.price < (Number(attrs['end_price']) + 1))];
        } else {
            resultSearch = resultSearch.filter(album => album.price < (Number(attrs['end_price']) + 1));
        }
        $('input[data-end-price]').val(attrs['end_price']);
    }

    if (attrs['title']) {
        if (!resultSearch.length && !isFilterExists) {
            isFilterExists = true;
            resultSearch = [...albums.filter(album => album.title.toLowerCase().includes((attrs['title']).toLowerCase()))];
        } else {
            resultSearch = resultSearch.filter(album => album.title.toLowerCase().includes((attrs['title']).toLowerCase()));
        }
        $('input[data-title]').val(attrs['title']);
    }

    if (!resultSearch.length) {
        $('.filter_result').addClass('no-show');
        $('.filter_result.not-found').removeClass('no-show');
        $('.card_list').addClass('no-show');
    }
}

if (resultSearch.length) {
    $('.products_page').append(getCardListHTML(resultSearch));
} else if (!attrs) {
    $('.products_page').append(getCardListHTML(albums));
}

$('.products_filter_item_list').on('click', 'p', function (e) {
    let value = $(this).text().trim();
    let dataAttributeName = $(this).data('genreId') ? 'genreId' : 'artistId';
    let dataAttributeValue = $(this).data(dataAttributeName);

    $(this).closest('.products_filter_item').find('.products_filter_item_button > p').html(value).data(dataAttributeName, dataAttributeValue);
});

$('.products_filter_item_list_input-price').on('input', function (e) {
    let value = Number($(this).val().replace(/[^0-9]/, ''));
    $(this).val(value.toLocaleString('ru-RU'));
});

$('.products_search').on('click', function (e) {
    e.preventDefault();
    let filters = $(this).closest('.products_filter').children('[data_filter_list]');
    let params = '';
    let url = window.location.href;
    let startPrice = Number($('.filter_price_start').val().replace(/\s/g, ''));
    let endPrice = Number($('.filter_price_end').val().replace(/\s/g, ''));
    let filterSearch = $('.products_filter_item_search_input').val().trim();
    startPrice = startPrice ? `start_price=${startPrice}&` : '';
    endPrice = endPrice ? `end_price=${endPrice}&` : '';
    filterSearch = filterSearch ? `title=${filterSearch}&` : '';

    params += startPrice + endPrice + filterSearch;

    if (url.indexOf('?') !== -1) {
        url = url.slice(0, url.indexOf('?'));
    }

    filters.each((index, el) => {
        let filter = Object.entries($(el).find('button > p').data())[0];
        if (filter[1]) {
            params += filter.join('=') + '&';
        }
    });

    if (params) {
        window.location.href = url + '?' + params.slice(0, -1);
    }

});

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