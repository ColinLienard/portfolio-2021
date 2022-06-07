document.body.classList.toggle('overflow-y-hidden');

window.addEventListener('load', function() {
    setTimeout(function() {
        const preload = document.querySelector('.preload');
        preload.classList.add('preload-finish');
        document.body.classList.toggle('overflow-y-hidden');
    }, 500);
});