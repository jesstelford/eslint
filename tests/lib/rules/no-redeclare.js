/**
 * @fileoverview Tests for no-redeclare rule.
 * @author Ilya Volodin
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require("../../../lib/eslint"),
    ESLintTester = require("../../../lib/testers/eslint-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest("lib/rules/no-redeclare", {
    valid: [
        "var a = 3; var b = function() { var a = 10; };",
        "var a = 3; a = 10;",
        {
            code: "if (true) {\n    let b = 2;\n} else {    \nlet b = 3;\n}",
            ecmaFeatures: {
                blockBindings: true
            }
        },
        { code: "var Object = 0;" },
        { code: "var Object = 0;", options: [{builtinGlobals: false}] },
        { code: "var top = 0;", env: {browser: true} },
        { code: "var top = 0;", options: [{builtinGlobals: true}] }
    ],
    invalid: [
        { code: "var a = 3; var a = 10;", ecmaFeatures: { globalReturn: true }, errors: [{ message: "a is already defined", type: "Identifier"}] },
        { code: "switch(foo) { case a: let b = 3;\ncase b: let b = 4}", ecmaFeatures: { blockBindings: true }, errors: [{ message: "b is already defined", type: "Identifier"}] },
        { code: "var a = 3; var a = 10;", errors: [{ message: "a is already defined", type: "Identifier"}] },
        { code: "var a = {}; var a = [];", errors: [{ message: "a is already defined", type: "Identifier"}] },
        { code: "var a; function a() {}", errors: [{ message: "a is already defined", type: "Identifier" }] },
        { code: "function a() {} function a() {}", errors: [{ message: "a is already defined", type: "Identifier" }] },
        { code: "var a = function() { }; var a = function() { }", errors: [{ message: "a is already defined", type: "Identifier"}] },
        { code: "var a = function() { }; var a = new Date();", errors: [{ message: "a is already defined", type: "Identifier"}] },
        { code: "var a = 3; var a = 10; var a = 15;", errors: [{ message: "a is already defined", type: "Identifier"}, { message: "a is already defined", type: "Identifier"}] },
        { code: "var a; var a;", ecmaFeatures: { modules: true }, errors: [{ message: "a is already defined", type: "Identifier"}] },
        { code: "export var a; export var a;", ecmaFeatures: { modules: true }, errors: [{ message: "a is already defined", type: "Identifier"}] },
        { code: "export class A {} export class A {}", ecmaFeatures: { classes: true, modules: true }, errors: [{ message: "A is already defined", type: "Identifier"}] },
        { code: "export var a; var a;", ecmaFeatures: { modules: true, globalReturn: true }, errors: [{ message: "a is already defined", type: "Identifier"}] },
        {
            code: "var Object = 0;",
            options: [{builtinGlobals: true}],
            errors: [{ message: "Object is already defined", type: "Identifier"}]
        },
        {
            code: "var top = 0;",
            options: [{builtinGlobals: true}],
            env: {browser: true},
            errors: [{ message: "top is already defined", type: "Identifier"}]
        },
        {
            code: "var a; var {a = 0, b: Object = 0} = {};",
            options: [{builtinGlobals: true}],
            ecmaFeatures: {destructuring: true},
            errors: [
                { message: "a is already defined", type: "Identifier"},
                { message: "Object is already defined", type: "Identifier"}
            ]
        },
        {
            code: "var a; var {a = 0, b: Object = 0} = {};",
            options: [{builtinGlobals: true}],
            ecmaFeatures: {modules: true, destructuring: true},
            errors: [
                { message: "a is already defined", type: "Identifier"},
                { message: "Object is already defined", type: "Identifier"}
            ]
        },
        {
            code: "var a; var {a = 0, b: Object = 0} = {};",
            options: [{builtinGlobals: false}],
            ecmaFeatures: {modules: true, destructuring: true},
            errors: [{ message: "a is already defined", type: "Identifier"}]
        }
    ]
});
