const plugins = {
  /*   accordion: {
      js: () => import('./components/accordion/accordion.js'),
      css: '/components/accordion/accordion.css',
      html: '/components/accordion/accordion.html',
      config: () => import('./components/accordion/accordion.config.js')
    }, */
    swiper: {
        js: () => import('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'),
        css: [
            'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
            '/js/components/swiper/swiper.css'
        ],
        html: '/js/components/swiper/swiper.html',
        config: () => import('./components/swiper/swiper.config.js'),
        onLoad: (element) => {
            console.log('Swiper initialized in', element);
        }
    }
  };
  
  export default plugins;

