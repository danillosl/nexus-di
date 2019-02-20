class Container {
  constructor() {
    this.services = new Map();
  }

  register(clazz, injectableFactory) {
    this.services.set(clazz, injectableFactory);
    return this;
  }

  getInstance(clazz) {
    return this.services.get(clazz).getInstance();
  }

  setProvider(clazz, provider) {
    this.services.get(clazz).setProvider(provider);
  }
}

module.exports = new Container();
