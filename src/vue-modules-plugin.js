// @flow

/**
 * @licence MIT
 * @author Michal Doubek <michal@doubkovi.cz>
 * @see https://github.com/sarkasmus/vue-modules-plugin
 *
 * For more information go to the README.md or on the Github wiki.
 * If you find out a bug or another issue, something what is getting wrong, add issue
 * into the Github issue tracker.
 * */

import ModuleParser from './module-parser'
import type VueType from 'vue'

/**
 * Plugin, which allow us to make modules and access them in vue components. This plugin can be extremely helpful
 * in large applications, or when component has more than responsibility and we want to have cleaner code.
 *
 * @module vue-modules-plugin
 * */
export default {
  /**
   * Install method.
   *
   * @param {Object} Vue - The view instance.
   * @return {undefined}
   * */
  install: function (Vue: VueType) {
    Vue.prototype.$moduleParser = new ModuleParser()

    Vue.mixin({
      /**
       * Initializes modules before component created.
       *
       * @return {undefined}
       * */
      beforeCreate (): void {
        for (let module in this.$options.modules) {
          if (Object.prototype.hasOwnProperty.call(this.$options.modules, module)) {
            module = this.$options.modules[module]

            this[module.name] = this.$moduleParser.parse(module)
          }
        }
      },

      created (): void {
        for (let module in this.$options.modules) {
          if (Object.prototype.hasOwnProperty.call(this.$options.modules, module)) {
            module = this.$options.modules[module]

            this[module.name].$store = this.$store === undefined ? undefined : this.$store
            this[module.name].$route = this.$route === undefined ? undefined : this.$route
            this[module.name].$emit = this.$emit
            this[module.name].$component = this

          }
        }
      }
    })

    /**
     * Adds module on runtime of the component.
     *
     * @param {Object} module - Module to add.
     * @return {undefined}
     * */
    Vue.prototype.$addModule = function (module: Object): void {
      this[module.name] = this.$moduleParser.parse(module)
    }

    /**
     * Removes module from runtime of the component.
     *
     * @param {string} moduleName - Module to remove.
     * @return {undefined}
     * */
    Vue.prototype.$removeModule = function (moduleName: string): void {
      delete this[moduleName]
    }
  }
}
