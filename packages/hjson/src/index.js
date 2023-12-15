import parse from './hjson-parse.js';
import common from './hjson-common.js';
import version from './hjson-version.js';
import stringify from './hjson-stringify.js';
import comments from './hjson-comments.js';
import dsf from './hjson-dsf.js';

export default {
  parse: parse,
  stringify: stringify,

  endOfLine: function() { return common.EOL; },
  setEndOfLine: function(eol) {
    if (eol === '\n' || eol === '\r\n') common.EOL = eol;
  },

  version: version,

  // round trip shortcut
  rt: {
    parse: function(text, options) {
      (options = options || {}).keepWsc = true;
      return parse(text, options);
    },
    stringify: function(value, options) {
      (options = options || {}).keepWsc = true;
      return stringify(value, options);
    },
  },

  comments: comments,

  dsf: dsf.std,
};
