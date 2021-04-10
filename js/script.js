window.addEventListener('DOMContentLoaded', () => {
    function storageMenuSet() {
        if (localStorage.getItem('align') === 'grid') {
            switchClear();
            document.querySelector('.grid').classList.add('active');
            document.querySelector('.maps-page__group').classList.add('grid')
        } else if (localStorage.getItem('align') === 'row') {
            switchClear();
            document.querySelector('.row').classList.add('active');
            document.querySelector('.maps-page__group').classList.add('row')
        } else {
            switchClear();
            document.querySelector('.grid').classList.add('active');
            document.querySelector('.maps-page__group').classList.add('grid')
        }
    };
    if (document.querySelector('.menu__button')) {
        storageMenuSet();
    }
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
        if (document.querySelector('.menu__button')) {
            storageMenuSet();
        }
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
    // switch
    function switchClear() {
        const btns = document.querySelectorAll('.menu__button');
        btns.forEach((item) => {
            item.classList.remove('active');
        });
    };
    // switch
    // slider

    // slider

    // addEventListener
    document.querySelector('.wrapper').addEventListener('click', (e) => {
        let target = e.target;
        if (target && target.classList.contains('burger')) {
            burgerOpen(target);
        } else if (target && target.closest('.burger')) {
            burgerOpen(target.closest('.burger'));
        } else if (target && target.classList.contains('logo') || target.closest('.logo')) {
            e.preventDefault();
            document.querySelector('.burger').classList.remove('active');
            document.querySelector('.nav').classList.remove('active');
            document.body.classList.remove('fixed');
            UnlockScroll();
        } else if (target && target.classList.contains('menu__button') || target.closest('.menu__button')) {
            switchClear();
            let thisTargetBtn = target.closest('.menu__button');
            if (thisTargetBtn.classList.contains('grid')) {
                if (localStorage.getItem('align')) {
                    localStorage.align = 'grid'
                } else {
                    localStorage.setItem('align', 'grid');
                }
                document.querySelector('.maps-page__group').classList.remove('row')
                document.querySelector('.maps-page__group').classList.add('grid')
            } else if (thisTargetBtn.classList.contains('row')) {
                if (localStorage.getItem('align')) {
                    localStorage.align = 'row'
                } else {
                    localStorage.setItem('align', 'row');
                }
                document.querySelector('.maps-page__group').classList.remove('grid')
                document.querySelector('.maps-page__group').classList.add('row')
            } else {
                if (localStorage.getItem('align')) {
                    localStorage.align = 'grid'
                } else {
                    localStorage.setItem('align', 'grid');
                }
                document.querySelector('.maps-page__group').classList.remove('row')
                document.querySelector('.maps-page__group').classList.add('grid')
            }
            thisTargetBtn.classList.add('active');
        }
    });
});