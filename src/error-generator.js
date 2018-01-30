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


/**
 * Class which provides two functions which are called as setters/getters when real setter/getter is not defined.
 * It is used when user defines in component module a computed property as object and defines only one of them.
 *
 * eg:
 *
 * @example
 * computed: {
 *   prop: {
 *     get () {
 *       // ...
 *     }
 *
 *     // setter is missing.
 *   }
 * }
 * @class ErrorGenerator
 * */
export default class ErrorGenerator {
  /**
   * Returns a setter which throws an error.
   *
   * @param {string} propName - Name of the computed property which is affected.
   * @return {Function} Setter
   * */
  getErrorSetter (propName: string): Function {
    return function () {
      throw new Error(`(Vue modules plugin): Error: Setter has not been defined in computed property ${propName}`)
    }
  }

  /**
   * Returns a getter which throws an error.
   *
   * @param {string} propName - Name of the computed property which is affected.
   * @return {Function} Getter
   * */
  getErrorGetter (propName: string): Function {
    return function () {
      throw new Error(propName)
    }
  }
}
