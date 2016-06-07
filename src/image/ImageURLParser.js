//TODO: return Image instance...

var extend = require('underscore').extend;

var adjustMap = {
    "br" : {auto : true, params: 1, adjust : true},
    "con" : {auto : true, params: 1, adjust : true},
    "sat" : {auto : true, params: 1, adjust : true},
    "hue" : {auto : true, params: 1, adjust : true},
    "auto_adj" : {standalone : true, params: 0, adjust : true}
};

var filterMap = {
    "oil" : {standalone : true, params: 0, filter : true},
    "neg" : {standalone : true, params: 0, filter : true},
    "pix" : {params: 1, filter : true},
    "blur" : {params: 1, filter : true},
    "shrp" : {params: 1, filter : true},
    "usm" : {auto : true, params: 3, filter : true}
};

var al = {auto : true, params: 1};
var rf = {params: 1};

var whq = {
    "w" : {params: 1},
    "h" : {params: 1},
    "q" : {params: 1, auto : true},
	"bl" : {standalone : true}
};

var canvasMap = {"al" : al, "c" : {params : 1}};
extend(canvasMap, whq);
extend(canvasMap, filterMap);
extend(canvasMap, adjustMap);

var fillMap = {"rf" : rf, "al" : al};
extend(fillMap, whq);
extend(fillMap, filterMap);
extend(fillMap, adjustMap);

var fitMap = {"rf" : rf};
extend(fitMap, whq);
extend(fitMap, filterMap);
extend(fitMap, adjustMap);

var cropMap = {"x" : {params: 1}, "y" : {params: 1}};
extend(cropMap, whq);
extend(cropMap, filterMap);
extend(cropMap, adjustMap);

var keywords = {
    "crop" : true,
    "fit" : true,
    "fill" : true,
    "canvas" : true
};

var tokenTypes = {
    UNDERSCORE : 1,
    KEYWORD : 2,
    VALUE : 3,
    AUTO_VALUE : 4,
    EOF : 5,
    PARAM : 6
};

function ImageURLTokenizer(url) {
    this.buffer = url.toLowerCase();
    this.offset = 0;
    this.len = this.buffer.length;
    this.states = {
        INITIAL : 1,
        AFTER_KEYWORD : 2,
        BEFORE_PARAM : 3,
        BEFORE_VALUE : 4
    };
    this.state = this.states.initial;
}

ImageURLTokenizer.prototype.isLetter = function(c) {
    return (c >= 65 && c <= 90) || (c >= 97 && c <= 122);
};

ImageURLTokenizer.prototype.isNumber = function(c) {
    return c === 46 || (c >= 48 && c <= 57);
};

ImageURLTokenizer.prototype.nextToken = function() {
    while(this.offset < this.len) {
        var c = this.buffer.charCodeAt(this.offset);
        var start = this.offset;
        if(c === 44) { //comma
            this.offset++;
            this.state = this.states.BEFORE_PARAM;
            continue;
        }
        if(c === 47) { // /
            if(this.state === this.states.AFTER_KEYWORD) {
                this.offset++;
                continue;
            }
        }
        if(c === 32) { // space
            switch(this.state) {
                case this.states.AFTER_KEYWORD:
                case this.states.BEFORE_PARAM:
                    this.offset++;
                    continue;
            }
        }
        if(this.isLetter(c)) {
            this.offset++;
            do {
                c = this.buffer.charCodeAt(this.offset);
                if(!this.isLetter(c)) {
                    break;
                }
                this.offset++;
            } while(this.offset < this.len);

            var text = this.buffer.slice(start, this.offset);
            if(keywords[text]) {
                this.state = this.states.AFTER_KEYWORD;
                return {
                    start : start,
                    end : this.offset,
                    type : tokenTypes.KEYWORD,
                    keyword : text
                };
            }
            if(this.state === this.states.AFTER_KEYWORD || this.state === this.states.VALUE) {
                if (text === "auto") {
                    return {
                        start: start,
                        end: this.offset,
                        type: tokenTypes.AUTO_VALUE
                    };
                }
            }
            if(this.state === this.states.AFTER_KEYWORD || this.state === this.states.BEFORE_PARAM) {
                if (c === 95 || c === 44 || c === 47) { //_, ',', /
                    return {
                        start: start,
                        end: this.offset,
                        type: tokenTypes.PARAM,
                        text: text
                    };
                }
            }
            if(this.state === this.states.BEFORE_VALUE) {
                return {
                    start: start,
                    end: this.offset,
                    type: tokenTypes.VALUE,
                    value: text
                };
            }
            continue;
        }
        if(c === 95) { //underscore
            var retVal = {
                start : start,
                end : this.offset,
                type : tokenTypes.UNDERSCORE
            };
            this.state = this.states.BEFORE_VALUE;
            this.offset++;
            return retVal;
        }
        if(this.state === this.states.BEFORE_VALUE) {
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
                    type: tokenTypes.VALUE,
                    value: this.buffer.slice(start, this.offset)
                };
            }
        }
        this.state = this.states.INITIAL;
        this.offset++;
    }
    return {
        type : tokenTypes.EOF
    };
};

