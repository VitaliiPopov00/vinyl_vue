$(window).ready(function () {
    setTimeout(() => {
        $('.loader > svg').animate({
            width: '300px',
            height: '300px',
            opacity: 0
        }, 300, 'swing', () => {
            $('header, main, footer').animate({
                opacity: 1
            }, 300, 'swing', () => {
                $('header, main, footer').removeClass('opacity');
                $('.loader').addClass('no-show');
            });
        });
    }, 150);
});