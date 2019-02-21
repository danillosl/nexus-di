const Scopes = require("./Scopes");

class InjectableFactory {
  constructor(proxy, provider, scope = Scopes.PROTOTYPE, container) {
    this.proxy = proxy;
    this._provider = provider;
    this.scope = scope;
    this.container = container;
    this.singletonInstance = null;
  }

  getInstance() {
    window.injectable = this;
    switch (this.scope) {
      case Scopes.PROTOTYPE:
        return this._provider(this.proxy, this.container);

      case Scopes.SINGLETON:
        if (!this.singletonInstance) {
          this.singletonInstance = this._provider(this.proxy, this.container);
        }
        return this.singletonInstance;

      default:
        throw `Scope ${this.scope} is not valid!`;
    }
  }

  set provider(provider) {
    this._provider = provider;
  }
}

module.exports = InjectableFactory;
