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

    // barba
    function pageTransition() {
        scroll = window.pageYOffset;
        document.body.classList.add('fixed');
        LockScroll();
        return gsap.timeline().to('ul.transition li', { duration: .4, scaleY: 1, transformOrigin: "bottom left", stagger: 0.2 })
    };
    function showPage() {
        document.body.classList.remove('fixed');
        UnlockScroll();
        return gsap.timeline().to('ul.transition li', { duration: .4, scaleY: 0, transformOrigin: "bottom left", stagger: 0.2, delay: 0.15 })
    };
    barba.init({
        sync: true,
        transitions: [{
            async leave(data) {
                await pageTransition();
                data.current.container.remove()
            },
            async enter(data) {
                await showPage();
            }
        }]
    });
    // barba end
});