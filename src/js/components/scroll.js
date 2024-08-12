import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; 
import Scrollbar from 'smooth-scrollbar';
import { select, selectAll, updateBodyColor } from '../utils/helpers.js';

export function initSmoothScrollbar() {
    const bodyScrollBar = Scrollbar.init(select('#viewport'), {damping: 0.07});
    bodyScrollBar.track.xAxis.element.remove();

    ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
            if (arguments.length) {
                bodyScrollBar.scrollTop = value;
            }
            return bodyScrollBar.scrollTop;
        }
    });
    
    bodyScrollBar.addListener(ScrollTrigger.update);

    return bodyScrollBar;
}

export function initPinSteps() {
    ScrollTrigger.create({
        trigger: '.fixed-nav',
        start: 'top center',
        endTrigger: '#stage4',
        end: 'center center',
        pin: true,
        pinReparent: true
    });

    const getVh = () => {
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        return vh;
    }

    gsap.utils.toArray('.stage').forEach((stage, index) => {
        const navLinks = gsap.utils.toArray('.fixed-nav li');

        ScrollTrigger.create({
            trigger: stage,
            start: 'top center',
            end: () => `+=${stage.clientHeight+getVh()/10}`,
            toggleClass: {
                targets: navLinks[index],
                className: 'is-active'
            },
            onEnter: () => updateBodyColor(stage.dataset.color),
            onEnterBack: () => updateBodyColor(stage.dataset.color),
        });
    });
}

export function initScrollTo(bodyScrollBar){
    gsap.utils.toArray('.fixed-nav a').forEach(link => {
        const target = link.getAttribute('href');

        link.addEventListener('click', (e) => {
            e.preventDefault();
            bodyScrollBar.scrollIntoView(select(target), {damping: 0.07, offsetTop: 100});
        });
    });
}

