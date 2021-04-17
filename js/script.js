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
// textarea
function calcTextLength() {
    document.querySelectorAll('.interaction__textarea').forEach((item) => {
        let val = item.value;
        let textLength = val.split('').length;
        item.closest('.interaction__textarea-wrapper').setAttribute('data-length', textLength);
    });
};
// textarea
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
    scroll = window.pageYOffset;
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
let name_el = document.querySelector('.interaction__input.name');
let surname_el = document.querySelector('.interaction__input.surname');
let link_el = document.querySelector('.interaction__input.link');

// name and surnama and link
function getInfoAboutPeople() {
    nameI = name_el.value;
    surname = surname_el.value;
    link = link_el.value;

    if (localStorage.getItem('identify')) {
        localStorage.identify = JSON.stringify({
            name: nameI,
            surname: surname,
            link: link
        });
    } else {
        localStorage.setItem('identify', JSON.stringify({
            name: nameI,
            surname: surname,
            link: link
        }));
    };
};
// name and surnama and link

window.addEventListener('DOMContentLoaded', () => {
    function storageMenuSet() {
        if (document.querySelector('.menu__button')) {

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
        }
        if (localStorage.getItem('identify')) {
            name_el.value = JSON.parse(localStorage.getItem('identify')).name;
            surname_el.value = JSON.parse(localStorage.getItem('identify')).surname;
            link_el.value = JSON.parse(localStorage.getItem('identify')).link;
        }
    };
    storageMenuSet();

    // select
    const selects = document.querySelectorAll('.select');
    // select
    // select item
    function switchInteraction(item) {
        let index = item.getAttribute('data-switch-interaction');
        let interactionSwitchItems = document.querySelectorAll('.js-interaction');
        if (item !== document.querySelector('select__item.selected') || onceSetInteraction) {
            interactionSwitchItems.forEach((item) => {
                item.classList.add('hide');
                let itemIndex = item.getAttribute('data-interaction-index').split(',');
                itemIndex.forEach((num) => {
                    if (num === index) {
                        item.classList.remove('hide');
                    }
                });
            });
            selects.forEach((el) => {
                if (el.classList.contains('open')) {
                    el.classList.remove('open')
                }
            });
        };
    };
    switchInteraction(document.querySelector('.select__item.selected'), onceSetInteraction = true);
    function setSelectItem(item) {
        let itemParent = item.closest('.select');
        if (!item.classList.contains('selected')) {
            itemParent.querySelectorAll('.select__item').forEach((item) => {
                item.classList.remove('selected');
            });
            content = item.innerText;
            itemParent.setAttribute('data-select-element', content);
            item.classList.add('selected');
            itemParent.classList.remove('open')

            if (!itemParent.classList.contains('low')) {
                switchInteraction(item);
            }
        }
    };
    // select item
    // textarea
    function textareaSetHeight() {
        let observe;
        if (window.attachEvent) {
            observe = function (element, event, handler) {
                element.attachEvent('on' + event, handler);
            };
        }
        else {
            observe = function (element, event, handler) {
                element.addEventListener(event, handler, false);
            };
        }
        let text = document.querySelector('textarea');
        function resize() {
            text.style.height = 'auto';
            text.style.height = text.scrollHeight + 'px';
        }
        function delayedResize() {
            window.setTimeout(resize, 0);
        }
        observe(text, 'change', resize);
        observe(text, 'cut', delayedResize);
        observe(text, 'paste', delayedResize);
        observe(text, 'drop', delayedResize);
        observe(text, 'keydown', delayedResize);

        text.focus();
        text.select();
        resize();
    };
    textareaSetHeight()
    // textarea
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
                document.documentElement.scrollTop = 0;
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
                selects.forEach((item) => {
                    item.classList.remove('open');
                });
                closeModal();
            } else if (e.target && e.target.classList.contains('select') || e.target.closest('.select')) {
                e.target.closest('.select').classList.toggle('open');
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
            } else if (e.target && e.target.classList.contains('interaction__show-link') || e.target.closest('.interaction__show-link')) {
                e.target.classList.add('hide');
                document.querySelector('.interaction__-input').classList.toggle('show');
            } else if (e.target && !e.target.classList.contains('select__item') || !e.target.closest('.select__item')) {
                selects.forEach((item) => {
                    item.classList.remove('open');
                });
            }
        })
    })
});