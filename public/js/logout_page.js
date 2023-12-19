if (sessionStorage.getItem('login')) {
    sessionStorage.removeItem('login');
    window.location = 'index.html';
} else {
    window.location = '403.html';
}