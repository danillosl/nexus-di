import container from "./Container";
import UUID from "./UUID";
import Wrapper from "./Wrapper";
import CONSTANTS from "./Constants";

const DEFAULT_CONFIG = {
  inject: [],
  provider: c => c
};

let Injectable = ({ inject, provider } = DEFAULT_CONFIG) => {
  return target => {
    const clazz = Wrapper(target, inject);

    clazz[CONSTANTS.CLASS_METADATA_NAME] = {
      name: target.name,
      id: UUID()
    };

    container.register(
      clazz[CONSTANTS.CLASS_METADATA_NAME].id,
      clazz,
      provider
    );

    return clazz;
  };
};

export default Injectable;
