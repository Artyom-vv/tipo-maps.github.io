// search
function searchMapsInput() {
    let val = document.querySelector('.menu__input').value.trim().toLowerCase();
    let elements = document.querySelectorAll('.maps-page__map');
    if (val != '') {
        elements.forEach((item) => {
            let content = item.getAttribute('data-tags').split(' ');
            content = content.concat(item.querySelector('.text.low.trim').innerText.split(' '));
            content = content.join(' ').toLowerCase();
            if (content.search(val) == -1) {
                item.classList.add('hidden');
            } else {
                item.classList.remove('hidden');
                document.querySelector('.search-not-found').classList.remove('show');
            }
        });
    }
    else {
        elements.forEach((item) => {
            item.classList.remove('hidden')
        })
        document.querySelector('.search-not-found').classList.remove('show');
    }
    let count = 0;
    elements.forEach((item) => {
        if (item.classList.contains('hidden')) {
            count++;
            console.log(count);
        }
    });
    if (elements.length === count) {
        document.querySelector('.search-not-found').classList.add('show');
    }
};
// search
// wheel
const vk = document.querySelector('.fixed-vk');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        vk.style.top = '35px'
    } else if (window.pageYOffset <= 270) {
        vk.style.top = null;
    }
});
// wheel
// modal
let scroll;
// scroll lock and unlock
function paddingSet() {
    let padding = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = padding + "px";

    document.querySelectorAll('.fixed-padding-add').forEach((item) => {
        item.style.paddingRight = padding + 'px';
    });
};
function LockScroll() {
    if (document.documentElement.scrollHeight !== window.innerHeight && document.documentElement.clientWidth > 1280) {
        paddingSet();
    };
    document.body.classList.add('fixed');
    document.body.style.top = -scroll + 'px';
};
function UnlockScroll() {
    document.body.classList.remove('fixed');
    document.documentElement.scrollTop = scroll;
    document.body.style = null;
    document.querySelectorAll('.fixed-padding-add').forEach((item) => {
        item.style = null;
    });
};
// scroll lock and unlock

function closeModal() {
    document.querySelectorAll('.modal-wrapper').forEach((item) => {
        item.classList.remove('show');
    })
    if (document.documentElement.clientWidth > 1280) {
        setTimeout(() => {
            UnlockScroll()
        }, 200);
    } else {
        UnlockScroll()
    }
    // closeModalRemoveClasses();
};
function openModal() {
    document.querySelectorAll('.modal-wrapper').forEach((modal) => {
        if (document.querySelector('.offer__button').getAttribute('data-index') === modal.getAttribute('data-index')) {
            scroll = window.pageYOffset;

            LockScroll();

            document.querySelectorAll('.modal-wrapper').forEach((item) => {
                item.classList.remove('show');
            });

            modal.classList.add('show');
        }
    })
};
// modal

window.addEventListener('DOMContentLoaded', () => {
    function storageMenuSet() {
        if (document.documentElement.clientWidth <= 900) {
            if (localStorage.getItem('align')) {
                localStorage.setItem('align', 'grid');
            } else {
                localStorage.align = 'grid'
            }
            document.querySelector('.maps-page__group').classList.add('grid')
        }
        if (localStorage.getItem('align') === 'grid') {
            switchClear();
            document.querySelector('.grid').classList.add('active');
            document.querySelector('.maps-page__group').classList.add('grid')
        } else if (localStorage.getItem('align') === 'row') {
            switchClear();
            document.querySelector('.row').classList.add('active');
            document.querySelector('.maps-page__group').classList.add('row')
        }
        else {
            switchClear();
            document.querySelector('.grid').classList.add('active');
            document.querySelector('.maps-page__group').classList.add('grid')
        }
    };
    if (document.querySelector('.menu__button')) {
        storageMenuSet();
    }
    // select item
    function setSelectItem(item) {
        if (!item.classList.contains('selected')) {
            document.querySelectorAll('.select__item').forEach((item) => {
                item.classList.remove('selected');
            });
            content = item.innerText;
            item.closest('.select').setAttribute('data-select-element', content);
            item.classList.add('selected')
        } else {
            document.querySelectorAll('.select__item').forEach((item) => {
                item.classList.remove('selected');
            });
            item.closest('.select').setAttribute('data-select-element', 'Не выбрано');
        }
    };
    // select item
    // burger
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
        return gsap.timeline().to('ul.transition li', { duration: .4, scaleY: 1, transformOrigin: "bottom left", stagger: 0.2 })
    };
    // slider
    function sliderInit() {
        new Swiper('.slider-about-page', {
            navigation: {
                nextEl: '.slider-navigation__switch.next',
                prevEl: '.slider-navigation__switch.prev',
            },

            pagination: {
                el: '.slider-navigation__points',
                clickable: true
            },
            spaceBetween: 30,
            autoHeight: true
        });
    };
    sliderInit();
    // slider
    function showPage() {
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
                paddingSet();
                LockScroll();
                await pageTransition();
                data.current.container.remove()
            },
            async enter(data) {
                UnlockScroll();
                sliderInit();
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
    // select
    const select = document.querySelector('.select');
    // select
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
    document.querySelectorAll('.modal-wrapper').forEach((item) => {
        item.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('modal-wrapper') && !e.target.closest('.modal') || e.target.closest('.modal__close')) {
                closeModal();
            } else if (e.target && e.target.classList.contains('select') || e.target.closest('.select')) {
                select.classList.toggle('open');
                if (e.target.closest('.select__item')) {
                    setSelectItem(e.target);
                }
            } else if (e.target && e.target.classList.contains('interaction__item') || e.target.closest('.interaction__item')) {
                const item = e.target.closest('.interaction__item');
                if (item.classList.contains('selected')) {
                    item.classList.remove('selected');
                } else {
                    item.classList.add('selected')
                }
            }
        })
    })
});