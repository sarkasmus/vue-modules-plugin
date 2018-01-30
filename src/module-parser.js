// @flow

/**
 * @licence MIT
 * @author Michal "MOaklet" Doubek <michal@doubkovi.cz>
 * @see https://github.com/sarkasmus/vue-modules-plugin
 *
 * For more information go to the README.md or on the Github wiki.
 * If you find out a bug or another issue, something what is getting wrong, add issue
 * into the Github issue tracker.
 * */

import ErrorGenerator from './error-generator'

/**
 * Class which serves as a parser for module objects. This class makes from objects added into modules: []
 * prop parts of the Vue object like module: {name: 'module', ...} creates a vue.module object, which
 * contains other members.
 *
 * @class
 * */
export default class {
  /**
   * Result module object, this will be injected to the Vue component.
   * @property {Object} moduleObject
   * */
  moduleObject: Object

  /**
   * Module template. This object is parsed into the moduleObject.
   * @property {Object} module
   * */
  module: Object

  /**
   * This dependency generates error getters/setters. For more information check out this file.
   * @property {ErrorGenerator} errorGenerator
   * */
  errorGenerator: ErrorGenerator

  /**
   * Constructor. Injects dependency.
   * */
  constructor () {
    this.errorGenerator = new ErrorGenerator()
  }

  /**
   * This method is only method, which should be called from outside. It parses an module object and
   * returns result module object.
   *
   * @param {Object} module - Module to parse
   * @return {Object} moduleObject property.
   * */
  parse (module: Object): Object {
    this.moduleObject = {
      $store: null,
      $route: null
    }
    this.module = module

    // Parsing pipeline.
    this.parseMethods()
      .parseComputed()
      .parseData()

    return this.moduleObject
  }

  /* eslint complexity: off */ // Complexity is 6 but it is more descriptive if written like this.
  /**
   * Parses computed properties.
   *
   * @return {Object} this.
   * */
  parseComputed (): this {
    for (let computed in this.module.computed) {
      if (Object.prototype.hasOwnProperty.call(this.module.computed, computed)) {
        let computedFunc: Function | Object = this.module.computed[computed]

        if (typeof computedFunc === 'object') {
          Object.defineProperty(this.moduleObject, computed, {
            get: computedFunc.get === undefined ? this.errorGenerator.getErrorGetter(computed) : computedFunc.get,
            set: computedFunc.set === undefined ? this.errorGenerator.getErrorSetter(computed) : computedFunc.set
          })

        } else {
          Object.defineProperty(this.moduleObject, computed, {
            get: computedFunc
          })

        }

      }
    }

    return this
  }

  /**
   * Parses methods.
   *
   * @return {Object} this.
   * */
  parseMethods (): this {
    for (let method in this.module.methods) {
      if (Object.prototype.hasOwnProperty.call(this.module.methods, method)) {
        this.moduleObject[method] = this.module.methods[method]
      }
    }

    return this
  }

  /**
   * Parses data.
   *
   * @return {Object} this.
   * */
  parseData (): this {
    for (let data in this.module.data()) {
      if (Object.prototype.hasOwnProperty.call(this.module.data(), data)) {
        try {
          this.moduleObject[data] = this.module.data()[data]
        } catch (e) {
          throw new Error('dssddsdssd')
        }
      }
    }

    return this
  }
}
