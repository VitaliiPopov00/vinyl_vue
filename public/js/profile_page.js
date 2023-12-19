import { getOrderCardList } from './product_card_function.js';
import { sales } from './query.js';

if (!sessionStorage.getItem('login')) {
    window.location = '403.html';
}

let user;
let userID;

fetch('../database/users.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        user = data.find(user => user.login == sessionStorage.getItem('login'));
        userID = user.id;
        let userOrders = sales.filter(sale => sale.user_id == userID);

        if (userOrders.length) {
            $('.profile_orders_list').html(getOrderCardList(userOrders));
        } else {
            $('.profile_orders_title').html('ВАШ СПИСОК ЗАКАЗОВ ПУСТ :(');
        }
    });

$('.profile_orders_list').on('click', '.order-list_item_more-link', function() {
    $('.order-list_item[data-show=1]').toggleClass('no-show');
});
