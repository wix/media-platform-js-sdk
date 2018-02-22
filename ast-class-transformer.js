const fs = require('fs');
const path = require('path');

const filename = process.argv[2];
console.log('filename', filename);
const code = fs.readFileSync(path.join(__dirname, filename)).toString();

const findDocs = (code, codeStart) => {
  let i = codeStart - 1;
  while (code[i] === ' ' || code[i] === '\n') {
    i--;
  }
  if (`${code[i - 1]}${code[i]}` !== '*/') {
    return null;
  }
  const docsEnd = i;
  while (code.slice(i, i + 3) !== '/**') {
    i--;
  }
  const docsStart = i;
  return {
    body: code.slice(docsStart, docsEnd + 1),
    docsStart,
    docsEnd
  };
};

const getMethods = (code, className) => {
  const re = new RegExp(`${className}\\.prototype\\.(\\w+) = function \\((.*?)\\)`, 'g');
  // (\/\*\*(?:.|\n)*?\*\/\W+?)?

  const methods = [];
  code.replace(re, (match, method, params, offset) => {
    const declarationLength = `${className}.prototype.${method} = function (${params})`.length;
    const end = functionBodyEnd(code, offset + declarationLength);
    const body = code.slice(offset + declarationLength + 2, end - 1);
    const docs = findDocs(code, offset);
    // console.log('docs', method, code.slice(docs.docsStart, docs.docsEnd + 1));
    methods.push({
      method,
      params,
      offset,
      end,
      body,
      docs
    });
  });
  return methods;
};

const functionBodyEnd = (code, start) => {
  let curlyBracesCounter = 0;
  for (let i = start; i < code.length; i++) {
    if (code[i] === '{') {
      curlyBracesCounter++;
    }
    if (code[i] === '}') {
      curlyBracesCounter--;
      if (curlyBracesCounter === 0) {
        return i;
      }
    }
  }
  throw Error('end not found');
};

const transform = code => {
  const classNameMatch = code.match(/function ([A-Z]\w+)\((.*?)\)/);
  // console.log(code);
  console.log(classNameMatch);
  if (!classNameMatch) {
    console.log('nothing');
    return;
  }
  const [, className, parameters] = classNameMatch;
  const constructorDeclaration = `function ${className}(${parameters})`;
  const start = code.indexOf(constructorDeclaration);
  const end = functionBodyEnd(code, start + constructorDeclaration.length);
  const methods = getMethods(code, className);
  // for (let i = methods.length - 1; i >= 0; i--) {
  //   const {method, body, params, offset, end} = method;
  //
  // }
  // console.log('methods', methods.map(method => method.method));
  methods
    .slice()
    .reverse()
    .forEach(({method, body, params, offset, end, docs}) => {
      const removeStart = docs !== null ? docs.docsStart : offset;
      // console.log(method, offset, end);
      code = [...code.slice(0, removeStart), ...code.slice(end + 2, code.length)].join('');
    // code = code.replace(`${className}.prototype.${method} = function (${params}) {${body}};`, '');
  });

  return `
    ${code.slice(0, start)}
    class ${className} {
      constructor(${parameters}) {
        ${code.slice(start + constructorDeclaration.length + 2, end - 1)}
      }
      
      ${methods.map(({body, params, method, docs}) => `
        ${docs ? docs.body : ''}
        ${method}(${params}) {
        ${body}
        }
      `).join('\n')}
    }
    ${code.slice(end + 1, code.length - 1)}
    `;
};

const transformedCode = transform(code);
if (transformedCode) {
  fs.writeFileSync(path.join(__dirname, filename), transformedCode);
}
