var TokenType = require('./token-type');

/**
 * @type {{INITIAL: number, AFTER_KEYWORD: number, BEFORE_PARAM: number, BEFORE_VALUE: number, VALUE: number}}
 * @enum
 */
var STATES = {
    INITIAL: 1,
    AFTER_KEYWORD: 2,
    BEFORE_PARAM: 3,
    BEFORE_VALUE: 4,
    VALUE: 5
};

/**
 * @type {{crop: boolean, fit: boolean, fill: boolean, canvas: boolean}}
 * @enum
 */
var KEYWORDS = {
    crop : true,
    fit : true,
    fill : true,
    canvas : true
};

/**
 * @typedef {{start: number?, end: number?, type: number?, keyword: string?, text: string?, value: string?}}
 */
var Token = {
    start: null,
    end: null,
    type: null,
    keyword: null,
    text: null,
    value: null
};

/**
 * @param {string} url
 * @constructor
 */
function ImageURLTokenizer(url) {
    this.buffer = url.toLowerCase();
    this.offset = 0;
    this.len = this.buffer.length;
    this.state = STATES.INITIAL;
}

/**
 * @returns {Token}
 */
ImageURLTokenizer.prototype.nextToken = function() {
    while (this.offset < this.len) {
        var c = this.buffer.charCodeAt(this.offset);
        var start = this.offset;
        if (c === 44) { //comma
            this.offset++;
            this.state = STATES.BEFORE_PARAM;
            continue;
        }
        if (c === 47) { // /
            if (this.state === STATES.AFTER_KEYWORD) {
                this.offset++;
                continue;
            }
        }
        if (c === 32) { // space
            switch (this.state) {
                case STATES.AFTER_KEYWORD:
                case STATES.BEFORE_PARAM:
                    this.offset++;
                    continue;
            }
        }
        if (this.isLetter(c)) {
            this.offset++;
            do {
                c = this.buffer.charCodeAt(this.offset);
                if (!this.isLetter(c)) {
                    break;
                }
                this.offset++;
            } while (this.offset < this.len);

            var text = this.buffer.slice(start, this.offset);
            if (KEYWORDS[text]) {
                this.state = STATES.AFTER_KEYWORD;
                return {
                    start: start,
                    end: this.offset,
                    type: TokenType.KEYWORD,
                    keyword: text
                };
            }
            if (this.state === STATES.AFTER_KEYWORD || this.state === STATES.VALUE) {
                if (text === "auto") {
                    return {
                        start: start,
                        end: this.offset,
                        type: TokenType.AUTO_VALUE
                    };
                }
            }
            if (this.state === STATES.AFTER_KEYWORD || this.state === STATES.BEFORE_PARAM) {
                if (c === 95 || c === 44 || c === 47) { //_, ',', /
                    return {
                        start: start,
                        end: this.offset,
                        type: TokenType.PARAM,
                        text: text
                    };
                }
            }
            if (this.state === STATES.BEFORE_VALUE) {
                return {
                    start: start,
                    end: this.offset,
                    type: TokenType.VALUE,
                    value: text
                };
            }
            continue;
        }
        if (c === 95) { //underscore
            var retVal = {
                start : start,
                end : this.offset,
                type : TokenType.UNDERSCORE
            };
            this.state = STATES.BEFORE_VALUE;
            this.offset++;
            return retVal;
        }
        if (this.state === STATES.BEFORE_VALUE) {
            if (this.isNumber(c) || c === 45) { //decimal point,number or -
                this.offset++;
                do {
                    c = this.buffer.charCodeAt(this.offset);
                    if (!this.isNumber(c)) {
                        break;
                    }
                    this.offset++;
                } while (this.offset < this.len);

                return {
                    start: start,
                    end: this.offset,
                    type: TokenType.VALUE,
                    value: this.buffer.slice(start, this.offset)
                };
            }
        }
        this.state = STATES.INITIAL;
        this.offset++;
    }
    return {
        type : TokenType.EOF
    };
};

/**
 * @param c
 * @returns {boolean}
 * @private
 */
ImageURLTokenizer.prototype.isLetter = function(c) {
    return (c >= 65 && c <= 90) || (c >= 97 && c <= 122);
};

/**
 * @param c
 * @returns {boolean}
 * @private
 */
ImageURLTokenizer.prototype.isNumber = function(c) {
    return c === 46 || (c >= 48 && c <= 57);
};

module.exports = ImageURLTokenizer;