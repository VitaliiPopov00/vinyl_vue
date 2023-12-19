import { sales } from './query.js';

let lastSales = sales.sort((sale1, sale2) => {
    return (new Date(sale1.date)).getTime() < (new Date(sale2.date)).getTime()
});

export let lastSalesProduct = [];

lastSales.some(sale => {
    if (lastSalesProduct.length < 4) {
        sale.order_list.some(product => {
            if (lastSalesProduct.length < 3 && !lastSalesProduct.includes(product)) {
                lastSalesProduct.push(product);
            } else {
                return false;
            }
        });
    } else {
        return false;
    }
});