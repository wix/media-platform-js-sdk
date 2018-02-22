import {Source} from '../job/source';

/**
 * @constructor
 */

class Invocation {
  constructor(data) {


    /**
     * @type {Source[]}
     * @type {null}
     */
    this.sources = [];

    /**
     * @type {[]}
     */
    this.entryPoints = null;

    if (data) {
      this.deserialize(data);
    }
  }


  /**
   *
   * @param sources
   * @returns {Invocation}
   */
  setSources(sources) {

    this.sources = sources;
    return this;
  }


  /**
   * @param source
   * @returns {Invocation}
   */
  addSource(source) {

    if (!this.sources) {
      this.sources = [];
    }

    this.sources.push(source);
    return this;
  }


  /**
   *
   * @param entryPoints
   * @returns {Invocation}
   */
  setEntryPoints(entryPoints) {

    this.entryPoints = entryPoints;
    return this;
  }


  /**
   * @param entryPoint
   * @returns {Invocation}
   */
  addEntryPoint(entryPoint) {

    if (!this.entryPoints) {
      this.entryPoints = [];
    }

    this.entryPoints.push(entryPoint);
    return this;
  }


  /**
   * @param data
   * @private
   */
  deserialize(data) {

    this.sources = [];
    for (var i in data.sources) {
      this.sources[i] = new Source(data.sources[i]);
    }
    this.entryPoints = data.entryPoints;
  }

}


/**
 * @type {Invocation}
 */
export default Invocation;
export {Invocation};



