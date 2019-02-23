const SCOPES = require("./Scopes");
const createProxy = require("./CreateProxy");
const InjectableClassFactory = require("./InjectableClassFactory");
const InjectableObjectFactory = require("./InjectableObjectFactory");

class Container {
  constructor() {
    this.services = new Map();
  }

  register({
    target,
    inject = {},
    provider = p => new p(),
    scope = SCOPES.PROTOTYPE
  }) {
    const proxy = createProxy(target, inject, this);
    const injectableFactory = new InjectableClassFactory(
      proxy,
      provider,
      scope,
      this
    );
    this.services.set(target, injectableFactory);
    return this;
  }

  registerObject({ key, provider, scope = SCOPES.PROTOTYPE }) {
    const injectableFactory = new InjectableObjectFactory(
      provider,
      scope,
      this
    );
    this.services.set(key, injectableFactory);
    return this;
  }

  getInstance(key) {
    return this.services.get(key).getInstance();
  }

  setProvider(key, provider) {
    this.services.get(key).provider = provider;
    return this;
  }
}

module.exports = new Container();
