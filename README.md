# nexus-di

A simple and powerful IoC container for JavaScript, without the tears.

## About

nexus-di is a lightweight inversion of control (IoC) container for JavaScript apps, it works by creating proxies of the classes and using the configuration object passed to the container to identify and inject the dependencies to the proxy.

nexus-di has a friendly API and makes it easy to decouple your classes by using the dependency inversion principle and dependency injection.

## Installation

You can get the latest release and the type definitions using npm:

```
$ npm install --save nexus-di
```

## The Basics

Let’s take a look at the basic usage and APIs of nexus-di:

When using nexus-di there are two ways to register a class, the first one is through the use of the `@Injectable()` decorator, the second one is through the use of a method in the container called `register()`, we are going to use both ways to register the classes.

Let's start by declaring some classes to be configured by the use of the `register()` method.

```js
// file Katana.js

class Katana {
  constructor() {
    this.name = "katana";
  }
}
module.exports = Katana;
```

```js
// file Shuriken.js

class Shuriken {
  constructor() {
    this.name = "shuriken";
  }
}

module.exports = Shuriken;
```

> **Note**: these classes are plain JavaScript classes, the configuration of those classes will be done when we are setting up the container..

Let's register those classes.

```js
//file containerConfig.js

const { container, SCOPES } = require("nexus-di");
const Katana = require("./Katana");
const Shuriken = require("./Shuriken");

container
  .register(Katana, {
    scope: SCOPES.PROTOTYPE,
    provider: (proxy, container) => new proxy(),
    inject: { weapon: Katana, shield: "SHIELD" }
  })
  .register(Shuriken, {
    scope: SCOPES.PROTOTYPE,
    provider: (proxy, container) => new proxy(),
    inject: { weapon: Katana, shield: "SHIELD" }
  })
  .registerObject({
    key: "SHIELD",
    provider: container => ({ name: "shield", armor: 15 }),
    scope: SCOPES.SINGLETON
  });

module.exports = container;
```

The container makes use of the fluent interface design pattern which allows for chained calls to the container, the register method takes the class itself and object configuration, also note that we made use of `registerObject()` this method is useful when you want to register an object/function in the container.

### The object configuration

Both the `register()` and`@Injectable()` methods takes an object configuration with three properties: scope, provider and inject.

**scope:** scope lets the container know how you want the life cycle of this class to be.
The default is SCOPES.PROTOTYPE.

SCOPES.SINGLETON – Return a single instance per nexus-di IoC container.
SCOPES.PROTOTYPE – Return a new instance each time when requested from the container.

**provider:** provider is a function that the container calls to instantiate the class, it receives as parameters the proxy of this class (with all the dependencies already injected) and the container itself.
The default is `p => new p()`.

**inject:** inject is an object witch the container uses to declare and populate the injected properties, it uses the keys of the object as property name and the value as the key to get the instance from the container.

Now we are going to declare some classes to be configured using the `@Injectable()` decorator.

```js
// file Samurai.js

let { Injectable, SCOPES } = require("nexus-di");

const Katana = require("./Katana");

@Injectable({
  scope: SCOPES.PROTOTYPE,
  provider: (proxy, container) => new proxy(),
  inject: { weapon: Katana, shield: "SHIELD" }
})
class Samurai {
  constructor() {
    this.name = "samurai";
  }

  toString() {
    return `${this.name} fighting with ${this.weapon.name} and ${
      this.shield.name
    } that gives ${this.shield.armor} points of armor`;
  }
}

module.exports = Samurai;
```

```js
// file Ninja.js

const { Injectable, SCOPES } = require("nexus-di");

const Shuriken = require("./Shuriken");

@Injectable({
  inject: { weapon: Shuriken, shield: "SHIELD" },
  scope: SCOPES.SINGLETON
})
class Ninja {
  constructor() {
    this.name = "ninja";
  }

  toString() {
    return `${this.name} fighting with ${this.weapon.name} and ${
      this.shield.name
    } that gives ${this.shield.armor} points of armor`;
  }
}

module.exports = Ninja;
```

```js
// file Battle.js

const { Injectable, SCOPES } = require("nexus-di");

const Ninja = require("./Ninja");
const Samurai = require("./Samurai");

@Injectable({
  inject: { firstWarrior: Ninja, secondWarrior: Samurai },
  scope: SCOPES.SINGLETON
})
class Battle {
  fight() {
    return `${this.firstWarrior.toString()}\n vs \n${this.secondWarrior.toString()}`;
  }
}

module.exports = Battle;
```

Now we just require the container from `containerConfig.js` and then we get the instance that we want from the container with `getInstance()` like so:

```js
// file index.js

const container = require("./containerConfig");
const Battle = require("./Battle");
const battle = container.getInstance(Battle);
console.log(battle.fight());
```

if you run this you should see the following in console:

```
ninja fighting with shuriken and shield that gives 15 points of armor
 vs
samurai fighting with katana and shield that gives 15 points of armor
```

For more on how to use nexus-di visit the following projects:

[nexus-di-basic-react-example](https://github.com/danillosl/nexus-di-basic-react-example) on how to use nexus-di with react and redux.
[nexus-di-basic-node-example](https://github.com/danillosl/nexus-di-basic-node-example) on how to use nexus-di with node.
