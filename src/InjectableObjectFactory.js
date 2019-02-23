const Scopes = require("./Scopes");
const InjectableFactory = require("./InjectableFactory");

class InjectableClassFactory extends InjectableFactory {
  constructor(provider, scope, container) {
    super(provider, scope, container);
  }

  createInstance() {
    return this._provider(this.container);
  }
}

module.exports = InjectableClassFactory;
