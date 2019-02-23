const container = require("./Container");

let Injectable = (classConfig = {}) => {
  return target => {
    classConfig.target = target;
    container.register(classConfig);
    return target;
  };
};

module.exports = Injectable;
