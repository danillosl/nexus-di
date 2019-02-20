const container = require("./Container");

function createProxy(target, inject) {
  return class extends target {
    constructor(...args) {
      super(...args);
      populateInjectedFields.call(this, inject);
    }
  };
}

function populateInjectedFields(inject) {
  inject.forEach(dependency => {
    Object.defineProperty(this, dependency.name, {
      get: () => container.getInstance(dependency),
      configurable: true,
      enumerable: true
    });
  });
}

module.exports = createProxy;
