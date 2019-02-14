import container from "./Container";
import CONSTANTS from "./Constants";

export default function Wrapper(target, inject) {
  return class extends target {
    constructor(...args) {
      super(...args);
      populateInjectedFields(inject);
      Object.defineProperty(this, "name", {
        value: `${CONSTANTS.WRAPPED_CLASS_PREFIX}_${target.name}`
      });
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
