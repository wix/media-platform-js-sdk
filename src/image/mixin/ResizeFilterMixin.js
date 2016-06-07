/**
 * Created by elad on 06/06/2016.
 */

/**
 * @summary Resize filters for use with resize operations
 * @readonly
 * @enum
 */
var ResizeFilters = {
        POINT: 1,
        BOX: 2,
        TRIANGLE: 3,
        HERMITE: 4,
        HANNING: 5,
        HAMMING: 6,
        BLACKMAN: 7,
        GAUSSIAN: 8,
        QUADRATIC: 9,
        CUBIC: 10,
        CATROM: 11,
        MITCHELL: 12,
        JINC: 13,
        SINC: 14,
        SINC_FAST: 15,
        KAISER: 16,
        WELCH: 17,
        PARZEN: 18,
        BOHMAN: 19,
        BARTLETT: 20,
        LAGRANGE: 21,
        LANCZOS: 22,
        LANCZOS_SHARP: 23,
        LANCZOS2: 24,
        LANCZOS2_SHARP: 25,
        ROBIDOUX: 26,
        ROBIDOUX_SHARP: 27,
        COSINE: 28
};

/**
 * @summary Provides methods used for operation APIs. It's not meant to be used directly.
 * @mixin
 */
function ResizeFilterMixin(transformations) {
    this.transformations = transformations;
}

/**
 * //TODO: use keys instead of values!
 * @summary The resize filter
 * @param {number} rf the filter to use, from {@link Defaults#ResizeFilters}
 * @returns {ResizeFilterMixin} the operation
 */
ResizeFilterMixin.prototype.resizeFilter = function (rf) {
    this.transformations.rf = rf;
    return this;
};

/**
 * @summary An alias for `resizeFill`
 * @name rf
 * @function
 * @returns {ResizeFilterMixin} the operation
 */
ResizeFilterMixin.prototype.rf = ResizeFilterMixin.prototype.resizeFilter;

/**
 * @summary Enable image proportional upscaling. Optional values: [0/1] (0 = no upscaling).
 * @param {number} lg
 * @returns {ResizeFilterMixin} the operation
 */
ResizeFilterMixin.prototype.lg = function (lg) {
    this.transformations.lg = !!lg ? 1 : 0;
    return this;
};

module.exports = ResizeFilterMixin;