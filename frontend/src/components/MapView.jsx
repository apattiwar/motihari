// // components/MapView.jsx
// import React, { useEffect } from 'react';
// // import { loadMapmyIndia } from '../utils/loadMapMyIndia';
// // import { loadMapmyIndia } from '../utils/loadMapmyIndia';

// loadMapmyIndia
// const MapView = () => {
//   useEffect(() => {
//     loadMapmyIndia()
//       .then((MapmyIndia) => {
//         const map = new MapmyIndia.Map('map', {
//           center: [28.61, 77.23],
//           zoom: 13,
//         });

//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const lat = position.coords.latitude;
//             const lon = position.coords.longitude;

//             new MapmyIndia.Marker({
//               position: [lat, lon],
//               map: map,
//               title: 'You are here!',
//             });

//             map.setView([lat, lon], 15);
//           },
//           (error) => {
//             console.error('Geolocation error:', error);
//           }
//         );
//       })
//       .catch((err) => {
//         console.error('Map SDK load error:', err);
//       });
//   }, []);

//   return (
//     <div
//       id="map"
//       style={{ width: '100%', height: '500px', border: '1px solid #ccc' }}
//     ></div>
//   );
// };

// export default MapView;
