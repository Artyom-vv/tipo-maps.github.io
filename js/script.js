window.addEventListener('DOMContentLoaded', () => {
    // burger
    let scroll;
    const burger = document.querySelector('.burger');
    const logo = document.querySelector('.logo');

    function LockScroll() {
        document.documentElement.scrollTop = scroll;
        document.body.style.top = -scroll + 'px';
    };
    function UnlockScroll() {
        document.documentElement.scrollTop = scroll;
        document.body.style = null;
    };

    burger.addEventListener('click', () => {
        scroll = window.pageYOffset;
        burger.classList.toggle('active');
        document.querySelector('.nav').classList.toggle('active');
        if (burger.classList.contains('active')) {
            LockScroll();
        } else {
            UnlockScroll();
        };
        document.body.classList.toggle('fixed');
    });
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        if (burger.classList.contains('active')) {
            document.querySelector('.nav').classList.remove('active');
            burger.classList.remove('active');
            document.body.classList.remove('fixed');
            UnlockScroll();
        }
    });
    // burger end
});