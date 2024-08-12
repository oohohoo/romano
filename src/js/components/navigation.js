 import { gsap } from 'gsap';
 import { ScrollTrigger } from 'gsap/ScrollTrigger'; 

export function initNavigation() {
    const mainNavLinks = gsap.utils.toArray('.main-nav a');
    const mainNavLinksRev = gsap.utils.toArray('.main-nav a').reverse();

    mainNavLinks.forEach(link => {
        link.addEventListener('mouseleave', e => {
            link.classList.add('animate-out');
        });
        link.ontransitionend = function() {
            link.classList.remove('animate-out');
        }
    });

    function navAnimation(direction) {
        const scrollingDown = direction === 1;
        const links = scrollingDown ? mainNavLinks : mainNavLinksRev;
        return gsap.to(links, {
            duration: 0.3, 
            stagger: 0.05, 
            autoAlpha: () => scrollingDown ? 0 : 1, 
            y: () => scrollingDown ? 20 : 0,
            ease: 'power4.out'
        });
    }

    ScrollTrigger.create({
        trigger: '#main',
        start: 'top top-=100',
        end: 'bottom bottom-=200',
        toggleClass: {
            targets: 'body',
            className: 'has-scrolled'
        },
        onEnter: ({direction}) => navAnimation(direction),
        onLeaveBack: ({direction}) => navAnimation(direction),
    });
}