import CONSTANTS from "./Constants";

class Container {
  constructor() {
    this.services = {};
  }

  register(componentID, clazz, provider) {
    Object.defineProperty(this, componentID, {
      get: () => {
        if (!this.services.hasOwnProperty(componentID)) {
          this.services[componentID] = provider(clazz, this);
        }

        return this.services[componentID];
      },
      configurable: true,
      enumerable: true
    });

    return this;
  }

  getInstance(clazz) {
    return this[clazz[CONSTANTS.CLASS_METADATA_NAME].id];
  }
}

export default new Container();
