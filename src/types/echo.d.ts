declare module 'laravel-echo' {
    import Echo from 'laravel-echo';
    export default Echo;
  }
  
  declare module 'pusher-js' {
    export default class Pusher {
      constructor(key: string, options?: any);
    }
  }