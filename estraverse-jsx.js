const estraverse = module.exports = require('estraverse');
const VisitorKeys = require('./keys');

for (const nodeType in VisitorKeys) {
	estraverse.Syntax[nodeType] = nodeType;
	const keys = VisitorKeys[nodeType];

	if (keys) {
		estraverse.VisitorKeys[nodeType] = keys;
	}
}
