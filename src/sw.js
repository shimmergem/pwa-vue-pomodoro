var cacheName = 'bs-0-2-0';
var apiCacheName = 'api-0-1-1';
var cacheFiles = [
    '/',
    './bundle.js',
    './index.html',
];

// 监听install事件，安装完成后，进行文件缓存
// self.addEventListener('install', function (e) {
//     console.log('Service Worker 状态： install');
//     var cacheOpenPromise = caches.open(cacheName).then(function (cache) {
//         return cache.addAll(cacheFiles);
//     });
//     e.waitUntil(cacheOpenPromise);
// });

// 监听activate事件，激活后通过cache的key来判断是否更新cache中的静态资源
// self.addEventListener('activate', function (e) {
//     console.log('Service Worker 状态： activate');
//     var cachePromise = caches.keys().then(function (keys) {
//         return Promise.all(keys.map(function (key) {
//             if (key !== cacheName && key !== apiCacheName) {
//                 return caches.delete(key);
//             }
//         }));
//     })
//     e.waitUntil(cachePromise);
//     // 注意不能忽略这行代码，否则第一次加载会导致fetch事件不触发
//     return self.clients.claim();
// });

self.addEventListener('fetch', function (e) {});

/* ============== */
/* push处理相关部分 */
/* ============== */
// 添加service worker对push的监听
// self.addEventListener('push', function (e) {
//     var data = e.data;
//     if (e.data) {
//         data = data.json();
//         console.log('push的数据为：', data);
//         self.registration.showNotification(data.text);        
//     } 
//     else {
//         console.log('push没有任何数据');
//     }
// });
/* ============== */

self.addEventListener('notificationclick', (e) => {
    let action = e.action
})