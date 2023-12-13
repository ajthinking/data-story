import parse from './hjson-parse';
import common from './hjson-common';
import version from './hjson-version';
import stringify from './hjson-stringify';
import comments from './hjson-comments';
import dsf from './hjson-dsf';

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
