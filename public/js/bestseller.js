import { sales } from './query.js';

export let albumsCounter = {};

sales.forEach(sale => {
    sale.order_list.forEach(order => {
        if (!albumsCounter.hasOwnProperty(order)) {
            albumsCounter[`${order}`] = 1;
        } else {
            albumsCounter[`${order}`] += 1;
        }
    });
});

albumsCounter = Object.entries(albumsCounter).sort((sale1, sale2) => {
    return sale1[1] < sale2[1];
});

albumsCounter.length = 3;
