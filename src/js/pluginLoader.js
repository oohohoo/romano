import plugins from './pluginRegistry.js';

export async function loadPlugin(pluginName, targetElement) {
  if (!plugins[pluginName]) {
    console.error(`Plugin ${pluginName} not found`);
    return;
  }

  const plugin = plugins[pluginName];

  if (plugin.css) {
    const cssFiles = Array.isArray(plugin.css) ? plugin.css : [plugin.css];
    cssFiles.forEach(cssFile => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssFile;
        document.head.appendChild(link);
    });
  }

  if (plugin.html) {
    const response = await fetch(plugin.html);
    const html = await response.text();
    targetElement.innerHTML = html;
  }

  if (plugin.js) {
    try {
      const SwiperModule = await plugin.js();
      let config = {};
      if (plugin.config) {
        const configModule = await plugin.config();
        config = configModule.default || configModule;
      }
      if (pluginName === 'swiper') {
        const swiperContainer = targetElement.querySelector('.swiper-container');
        if (!swiperContainer) {
          throw new Error('Swiper container not found');
        }
        // Use SwiperModule.default if it exists, otherwise use SwiperModule directly
        const Swiper = SwiperModule.default || SwiperModule;
        const swiper = new Swiper(swiperContainer, config);
        // Store the Swiper instance on the element for future reference
        targetElement.swiper = swiper;
      } else {
        SwiperModule.default.init(targetElement, config);
      }
    } catch (error) {
      console.error(`Error loading plugin ${pluginName}:`, error);
    }
  }
  
  if (plugin.onLoad) {
    plugin.onLoad(targetElement);
  }
}