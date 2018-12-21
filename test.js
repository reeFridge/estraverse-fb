const assert = require('chai').assert;
const parse = require('espree').parse;
const originalKeys = require('./keys');

describe('works', () => {
	const code = 'const test = <><namespace:tag textAttr="value" exprAttr={expr} {...spreadAttr}><object.prop>!</object.prop>{}</namespace:tag></>;';

	const ast = parse(code, {
		ecmaVersion: 6,
		ecmaFeatures: {
			jsx: true
		}
	});

	const expectedKeys = [
		'JSXFragment',
		'JSXElement',
		'JSXOpeningElement',
		'JSXNamespacedName',
		'JSXIdentifier',
		'JSXIdentifier',
		'JSXAttribute',
		'JSXIdentifier',
		'JSXAttribute',
		'JSXIdentifier',
		'JSXExpressionContainer',
		'JSXSpreadAttribute',
		'JSXClosingElement',
		'JSXNamespacedName',
		'JSXIdentifier',
		'JSXIdentifier',
		'JSXElement',
		'JSXOpeningElement',
		'JSXMemberExpression',
		'JSXIdentifier',
		'JSXIdentifier',
		'JSXClosingElement',
		'JSXMemberExpression',
		'JSXIdentifier',
		'JSXIdentifier',
		'JSXText',
		'JSXExpressionContainer',
		'JSXEmptyExpression'
	];

	beforeEach(() => {
		for (const key in require.cache) {
			delete require.cache[key];
		}
	});

	it('directly from dependency', () => {
		const traverse = require('./').traverse;
		const actualKeys = [];
		const actualTypeKeys = [];

		traverse(ast, {
			enter: (node) => {
				if (originalKeys[node.type] != null) {
					actualKeys.push(node.type);
				}
			}
		});

		assert.deepEqual(actualKeys, expectedKeys);
	});

	it('in injected mode', () => {
		require('./');
		const traverse = require('estraverse').traverse;
		const actualKeys = [];

		traverse(ast, {
			enter: (node) => {
				if (originalKeys[node.type] != null) {
					actualKeys.push(node.type);
				}
			}
		});

		assert.deepEqual(actualKeys, expectedKeys);
	});

	it('in single-pass mode', () => {
		const traverse = require('estraverse').traverse;
		const keys = require('./keys');

		const actualKeys = [];

		traverse(ast, {
			enter: (node) => {
				if (originalKeys[node.type] != null) {
					actualKeys.push(node.type);
				}
			},
			keys: keys
		});

		assert.throws(() => {
			traverse(ast, {
				enter: () => {}
			});
		});

		assert.deepEqual(actualKeys, expectedKeys);
	});
});
