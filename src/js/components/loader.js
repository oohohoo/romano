import { gsap } from 'gsap';
import { select, selectAll } from '../utils/helpers.js';
import { initContent } from '../init.js';

export function initLoader() {
    return new Promise((resolve) => {
        const loader = select('.loader');
        const loaderInner = select('.loader .inner');
        const progressBar = select('.loader .progress');
        const loaderMask = select('.loader__mask');
        const loaderContent = select('.loader__content');

        const tlLoaderIn = gsap.timeline({
            id: 'tlLoaderIn',
            defaults: {
                duration: 1.1,
                ease: 'power2.out'
            },
            onComplete: () => initContent()
        });

        const image = select('.loader__image img');
        const mask = select('.loader__image--mask');
        const line1 = select('.loader__title--mask:nth-child(1) span');
        const line2 = select('.loader__title--mask:nth-child(2) span');
        const lines = selectAll('.loader__title--mask');

        const tlLoaderOut = gsap.timeline({
            id: 'tlLoaderOut',
            defaults: {
                duration: 1.2,
                ease: 'power2.inOut'
            },
            delay: 1
        });

        tlLoaderIn
            .set(loaderContent, { autoAlpha: 1 })
            .to(loaderInner, {
                scaleY: 1,
                transformOrigin: 'bottom',
                ease: 'power1.inOut'
            })
            .addLabel('revealImage')
            .from(mask, { yPercent: 100 }, 'revealImage-=0.6')
            .from(image, { yPercent: -80 }, 'revealImage-=0.6')
            .from([line1, line2], { yPercent: 100, stagger: 0.1 }, 'revealImage-=0.4');

        tlLoaderOut
            .to(lines, { yPercent: -500, stagger: 0.2 }, 0)
            .to([loader, loaderContent], { yPercent: -100 }, 0.2)
            .from('#main', { y: 150 }, 0.2);

        const tlLoader = gsap.timeline();
        tlLoader
            .add(tlLoaderIn)
            .add(tlLoaderOut);

        // show loader on page load
        gsap.set(loader, { autoAlpha: 1 });

        // scale loader down
        gsap.set(loaderInner, { scaleY: 0.005, transformOrigin: 'bottom' });

        // make a tween that scales the loader
        const progressTween = gsap.to(progressBar, { paused: true, scaleX: 0, ease: 'none', transformOrigin: 'right' });

        // setup variables
        let loadedImageCount = 0, imageCount;
        const container = select('#main');

        // setup Images loaded
        const imgLoad = imagesLoaded(container);
        imageCount = imgLoad.images.length;

        // set the initial progress to 0
        updateProgress(0);

        // triggered after each item is loaded
        imgLoad.on('progress', function () {
            // increase the number of loaded images
            loadedImageCount++;
            // update progress
            updateProgress(loadedImageCount);
        });

        // update the progress of our progressBar tween
        function updateProgress(value) {
            gsap.to(progressTween, { progress: value / imageCount, duration: 0.3, ease: 'power1.out' });
        }

        // do whatever you want when all images are loaded
        imgLoad.on('done', function (instance) {
            // we will simply init our loader animation onComplete
            gsap.set(progressBar, {
                autoAlpha: 0,
                onComplete: () => {
                    tlLoader.play();
                    resolve();
                }
            });
        });
    });
}