function ImageURLParser() {
    this.table = {};
    this.table.fit = fitMap;
    this.table.canvas = canvasMap;
    this.table.fill = fillMap;
    this.table.crop = cropMap;
    //this.table.wm = wmMap;
}

ImageURLParser.prototype.parse = function(url) {
    var tk = new ImageURLTokenizer(url), token, keyword, valueTable, param,
        rules, paramCount, paramBuffer, isAuto, isFilter, isAdjust;
    var api = {}, start = -1, last = -1, loop = true;
    api.filter = {};
    api.adjust = {};
    do {
        token = tk.nextToken();
        switch(token.type) {
            case tokenTypes.EOF:
                loop = false;
                break;
            case tokenTypes.KEYWORD:
                if(start === -1) {
                    start = token.start;
                }
                valueTable = this.table[token.keyword];
                if(valueTable === undefined) {
                    throw "Bad Image operation found: " + token.keyword;
                }
                api[token.keyword] = {};
                keyword = token.keyword;
                break;
            case tokenTypes.PARAM:
                if(valueTable === null || valueTable[token.text] === undefined) {
                    throw "unknown parameter: " + token.text;
                }
                rules = valueTable[token.text];
                if(rules === undefined) {
                    throw "unknown parameter: " + token.text;
                }
                if(rules.standalone) {
                    api[keyword][token.text] = null;
                    break;
                }
                param = token.text;
                paramCount = rules.params;
                isAuto = rules.auto;
                isFilter = rules.filter;
                isAdjust = rules.adjust;
                paramBuffer = [];
                break;
            case tokenTypes.VALUE:
                paramCount--;
                paramBuffer.push(token.value);
                if(paramCount === 0) {
                  if(isFilter) {
                    api.filter[param] = paramBuffer.join('_');
                  } else if(isAdjust) {
                    api.adjust[param] = paramBuffer.join('_');
                  } else {
                    api[keyword][param] = paramBuffer.join('_');
                  }
                }
                last = token.end;
                break;
            case tokenTypes.AUTO_VALUE:
                if(!isAuto) {
                    throw "auto not allowed for parameter: " + param;
                }
                api[keyword][param] = token.value;
                last = token.end;
                break;
        }

    } while(loop);

    //now, let's get the pieces
    var prefixes = url.substring(0, start - 1).split('/');
    var version = prefixes.pop();
    var imageId = prefixes.pop();
    var endpoint = prefixes.join('/');

    return {
        imageId : imageId,
        version : version,
        imageName : url.substring(last + 1),
        endpoint : endpoint,
        api : api
    };
};

var parser = new ImageURLParser();

module.exports.parse = function(url) {
    return parser.parse(url);
};
