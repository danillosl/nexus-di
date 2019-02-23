const container = require("./Container");

let Injectable = (config = {}) => {
  return target => {
    container.register(target, config);
    return target;
  };
};

module.exports = Injectable;
