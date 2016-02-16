var imageCountFunction = require( "../../js/analyses/getImageStatistics.js" );
var imageCount, valueObject;

describe( "Counts images in an text", function(){
	it( "returns object with the imagecount", function(){

		valueObject = {
			text: "string <img src='http://plaatje' alt='keyword' />",
			keyword: "keyword"
		};

		imageCount = imageCountFunction( valueObject );
		expect( imageCount.altKeyword ).toBe( 1 );
		expect( imageCount.total ).toBe( 1 );
		expect( imageCount.noAlt ).toBe( 0 );

		valueObject = {
			text: "string <img src='http://plaatje' alt='keyword' />",
			keyword: ""
		};

		imageCount = imageCountFunction( valueObject );
		expect( imageCount.noAlt ).toBe( 0 );
		expect( imageCount.altNaKeyword ).toBe( 1 );

		valueObject = {
			text:  "<img src='http://picture.com' alt='текст' />",
			keyword:  "текст"
		};

		imageCount = imageCountFunction( valueObject );
		expect( imageCount.altKeyword ).toBe( 1 );

		valueObject = {
			text: "<img src='http://picture.com' alt='maïs' />",
			keyword: "maïs"
		};

		imageCount = imageCountFunction( valueObject );
		expect( imageCount.altKeyword ).toBe( 1 );

		valueObject = {
			text: '<img src="http://picture.com" alt="Yoast\'s analyzer" />',
			keyword: "Yoast's analyzer"
		};

		imageCount = imageCountFunction( valueObject );
		expect( imageCount.altKeyword ).toBe( 1 );

		valueObject = {
			text:"<img src='' alt='something' />" +
			"<img src='' />" +
			"<img src='' />",
			keyword: "keyword"
		};

		imageCount = imageCountFunction( valueObject );
		expect( imageCount ).toEqual({
			total: 3,
			alt: 1,
			noAlt: 2,
			altKeyword: 0,
			altNaKeyword: 0
		});

		valueObject = {
			text: "<img src='http://google.com/keyword' alt='hi' />",
			keyword: "keyword"
		};

		imageCount = imageCountFunction( valueObject );
		expect( imageCount.altKeyword ).toBe( 0 );
	});
});
