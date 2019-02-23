function createProxy(target, inject, container) {
  return class extends target {
    constructor(...args) {
      super(...args);
      populateInjectableProperties.call(this, inject, container);
    }
  };
}

function populateInjectableProperties(inject, container) {
  for (let key in inject) {
    Object.defineProperty(this, key, {
      get: () => container.getInstance(inject[key]),
      configurable: true,
      enumerable: true
    });
  }
}

module.exports = createProxy;
