/**
 * Created by elad on 13/06/2016.
 */

/**
 * @type {{UNDERSCORE: number, KEYWORD: number, VALUE: number, AUTO_VALUE: number, EOF: number, PARAM: number}}
 * @enum
 */
var TokenType = {
    UNDERSCORE: 1,
    KEYWORD: 2,
    VALUE: 3,
    AUTO_VALUE: 4,
    EOF: 5,
    PARAM: 6
};

module.exports = TokenType;