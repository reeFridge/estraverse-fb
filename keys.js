const unprefixedKeys = {
	Identifier: [],
	NamespacedName: ['namespace', 'name'],
	MemberExpression: ['object', 'property'],
	EmptyExpression: [],
	ExpressionContainer: ['expression'],
	Element: ['openingElement', 'closingElement', 'children'],
	Fragment: ['children'],
	ClosingElement: ['name'],
	OpeningElement: ['name', 'attributes'],
	Attribute: ['name', 'value'],
	Text: [],
	SpreadAttribute: ['argument']
};

for (const key in unprefixedKeys) {
	exports['JSX' + key] = unprefixedKeys[key];
}
