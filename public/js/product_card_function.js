import { albums, artists, genres, order_statuses } from './query.js';

export function getCardHTML(card) {
    let basket = JSON.parse(localStorage.getItem('basketProducts'));
    let currentProduct = basket.find(product => product.productID == card.id) || false;

    return `<li class="card" data-product-id="${card.id}">
                <div class="card_img">
                    <a href="product.html?id=${card.id}&"><img src="${card.logo}" alt="${card.title}"></a>
                </div>
                <div class="card_info">
                    <p class="card_title_album_name">
                        ${card.title.toUpperCase()}<br>
                        <span>${artists.find(artist => artist.id == card.artist_id).title.toLowerCase()}</span>
                    </p>
                    <p class="price">
                        ${(Number(card.price)).toLocaleString('ru-RU')}
                    </p>
                    <div class="card_operation">
                        <a href="#" class="card_button${currentProduct ? ' basket_card' : ''}">${currentProduct ? 'В КОРЗИНЕ' : 'КУПИТЬ'}</a>
                        <div class="quantity_operation${currentProduct ? '' : ' no-show'}">
                            <a href="#" class="minus">-</a>
                            <p class="number">${currentProduct ? currentProduct.count : '1'}</p>
                            <a href="#" class="plus">+</a>
                        </div>
                    </div>
                </div>
            </li>`;
}

export function getCardListHTML(cards) {
    let resultHTML = '<ul class="card_list">';
    
    cards.forEach(card => {
        resultHTML += getCardHTML(card);
    });

    resultHTML += '</ul>';

    return resultHTML;
}

export function getCardPageHTML(card) {
    let basket = JSON.parse(localStorage.getItem('basketProducts'));
    let currentProduct = basket.find(product => product.productID == card.id) || false;
    let result =  `<div class="product" data-product-id="${card.id}">
                        <div class="product_first">
                            <img src="${card.logo}" alt="${card.title}" class="product_img">
                        </div>
                        <div class="product_second">
                            <div class="product_info">
                                <p>АЛЬБОМ<br>
                                    <span>${card.title.toUpperCase()}</span>
                                </p>
                                <p>АРТИСТ / ГРУППА<br>
                                    <a class="link" href="products.html?artistId=${card.artist_id}">${artists.find(artist => artist.id == card.artist_id).title.toUpperCase()}</a>
                                </p>
                                <p>ГОД ВЫПУСКА АЛЬБОМА<br>
                                    <span>${card.year_release_album}</span>
                                </p>
                                <p>ГОД ВЫПУСКА ПЛАСТИНКИ<br>
                                    <span>${card.year_release_plate}</span>
                                </p>
                                <p>ЖАНР<br>`;
    
    card.genres.forEach((genre, index) => {
        result += `<a class="link" href="products.html?genreId=${genre}">${genres.find(genreItem => genreItem.id == genre).title.toUpperCase()}${index != card.genres.length - 1 ? ', ' : ''}</a>`;
    });
                                    
    result += `</p>
                <p>ЦЕНА<br>
                    <span>${(Number(card.price)).toLocaleString('ru-RU')} ₽</span>
                </p>
            </div>
            <div class="product_operation">
                <a href="#" class="product_buy${currentProduct ? ' basket_card' : ''}">${currentProduct ? 'В КОРЗИНЕ' : 'КУПИТЬ'}</a>
                <div class="product_count${currentProduct ? '' : ' no-show'}">
                    <a href="#" class="minus">-</a>
                    <a class="number">${currentProduct ? currentProduct.count : '1'}</a>
                    <a href="#" class="plus">+</a>
                </div>
            </div>
        </div>
    </div>`;

    return result;
}

export function getSearchItemHTML(item, isAlbum) {
    let result = `<a href="${isAlbum ? "product" : "products"}.html?${isAlbum ? "id" : "artistId"}=${item.id}" ${isAlbum ? "data-is-album" : "data-is-artist"}>
                    <li>`;
    
    if (isAlbum) {
        result += `<img src="/${item.logo}" alt="${item.title}">
                    <div>
                        <p style="color: #727272; font-size: 12px">${item.title.toUpperCase()}</p>
                        <p>${artists.find(artist => artist.id == item.artist_id).title.toUpperCase()}</p>
                    </div>`;
    } else {
        result += `<div>
                        <p style="color: #727272; font-size: 12px">АРТИСТ / ГРУППА</p>
                        <p>${item.title.toUpperCase()}</p>
                    </div>`
    }
                    
    result += `</li>
            </a>`;

    return result;
}

