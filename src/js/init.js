import { initLoader } from './components/loader.js';
import { initNavigation } from './components/navigation.js';
import { initHeaderTilt, initHoverReveal, initPortfolioHover, initImageParallax } from './components/animations.js';
import { initSmoothScrollbar, initPinSteps, initScrollTo } from './components/scroll.js';
import { select } from './utils/helpers.js';
import { initPageTransitions } from './components/barba.js';
import { loadPlugin } from './pluginLoader.js';

let bodyScrollBar;

export async function initializeApp() {
    //==============================================
    // LOADER AND PAGE TRANSITIONS
    // Initialize the loader and set up page transitions
    //==============================================
    const loader = select('.loader');
    const loaderInner = select('.loader .inner');
    const progressBar = select('.loader .progress');
    const loaderMask = select('.loader__mask');

    await initLoader();
    initPageTransitions(loader, loaderInner, loaderMask);

    //==============================================
    // PLUGIN INITIALIZATION
    // Load and initialize plugins that should be available on initial page load
    //==============================================
    const swiperElement = select('#swiper-container');
    if (swiperElement) {
        await loadPlugin('swiper', swiperElement);
    }

    // Add more initial plugins here
    // Example:
    // const accordionElement = select('#accordion-container');
    // if (accordionElement) {
    //     await loadPlugin('accordion', accordionElement);
    // }
}

export function initContent() {
    //==============================================
    // CORE FUNCTIONALITY
    // Initialize essential features of the website
    //==============================================
    select('body').classList.remove('is-loading');
    bodyScrollBar = initSmoothScrollbar();
    initNavigation();

    //==============================================
    // ANIMATIONS AND EFFECTS
    // Set up various animations and visual effects
    //==============================================
    initHeaderTilt();
    initHoverReveal();
    initPortfolioHover();
    initImageParallax();

    //==============================================
    // SCROLL-RELATED FEATURES
    // Initialize scroll-based functionality
    //==============================================
    initPinSteps();
    initScrollTo(bodyScrollBar);

    //==============================================
    // PLUGIN REINITIALIZATION
    // Reinitialize plugins after content load (for dynamic content and page transitions)
    //==============================================
    const swiperElement = select('#swiper-container');
    if (swiperElement) {
        loadPlugin('swiper', swiperElement);
    }

    // Reinitialize more plugins here
    // Example:
    // const accordionElement = select('#accordion-container');
    // if (accordionElement) {
    //     loadPlugin('accordion', accordionElement);
    // }
}