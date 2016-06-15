//TODO: return Image instance...

var extend = require('underscore').extend;
var ImageURLTokenizer = require('./image-url-tokenizer');
var TokenType = require('./token-type');

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

/**
 * @constructor
 */
function ImageURLParser() {
    this.table = {};
    this.table.fit = fitMap;
    this.table.canvas = canvasMap;
    this.table.fill = fillMap;
    this.table.crop = cropMap;
}

ImageURLParser.prototype.parse = function(url) {
    var tokenizer = new ImageURLTokenizer(url); 
    var token;
    var keyword;
    var valueTable;
    var param;
    var rules;
    var paramCount;
    var paramBuffer;
    var isAuto;
    var isFilter;
    var isAdjust;
    var api = {
        filter: {},
        adjust: {}
    };
    var start = -1;
    var last = -1;
    var loop = true;
    do {
        token = tokenizer.nextToken();
        switch (token.type) {
            case TokenType.EOF:
                loop = false;
                break;
            case TokenType.KEYWORD:
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
            case TokenType.PARAM:
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
            case TokenType.VALUE:
                paramCount--;
                paramBuffer.push(token.value);
                if (paramCount === 0) {
                  if (isFilter) {
                    api.filter[param] = paramBuffer.join('_');
                  } else if (isAdjust) {
                    api.adjust[param] = paramBuffer.join('_');
                  } else {
                    api[keyword][param] = paramBuffer.join('_');
                  }
                }
                last = token.end;
                break;
            case TokenType.AUTO_VALUE:
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

/**
 * @param {string} url
 * @returns {{imageId, version, imageName, endpoint, api}}
 */
function parse(url) {
    return new ImageURLParser().parse(url);
}

exports.parse = parse;
