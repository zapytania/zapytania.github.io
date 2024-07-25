console.log('main.js');
var menuToggled = false;

function menuToggle()
{
    console.log('menuToggle', menuToggled);

    if (!menuToggled) {
        document.getElementById('headerDiv').setAttribute('aria-hidden', true);
        document.getElementById('headerDiv').setAttribute('inert', '');
        document.getElementById('closeButton').setAttribute('aria-expanded', true);
        document.getElementById('R3a').classList.add('expanded');
        document.getElementById('R3a').removeAttribute('inert');
        document.getElementById('R3a').setAttribute('aria-hidden', false);
        document.getElementById('headerDiv').removeAttribute('inert');
        document.getElementById('closeButton').setAttribute('aria-hidden', false);
    } else {
        document.getElementById('headerDiv').setAttribute('aria-hidden', false);
        document.getElementById('headerDiv').removeAttribute('inert');
        document.getElementById('closeButton').setAttribute('aria-expanded', false);
        document.getElementById('R3a').classList.remove('expanded');
        document.getElementById('R3a').setAttribute('inert', '');
        document.getElementById('R3a').setAttribute('aria-hidden', true);
    }
    menuToggled = !menuToggled;
}

function toggleLanguages()
{
    console.log('click');
    document.getElementById('drawer').classList.toggle('translate-x-0');
    document.getElementById('drawer').classList.toggle('translate-x-full');
    document.getElementById('drawer-backdrop').classList.toggle('invisible');
    document.getElementById('drawer-backdrop').classList.toggle('opacity-0');
    document.getElementById('drawer-backdrop').classList.toggle('opacity-100');
}

// document.addEventListener("DOMContentLoaded", function(event) {
    console.log('DOMContentLoaded');


    function detectMob() {
        return ( ( window.innerWidth <= 800 ) && ( window.innerHeight <= 600 ) );
    }
    const selector = detectMob() ? '.sticky-header' : '.sticky-header, .sticky-header-mobile';
    var stickyHeadersPoints = [];
    document.querySelectorAll(selector).forEach(i => {
        let topOffset = (window.pageYOffset || i.scrollTop) - (i.clientTop || 0);
        let topOffset2 = (window.pageYOffset || (i.scrollTop + i.scrollHeight)) - (i.clientTop || 0);
        console.log(i.getBoundingClientRect(), window);
        stickyHeadersPoints.push({
            'element': i,
            'top': i.getBoundingClientRect().top,
            'bottom': i.getBoundingClientRect().bottom,
        });
    });

    function getStickyHeadersOffset(idx) {
        if (idx >= 0 && idx < stickyHeadersPoints.length) {
            return stickyHeadersPoints[idx];
        }

        return 0;
    }

    let stickyHeaderIndex = 0;
    let stickyHeaderOffsetTop = getStickyHeadersOffset(stickyHeaderIndex);
    let stickyHeaderOffsetTopPrev = getStickyHeadersOffset(stickyHeaderIndex - 1);
    let stickyHeaderOffsetTopNext = getStickyHeadersOffset(stickyHeaderIndex + 1);

    console.log('stickyHeadersPoints', stickyHeadersPoints);


    function setScrollItemsPosition() {
        const currentScrollPos = window.pageYOffset;

        //console.log(currentScrollPos);
        if (currentScrollPos > 80) {
            document.getElementById('bottomMenu').classList.remove('hiddenBottomMenu');
        } else {
            document.getElementById('bottomMenu').classList.add('hiddenBottomMenu');
        }

        // let el = getElementWithStickyTitle(currentScrollPos);
        // if (el) {
        //     console.log('has sticky el', el);
        //     el['element'].classList.add('sticky');
        // }
        //
        // document.querySelectorAll('.sticky-header.sticky').forEach(i => {
        //     if (el === null || i.id !== el['element'].id) {
        //         i.classList.remove('sticky');
        //     }
        // });
    }

    function getElementWithStickyTitle(scrollPos)
    {
        let ret = null;
        for (let i = 0; i < stickyHeadersPoints.length; i++) {

            if (stickyHeadersPoints[i].top <= scrollPos) {
                ret = stickyHeadersPoints[i];
            }

            if (ret !== null && stickyHeadersPoints[i].top > scrollPos) {
                return ret;
            }
        }

        return ret;
    }

setScrollItemsPosition();

    window.addEventListener('scroll', function() {
        // current scroll position
        setScrollItemsPosition()
    });
// });

const observer = new IntersectionObserver(entries => {
    // Loop over the entries
    entries.forEach(entry => {
        // If the element is visible
        //console.log(entry);
        if (entry.isIntersecting) {
            // console.log('entry.isIntersecting', entry);
            // Add the animation class
            entry.target.classList.add('in-view-animation');
        }
    });
});

