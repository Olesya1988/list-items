class EventEmitter {
    constructor() {
      this.events = {};
    }

    // подписка на события
    on(eventName, callback) {
      !this.events[eventName] && (this.events[eventName] = []);
      this.events[eventName].push(callback);
    }

    // удаление подписки
    off(eventName, callback) {
      this.events[eventName] = this.events[eventName].filter(eventCallback => callback !== eventCallback);
    }

    // испускание события
    emit(eventName, args) {
      const event = this.events[eventName];
      event && event.forEach(callback => callback.call(null, args));
    }
  }

  const emitter = new EventEmitter();

  // Подписка
  const logData = (data) => console.log(data);
  emitter.on('data', logData);

  // Испускание события
  emitter.emit('data', { message: 'Hello, world!' });

  // Удаление конкретного обработчика
  emitter.off('data', logData);