export function addErrorInput(errors) {
    errors.forEach(error => {
        $(`input[name=${error.attributeName}]`).addClass('error');
        $(`.${error.attributeName}_error`).text(error.message);
    });
}

export function getBasketCard(card) {
    let basket = JSON.parse(localStorage.getItem('basketProducts'));
    let currentProductInBasket = basket.find(product => product.productID == card.id);

    return `<div class="basket_product" data-product-id="${card.id}">
                <a href="product.html?id=${card.id}" class="basket_product_info">
                    <img src="${card.logo}" alt="${card.title}" class="basket_product_img">
                    <div class="basket_product_name">
                        <p>${card.title.toUpperCase()}</p>
                        <p>${artists.find(artist => artist.id == card.artist_id).title.toUpperCase()}</p>
                    </div>
                </a>
                <div class="basket_product_operation">
                    <p class="product_basket_price">${(Number(card.price)).toLocaleString('ru-RU')} ₽</p>
                    <div class="basket_product_operation_menu">
                        <a href="#" class="minus">-</a>
                        <a class="number">${basket.find(product => product.productID == card.id).count}</a>
                        <a href="#" class="plus">+</a>
                    </div>
                    <p class="basket_product_all_price">${(Number(currentProductInBasket.count) * Number(card.price)).toLocaleString('ru-RU')} ₽</p>
                </div>
            </div>`;
}

export function getUrlVars() {
    let vars = {};
    if (window.location.href.indexOf('?') != -1) {
        let hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

        for (let i = 0; i < hashes.length; i++) {
            let hash = hashes[i].split('=');
            let hashName = hash[0];
            vars[hashName] = hash[1];
        }

        return vars;
    } else {
        return false;
    }
}

export function getGenreListHTML(genreList) {
    let html = '';

    genreList.forEach(genre => {
        html += `<p data-genre-id="${genre.id}">
                    ${genre.title.toUpperCase()}
                </p>`;
    });

    return html;
}

export function getArtistListHTML(artistList) {
    let html = '';

    artistList.forEach(genre => {
        html += `<p data-artist-id="${genre.id}">
                    ${genre.title.toUpperCase()}
                </p>`;
    });

    return html;
}

export function getOrderCard(order) {
    let result =  `<li class="profile_orders_item" data-order-id=${order.id}>
                        <p class="orders_item_title">
                            # ${order.id}
                        </p>
                        <p class="orders_item_date">
                            ${order.date}
                        </p>
                        <p class="orders_item_title_order-list">
                            СОДЕРЖАНИЕ ЗАКАЗА
                        </p>
                        <ul class="profile_orders_item_order-list">`;

    order.order_list.forEach((product, index) => {
        let productItem = albums.find(album => album.id == product);
        if (index < 3) {

            result += `<li class="order-list_item">
                            <a class="order-list_item_product_link" href="product.html?id=${productItem.id}">
                                <img src="${productItem.logo}" alt="${productItem.title}">
                                <div>
                                    <p class="order-list_item_album_name">${productItem.title.toUpperCase()}</p>
                                    <p class="order-list_item_artist_name">${artists.find(artist => artist.id == productItem.artist_id).title.toUpperCase()}</p>
                                </div>
                            </a>
                        </li>`;
        } else {
            result += `<li class="order-list_item no-show" data-show=1>
                            <a class="order-list_item_product_link" href="product.html?id=${productItem.id}">
                                <img src="${productItem.logo}" alt="${productItem.title}">
                                <div>
                                    <p class="order-list_item_album_name">${productItem.title.toUpperCase()}</p>
                                    <p class="order-list_item_artist_name">${artists.find(artist => artist.id == productItem.artist_id).title.toUpperCase()}</p>
                                </div>
                            </a>
                        </li>`;
        }
    });

    if (order.order_list.length > 3) {
        result += `<li class="order-list_item order-list_item_more-link">
                        <p>+${order.order_list.length - 3} <img src="./img/site/show_more.svg" alt="ПОЛНЫЙ СПИСОК"></p>
                    </li>`
    }
                    
    result += `</ul>
                <div class="orders_item_status-order">
                    <span>СТАТУС</span>
                    <p>${order_statuses.find(status => status.id == order.status_id).title.toUpperCase()}</p>
                </div>
            </li>`;

    return result;
}

export function getOrderCardList(orders) {
    let result = '';

    orders.forEach(order => {
        result += getOrderCard(order);
    });

    return result;
}
