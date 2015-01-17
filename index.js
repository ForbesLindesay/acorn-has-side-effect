'use strict';

var acorn = require('acorn');
var walk = require('acorn/util/walk');

module.exports = hasSideEffect;
function hasSideEffect(src, options) {
  var strict = options && options.strict;
  var ast = typeof src === 'string' ? acorn.parse(src, {
    ecmaVersion: 6,
    allowReturnOutsideFunction: true
  }) : src;
  var hasEffect = false;
  function set() {
    hasEffect = true;
  }
  walk.recursive(ast, {}, {
    ReturnStatement: set,
    YieldExpression: set,
    BreakStatement: set,
    ContinueStatement: set,
    ThrowStatement: function (node, st, c) {
      c(node.argument, st, "Expression");
      if (st.inTryBlock) hasEffect = true;
    },
    TryStatement: function (node, st, c) {
      c(node.block, {inTryBlock: true}, "Statement");
      if (node.handler) c(node.handler.body, st, "ScopeBody");
      if (node.finalizer) c(node.finalizer, st, "Statement");
    },
    VariableDeclaration: set,
    FunctionDeclaration: set,
    Function: function () {},
    UpdateExpression: set,
    AssignmentExpression: set,
    NewExpression: set,
    CallExpression: set,
    ExportDeclaration: set,
    ImportDeclaration: set,
    TaggedTemplateExpression: set,
    ClassDeclaration: set,
    ClassExpression: function () {},
    MethodDefinition: set,
    Property: set,
    Identifier: strict ? set : function () {},
    MemberExpression: strict ? set : function(node, st, c) {
      c(node.object, st, "Expression");
      if (node.computed) c(node.property, st, "Expression");
    }
  });
  return hasEffect;
}
