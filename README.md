## What is it?
It is a lightweight plugin, which allows us to divide component code into modules.
Every module looks like just a mixin, with some special features and limitations.
Every module is encapsulated. This keyword refers to the module,
but you can access the component by the $component property. You also have a reference to the $store, $route and
$emit. In component JS you can access module by this.moduleName.method(). Same in the component’s template.

## Why should I use it?
When you build a large application, you need to use modularization and clear patterns to keep the code quality. As well as Vuex supports modularization of the store, I (and maybe you so) missed the feature of modularization of components. Sometimes the component has more than 1 responsibility and breaks S(RP)OLID, but it is clear to do it this way. In that case, it would be very useful to divide component into small parts.
## Why we can’t define props in the modules?
Modules are something between dependency and component itself. Reactive properties are members of Vue component, not a module and if you assign them from parent component, it would be breaking the law of Demeter. So if you need to work with properties, use $parent property or inject it into the module from the component.

## Installation
Installation is easy as much as possible with npm:
```
$ npm install vue-modules-plugin
```

## Usage

Creating a module is similar to create a Vue mixin. Just create a new file and make a new JS module like this:

```javascript
export default {
  name: 'moduleName',

  computed: {
    prop () {
      return 'value'
    },
    
    prop2: {
      get () {
        return ...
      },
      
      set (value) {
        ...
      }
    }
  },
  
  data () {
    return {
      ...
    }
  },
  
  methods: {
    emitAnEvent () {
      // work with $emit like in normal mixin.
      this.$emit('event-name')
    },
    
    saveValueIntoTheVuexStore () {
      this.$store.dispatch(...)
    }
  }
}
```

Now we have to import this module into the component:
```javascript
import Module from ...

export default {
  name: 'componentName',
  modules: [
    Module
  ],
  
  methods: {
    someMethod () {
      // Use modules...
      let someVar = this.moduleName.method()
    }
  }
}
```
Thats it. Easy peasy :)

## Limitations
There are some issues which limits the usage of this plugin. This example causes an error:

**component:**
```html
<template>
  <button @click="module.emitEvent"></button>
</template>
```
**module:**
```javascript
export default {
  methods: {
    emitEvent() {
      // This causes error, because `this` does not reference to the module object.
      this.$emit('clicked')
    }
  }
}
```

For fixing it just change the template event code to: `@click="module.emitEvent()"` - add brackets.

If your method accepts arguments from emit call edit it to: `@click="module.handleEvent($event)"` and use payload in the emit call: `this.$emit('event-name', {...})`
