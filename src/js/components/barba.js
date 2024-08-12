import { gsap } from 'gsap';
import barba from '@barba/core';
import { select } from '../utils/helpers.js';
import { initContent } from '../init.js';

let loader, loaderInner, loaderMask;

function pageTransitionIn({container}) {
    const tl = gsap.timeline({
        defaults: {
            duration: 0.8,
            ease: 'power1.inOut'
        }
    });
    tl
        .set(loaderInner, { autoAlpha: 0 })
        .fromTo(loader, { yPercent: -100 }, {yPercent: 0 })
        .fromTo(loaderMask, { yPercent: 80 }, {yPercent: 0 }, 0)
        .to(container, { y: 150}, 0);
    return tl;
}

function pageTransitionOut({container}) {
    const tl = gsap.timeline({
        defaults: {
            duration: 0.8,
            ease: 'power1.inOut'
        },
        onComplete: () => initContent()
    });
    tl
        .to(loader, { yPercent: 100 })
        .to(loaderMask, { yPercent: -80 }, 0)
        .from(container, { y: -150}, 0);
    return tl;
}

export function initPageTransitions(loaderElement, loaderInnerElement, loaderMaskElement) {
    loader = loaderElement;
    loaderInner = loaderInnerElement;
    loaderMask = loaderMaskElement;

    barba.hooks.before(() => {
        select('html').classList.add('is-transitioning');
    });

    barba.hooks.after(() => {
        select('html').classList.remove('is-transitioning');
    });

    barba.hooks.enter(() => {
        window.scrollTo(0, 0);
    });

    barba.init({
        prevent: ({ event, href }) => {
			if (event.type === "click") {
				// prevent the user to reload the page if the location is the same
				if (href === window.location.href) {
					event.preventDefault();
					event.stopPropagation();
					return true;
				}
				if (barba.transitions.isRunning) {
					event.preventDefault();
					event.stopPropagation();
					return true;
				}
			}
		},
        transitions: [{
            name: 'default-transition',
            async leave({current}) {
                await pageTransitionIn(current);
            },
            enter({next}) {
                pageTransitionOut(next);
            }
        }]
    });
}