import {Source} from '../job/source';

/**
 * @constructor
 */
function Invocation(data) {

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
Invocation.prototype.setSources = function (sources) {
  this.sources = sources;
  return this;
};

/**
 * @param source
 * @returns {Invocation}
 */
Invocation.prototype.addSource = function (source) {
  if (!this.sources) {
    this.sources = [];
  }

  this.sources.push(source);
  return this;
};

/**
 *
 * @param entryPoints
 * @returns {Invocation}
 */
Invocation.prototype.setEntryPoints = function (entryPoints) {
  this.entryPoints = entryPoints;
  return this;
};

/**
 * @param entryPoint
 * @returns {Invocation}
 */
Invocation.prototype.addEntryPoint = function (entryPoint) {
  if (!this.entryPoints) {
    this.entryPoints = [];
  }

  this.entryPoints.push(entryPoint);
  return this;
};

/**
 * @param data
 * @private
 */
Invocation.prototype.deserialize = function (data) {
  this.sources = [];
  for (var i in data.sources) {
    this.sources[i] = new Source(data.sources[i]);
  }
  this.entryPoints = data.entryPoints;
};

/**
 * @type {Invocation}
 */
export default Invocation;
export {Invocation};



