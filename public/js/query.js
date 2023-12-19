if (!localStorage.getItem('albums_json')) {
    fetch('../database/albums.json')
        .then(response => {
            return response.json();
        })
        .then(data => {
            localStorage.setItem('albums_json', JSON.stringify(data));
        });
}

if (!localStorage.getItem('artists_json')) {
    fetch('../database/artists.json')
        .then(response => {
            return response.json();
        })
        .then(data => {
            localStorage.setItem('artists_json', JSON.stringify(data));
        });
}

if (!localStorage.getItem('genres_json')) {
    fetch('../database/genres.json')
        .then(response => {
            return response.json();
        })
        .then(data => {
            localStorage.setItem('genres_json', JSON.stringify(data));
        });
}

if (!localStorage.getItem('order_statuses_json')) {
    fetch('../database/order_statuses.json')
        .then(response => {
            return response.json();
        })
        .then(data => {
            localStorage.setItem('order_statuses_json', JSON.stringify(data));
        });
}

if (!localStorage.getItem('sales_json')) {
    fetch('../database/sales.json')
        .then(response => {
            return response.json();
        })
        .then(data => {
            localStorage.setItem('sales_json', JSON.stringify(data));
        });
}

if (!localStorage.getItem('basketProducts')) {
    localStorage.setItem('basketProducts', '[]');
}

export let albums = JSON.parse(localStorage.getItem('albums_json'));
export let artists = JSON.parse(localStorage.getItem('artists_json'));
export let genres = JSON.parse(localStorage.getItem('genres_json'));
export let order_statuses = JSON.parse(localStorage.getItem('order_statuses_json'));
export let sales = JSON.parse(localStorage.getItem('sales_json'));