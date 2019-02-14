const container = require("./Container");
const CONSTANTS = require("./Constants");

function Wrapper(target, inject) {
  return class extends target {
    constructor(...args) {
      super(...args);
      populateInjectedFields.call(this, inject);
    }
  };
}

function populateInjectedFields(inject) {
  inject.forEach(dependency => {
    const metadata = dependency[CONSTANTS.CLASS_METADATA_NAME];
    Object.defineProperty(this, metadata.name, {
      get: () => container[metadata.id],
      configurable: true,
      enumerable: true
    });
  });
}

module.exports = Wrapper;
