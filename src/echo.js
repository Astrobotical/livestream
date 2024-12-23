// echo.js
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

export const echo = new Echo({
  broadcaster: 'pusher',
  key: 'e997cc8249e3376f97b2',  // Replace with your Pusher key
  cluster: 'us2',  // Replace with your Pusher cluster
  forceTLS: 'false',
});