const Scopes = require("./Scopes");

class InjectableFactory {
  constructor(provider, scope, container) {
    //makes shure that only the subclasses can be instantiated.
    if (new.target === InjectableFactory) {
      throw new TypeError("InjectableFactory cannot be instantiated");
    }
    //makes shure subclasses implement createInstance method
    if (typeof this.createInstance === "undefined") {
      throw new TypeError("Must override method createInstance");
    }
    this._provider = provider;
    this.scope = scope;
    this.container = container;
    this.singletonInstance = null;
  }

  getInstance() {
    switch (this.scope) {
      case Scopes.PROTOTYPE:
        return this.createInstance();

      case Scopes.SINGLETON:
        if (!this.singletonInstance) {
          this.singletonInstance = this.createInstance();
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
