class EventEmitter {
  constructor() {
    this.listeners = [];
  }

  emit(event, data) {
    const timestamp = new Date()
      .toISOString()
      .replace("T", " ")
      .substring(0, 19);

    console.log(`[${timestamp}] EVENT: ${event} — ${JSON.stringify(data)}`);

    this.listeners.forEach((listener) => {
      if (listener?.event === event || listener?.event === "*") {
        listener?.callback(data);
      }
    });
  }

  on(event, callback) {
    this.listeners?.push({ event, callback });
  }
}

export default new EventEmitter();
