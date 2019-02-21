const container = require("./Container");
const createProxy = require("./CreateProxy");
const Scopes = require("./Scopes");
const InjectableFactory = require("./InjectableFactory");

let Injectable = ({
  inject = [],
  provider = c => c,
  scope = Scopes.PROTOTYPE
} = {}) => {
  return target => {
    const proxy = createProxy(target, inject);

    const injectableFactory = new InjectableFactory(
      proxy,
      provider,
      scope,
      container
    );
    container._register(target, injectableFactory);
    return target;
  };
};

module.exports = Injectable;
