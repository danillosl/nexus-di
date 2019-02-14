const container = require("./Container");
const Wrapper = require("./Wrapper");
const CONSTANTS = require("./Constants");
const UUID = require("./UUID");

let Injectable = ({ inject = [], provider = c => c } = {}) => {
  return target => {
    const clazz = Wrapper(target, inject);

    clazz[CONSTANTS.CLASS_METADATA_NAME] = {
      name: target.name,
      id: UUID()
    };

    Object.defineProperty(clazz, "name", {
      value: `${CONSTANTS.WRAPPED_CLASS_PREFIX}_${target.name}`
    });

    container.register(
      clazz[CONSTANTS.CLASS_METADATA_NAME].id,
      clazz,
      provider
    );

    window.clazz = clazz;

    return clazz;
  };
};

module.exports = Injectable;