document.querySelectorAll('.scroll-animate').forEach((i) => {
    if (i) {
        observer.observe(i);
    }
});

document.querySelectorAll('.scroll-animate-vertical').forEach((i) => {
    if (i) {
        observer.observe(i);
    }
});

// const emblaNode = document.querySelector('.embla')
// const options = { loop: false }
// const emblaApi = EmblaCarousel(emblaNode, options)
//
// console.log(emblaApi.slideNodes()) // Access API

function addTogglePrevNextBtnsActive  (emblaApi, prevBtn, nextBtn)  {
    const togglePrevNextBtnsState = () => {
        if (emblaApi.canScrollPrev()) prevBtn.removeAttribute('disabled');
        else prevBtn.setAttribute('disabled', 'disabled');

        if (emblaApi.canScrollNext()) nextBtn.removeAttribute('disabled');
        else nextBtn.setAttribute('disabled', 'disabled');
    };

    emblaApi
        .on('select', togglePrevNextBtnsState)
        .on('init', togglePrevNextBtnsState)
        .on('reInit', togglePrevNextBtnsState);

    return () => {
        prevBtn.removeAttribute('disabled');
        nextBtn.removeAttribute('disabled');
    };
}

function addPrevNextBtnsClickHandlers (emblaApi, prevBtn, nextBtn)  {
    const scrollPrev = () => {
        emblaApi.scrollPrev();
    };
    const scrollNext = () => {
        emblaApi.scrollNext();
    };
    prevBtn.addEventListener('click', scrollPrev, false);
    nextBtn.addEventListener('click', scrollNext, false);

    const removeTogglePrevNextBtnsActive = addTogglePrevNextBtnsActive(
        emblaApi,
        prevBtn,
        nextBtn
    );

    let ret = function() {
        removeTogglePrevNextBtnsActive();
        prevBtn.removeEventListener('click', scrollPrev, false);
        nextBtn.removeEventListener('click', scrollNext, false);
    }
    return ret;
}

function addDotBtnsAndClickHandlers (emblaApi, dotsNode)  {
    let dotNodes = [];

    const addDotBtnsWithClickHandlers = () => {
        dotsNode.innerHTML = emblaApi
            .scrollSnapList()
            .map(() => '<button class="embla__dot" type="button" aria-label="button"></button>')
            .join('');

        const scrollTo = (index) => {
            emblaApi.scrollTo(index);
        }

        dotNodes = Array.from(dotsNode.querySelectorAll('.embla__dot'));
        dotNodes.forEach((dotNode, index) => {
            dotNode.addEventListener('click', () => scrollTo(index), false);
        })
    }

    const toggleDotBtnsActive = () => {
        const previous = emblaApi.previousScrollSnap();
        const selected = emblaApi.selectedScrollSnap();
        dotNodes[previous].classList.remove('embla__dot--selected');
        dotNodes[selected].classList.add('embla__dot--selected');
    }

    emblaApi
        .on('init', addDotBtnsWithClickHandlers)
        .on('reInit', addDotBtnsWithClickHandlers)
        .on('init', toggleDotBtnsActive)
        .on('reInit', toggleDotBtnsActive)
        .on('select', toggleDotBtnsActive);

    return () => {
        dotsNode.innerHTML = ''
    };
}

document.querySelectorAll('.embla_carousel').forEach((i) => {
    if (i) {
        const emblaNode = i;
        const viewportNode = i.querySelector('.embla_carousel_viewport');
        const prevBtnNode = i.querySelector('.embla_carousel_buttons_prev');
        const nextBtnNode = i.querySelector('.embla_carousel_buttons_next');
        const dotsNode = i.querySelector('.embla_carousel_dots');

        const autoplay = i.getAttribute('data-autplay') ?? '0';
        const duration = i.getAttribute('data-duration') ?? '3000';
        console.log(autoplay, duration);

        const emblaApi = EmblaCarousel(viewportNode, {loop: true}, [
            EmblaCarouselAutoplay({ playOnInit: autoplay === '1', delay: duration })
        ]);
        const removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(
            emblaApi,
            prevBtnNode,
            nextBtnNode
        );
        const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(
            emblaApi,
            dotsNode
        );

        emblaApi.on('destroy', removePrevNextBtnsClickHandlers);
        emblaApi.on('destroy', removeDotBtnsAndClickHandlers);
    }
});

function navigateToTopAndOpenMenu() {
    window.scrollTo({top: 0, behavior: 'smooth'});
    setTimeout(menuToggle, 700);
}

