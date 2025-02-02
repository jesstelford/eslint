/**
 * @fileoverview Tests for quote-props rule.
 * @author Mathias Bynens <http://mathiasbynens.be/>
 * @copyright 2015 Tomasz Olędzki. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require("../../../lib/eslint"),
    ESLintTester = require("../../../lib/testers/eslint-tester");

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest("lib/rules/quote-props", {
    valid: [
        "({ '0': 0 })",
        "({ 'a': 0 })",
        "({ \"a\": 0 })",
        "({ 'null': 0 })",
        "({ 'true': 0 })",
        "({ 'a-b': 0 })",
        "({ 'if': 0 })",
        "({ '@': 0 })",

        { code: "({ 'a': 0, b(){} })", ecmaFeatures: { objectLiteralShorthandMethods: true }},
        { code: "({ a: 0, b(){} })", options: ["as-needed"], ecmaFeatures: { objectLiteralShorthandMethods: true } },
        { code: "({ a: 0, b: 0 })", options: ["as-needed"] },
        { code: "({ a: 0, 0: 0 })", options: ["as-needed"] },
        { code: "({ a: 0, true: 0 })", options: ["as-needed"] },
        { code: "({ a: 0, null: 0 })", options: ["as-needed"] },
        { code: "({ a: 0, '-b': 0 })", options: ["as-needed"] },
        { code: "({ a: 0, 'if': 0 })", options: ["as-needed"] },
        { code: "({ a: 0, '@': 0 })", options: ["as-needed"] },
        { code: "({ a: 0, 0: 0 })", options: ["as-needed"] },
        { code: "({ a: 0, '0x0': 0 })", options: ["as-needed"] },
        { code: "({ 'a': 0, '-b': 0 })", options: ["consistent"] },
        { code: "({ 'true': 0, 'b': 0 })", options: ["consistent"] },
        { code: "({ null: 0, a: 0 })", options: ["consistent"] },
        { code: "({ a: 0, b: 0 })", options: ["consistent"] },
        { code: "({ a: 0, b: 0 })", options: ["consistent-as-needed"] },
        { code: "({ a: 0, null: 0 })", options: ["consistent-as-needed"] },
        { code: "({ 'a': 0, '-b': 0 })", options: ["consistent-as-needed"] },
        { code: "({ '@': 0, 'B': 0 })", options: ["consistent-as-needed"] }
    ],
    invalid: [{
        code: "({ a: 0 })",
        errors: [{
            message: "Unquoted property `a` found.", type: "Property"
        }]
    }, {
        code: "({ 0: '0' })",
        errors: [{
            message: "Unquoted property `0` found.", type: "Property"
        }]
    }, {
        code: "({ 'a': 0 })",
        options: ["as-needed"],
        errors: [{
            message: "Unnecessarily quoted property `a` found.", type: "Property"
        }]
    }, {
        code: "({ 'null': 0 })",
        options: ["as-needed"],
        errors: [{
            message: "Unnecessarily quoted property `null` found.", type: "Property"
        }]
    }, {
        code: "({ 'true': 0 })",
        options: ["as-needed"],
        errors: [{
            message: "Unnecessarily quoted property `true` found.", type: "Property"
        }]
    }, {
        code: "({ '0': 0 })",
        options: ["as-needed"],
        errors: [{
            message: "Unnecessarily quoted property `0` found.", type: "Property"
        }]
    }, {
        code: "({ '-a': 0, b: 0 })",
        options: ["consistent"],
        errors: [{
            message: "Inconsistently quoted property `b` found.", type: "ObjectExpression"
        }]
    }, {
        code: "({ a: 0, 'b': 0 })",
        options: ["consistent"],
        errors: [{
            message: "Inconsistently quoted property `b` found.", type: "ObjectExpression"
        }]
    }, {
        code: "({ '-a': 0, b: 0 })",
        options: ["consistent-as-needed"],
        errors: [{
            message: "Inconsistently quoted property `b` found.", type: "ObjectExpression"
        }]
    }, {
        code: "({ 'a': 0, 'b': 0 })",
        options: ["consistent-as-needed"],
        errors: [{
            message: "Properties shouldn't be quoted as all quotes are redundant.", type: "ObjectExpression"
        }]
    }, {
        code: "({ 'true': 0, 'null': 0 })",
        options: ["consistent-as-needed"],
        errors: [{
            message: "Properties shouldn't be quoted as all quotes are redundant.", type: "ObjectExpression"
        }]
    }]
});
