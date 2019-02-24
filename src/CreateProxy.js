function createProxy(target, inject, container) {
  return class extends target {
    constructor(...args) {
      super(...args);
      populateInjectableProperties.call(this, inject, container);
    }
  };
}

function populateInjectableProperties(inject, container) {
  Object.defineProperty(this, "NEXUS_DI_DEPENDENCIES", {
    enumerable: false,
    configurable: false,
    writable: false,
    value: {}
  });

  for (let key in inject) {
    Object.defineProperty(this, key, {
      get: () => {
        if (!this.NEXUS_DI_DEPENDENCIES[key]) {
          this.NEXUS_DI_DEPENDENCIES[key] = container.getInstance(inject[key]);
        }
        return this.NEXUS_DI_DEPENDENCIES[key];
      },
      configurable: true,
      enumerable: true
    });
  }
}

module.exports = createProxy;
