import { gsap } from 'gsap';
import { select, selectAll, getTextHeight } from '../utils/helpers.js';




const updateBodyColor = (color) => {
    document.documentElement.style.setProperty('--bcg-fill-color', color);
}


export function initHeaderTilt() {
    select('header').addEventListener('mousemove', moveImages);
}

function moveImages(e) {
    const { offsetX, offsetY, target } = e;
    const { clientWidth, clientHeight } = target;

    const xPos = (offsetX / clientWidth) - 0.5;
    const yPos = (offsetY / clientHeight) - 0.5;

    const leftImages = gsap.utils.toArray('.hg__left .hg__image');
    const rightImages = gsap.utils.toArray('.hg__right .hg__image');

    const modifier = (index) => index * 1.2 + 0.5;

    leftImages.forEach((image, index) => {
        gsap.to(image, {
            duration: 1.2,
            x: xPos * 20 * modifier(index),
            y: yPos * 30 * modifier(index),
            rotationY: xPos * 40,
            rotationX: yPos * 10,
            ease: 'power3.out'
        });
    });

    rightImages.forEach((image, index) => {
        gsap.to(image, {
            duration: 1.2,
            x: xPos * 20 * modifier(index),
            y: -yPos * 30 * modifier(index),
            rotationY: xPos * 40,
            rotationX: yPos * 10,
            ease: 'power3.out'
        });
    });

    gsap.to('.decor__circle', {
        duration: 1.7,
        x: 100 * xPos,
        y: 120 * yPos,
        ease: 'power4.out'
    });
}

export function initHoverReveal() {
    const sections = selectAll('.rg__column');

    sections.forEach(section => {
        section.imageBlock = section.querySelector('.rg__image');
        section.image = section.querySelector('.rg__image img');
        section.mask = section.querySelector('.rg__image--mask');
        section.text = section.querySelector('.rg__text');
        section.textCopy = section.querySelector('.rg__text--copy');
        section.textMask = section.querySelector('.rg__text--mask');
        section.textP = section.querySelector('.rg__text--copy p');

        gsap.set([section.imageBlock, section.textMask], { yPercent: -101 });
        gsap.set([section.mask, section.textP], { yPercent: 100 });
        gsap.set(section.image, { scale: 1.2 });

        section.addEventListener('mouseenter', createHoverReveal);
        section.addEventListener('mouseleave', createHoverReveal);
    });
}

function createHoverReveal(e) {
    const { imageBlock, mask, text, textCopy, textMask, textP, image, dataset } = e.target;
    const { color } = dataset;

    let tl = gsap.timeline({
        defaults: {
            duration: 1.8,
            ease: 'power4.out'
        }
    });

    if (e.type === 'mouseenter') {
        tl
            .to([mask, imageBlock, textMask, textP], {
                yPercent: 0,
                onStart: () => updateBodyColor(color)
            })
            .to(text, { y: () => -getTextHeight(textCopy) / 2 }, 0)
            .to(image, { duration: 1.1, scale: 1 }, 0);
    } else if (e.type === 'mouseleave') {
        tl
            .to([mask, textP], { yPercent: 100 })
            .to([imageBlock, textMask], { yPercent: -101 }, 0)
            .to(text, { y: 0 }, 0)
            .to(image, { scale: 1.2 }, 0);
    }

    return tl;
}

export function initPortfolioHover() {
    const allLinks = gsap.utils.toArray('.portfolio__categories a');
    const pageBackground = select('.fill-background');
    const largeImage = select('.portfolio__image--l');
    const smallImage = select('.portfolio__image--s');
    const lInside = select('.portfolio__image--l .image_inside');
    const sInside = select('.portfolio__image--s .image_inside');

    allLinks.forEach(link => {
        link.addEventListener('mouseenter', createPortfolioHover);
        link.addEventListener('mouseleave', createPortfolioHover);
        link.addEventListener('mousemove', createPortfolioMove);
    });

    function createPortfolioHover(e) {
        if (e.type === 'mouseenter') {
            const { color, imagelarge, imagesmall } = e.target.dataset;
            const allSiblings = allLinks.filter(item => item !== e.target);
            const tl = gsap.timeline({
                onStart: () => updateBodyColor(color)
            });
            tl
                .set(lInside, { backgroundImage: `url(${imagelarge})` })
                .set(sInside, { backgroundImage: `url(${imagesmall})` })
                .to([largeImage, smallImage], { autoAlpha: 1 })
                .to(allSiblings, { color: '#fff', autoAlpha: 0.2 }, 0)
                .to(e.target, { color: '#fff', autoAlpha: 1 }, 0);
        } else if (e.type === 'mouseleave') {
            const tl = gsap.timeline({
                onStart: () => updateBodyColor('#ACB7AE')
            });
            tl
                .to([largeImage, smallImage], { autoAlpha: 0 })
                .to(allLinks, { color: '#000000', autoAlpha: 1 }, 0);
        }
    }

    function createPortfolioMove(e) {
        const { clientY } = e;
        gsap.to(largeImage, {
            duration: 1.2,
            y: getPortfolioOffset(clientY) / 6,
            ease: 'power3.out'
        });
        gsap.to(smallImage, {
            duration: 1.5,
            y: getPortfolioOffset(clientY) / 3,
            ease: 'power3.out'
        });
    }

    function getPortfolioOffset(clientY) {
        return -(select('.portfolio__categories').clientHeight - clientY);
    }
}

export function initImageParallax() {
    gsap.utils.toArray('.with-parallax').forEach(section => {
        const image = section.querySelector('img');
        gsap.to(image, {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                scrub: true
            }
        });
    });
}



