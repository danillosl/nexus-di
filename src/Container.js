const InjectableFactory = require("./InjectableFactory");

class Container {
  constructor() {
    this.services = new Map();
  }

  _register(clazz, injectableFactory) {
    this.services.set(clazz, injectableFactory);
    return this;
  }

  register(clazz, provider, scope) {
    const injectableFactory = new InjectableFactory(
      clazz,
      provider,
      scope,
      this
    );
    this.services.set(clazz, injectableFactory);
    return this;
  }

  getInstance(clazz) {
    return this.services.get(clazz).getInstance();
  }

  setProvider(clazz, provider) {
    this.services.get(clazz).provider = provider;
    return this;
  }
}

module.exports = new Container();
