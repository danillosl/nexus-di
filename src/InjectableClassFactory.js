const Scopes = require("./Scopes");
const InjectableFactory = require("./InjectableFactory");

class InjectableClassFactory extends InjectableFactory {
  constructor(proxy, provider, scope, container) {
    super(provider, scope, container);
    this.proxy = proxy;
  }

  createInstance() {
    return this._provider(this.proxy, this.container);
  }
}

module.exports = InjectableClassFactory;
