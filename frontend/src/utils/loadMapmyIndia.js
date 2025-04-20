// utils/loadMapmyIndia.js
export const loadMapmyIndia = () =>
    new Promise((resolve, reject) => {
      if (window.MapmyIndia) {
        return resolve(window.MapmyIndia);
      }
  
      const script = document.createElement('script');
      script.src =
        'https://apis.mapmyindia.com/advancedmaps/v1/4bf5ac984ce22d0c8ce4b89e3b113aea/map_load?v=1.5';
      script.onload = () => resolve(window.MapmyIndia);
      script.onerror = () => reject('MapmyIndia SDK failed to load');
      document.body.appendChild(script);
    });
  