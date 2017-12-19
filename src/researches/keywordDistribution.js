var getIndicesByWord = require("../stringProcessing/indices").getIndicesByWord

module.exports = function ( paper ) {
	var text = paper.getText();
	var textLength = text.length;
	var keyword = paper.getKeyword();

	var keywordIndices = getIndicesByWord( keyword, text );

	var keyWordDistances = [];
};