window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.wrapper').addEventListener('click', (e) => {
        let target = e.target;
        if (target && target.classList.contains('burger')) {
            burgerOpen(target);
        } else if (target && target.closest('.burger')) {
            burgerOpen(target.closest('.burger'));
        } else if (target && target.classList.contains('logo') || target.closest('.logo')) {
            e.preventDefault();
            scroll = window.pageYOffset;
            document.querySelector('.burger').classList.remove('active');
            document.querySelector('.nav').classList.remove('active');
            document.body.classList.remove('fixed');
            UnlockScroll();
        }
    });
    // burger
    let scroll;
    function LockScroll() {
        document.documentElement.scrollTop = scroll;
        document.body.style.top = -scroll + 'px';
    };
    function UnlockScroll() {
        document.documentElement.scrollTop = scroll;
        document.body.style = null;
    };
    function burgerOpen(burger) {
        scroll = window.pageYOffset;
        burger.classList.toggle('active');
        document.querySelector('.nav').classList.toggle('active');
        if (burger.classList.contains('active')) {
            LockScroll();
        } else {
            UnlockScroll();
        };
        document.body.classList.toggle('fixed');
    };
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
        document.documentElement.scrollTop = 0;
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
    // slider

    // slider
});