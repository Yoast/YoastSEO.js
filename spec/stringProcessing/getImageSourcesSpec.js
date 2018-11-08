import getImageSources from "../../src/stringProcessing/getImageSources";

describe( "matches image sources in text", function() {
	it( "returns the source of an image padded by text.", function() {
		expect( getImageSources( "Hey this is <img src='www.yoast.com'/> image!" ) )
			.toEqual( [ "www.yoast.com" ] );
		expect( getImageSources( "Hey this is <img src=\"www.yoast.com\"/> image!" ) )
			.toEqual( [ "www.yoast.com" ] );
	} );
	it( "returns the source of two images padded by text.", function() {
		expect( getImageSources( "Hey this is <img src='www.yoast.com'/> image, and <img src='www.my.yoast.com'/> another one." ) )
			.toEqual( [ "www.yoast.com", "www.my.yoast.com" ] );
		expect( getImageSources( "Hey this is <img src=\"www.yoast.com\"/> image, and <img src='www.my.yoast.com'/> another one." ) )
			.toEqual( [ "www.yoast.com", "www.my.yoast.com" ] );
		expect( getImageSources( "Hey this is <img src='www.yoast.com'/> image, and <img src=\"www.my.yoast.com\"/> another one." ) )
			.toEqual( [ "www.yoast.com", "www.my.yoast.com" ] );
	} );
	it( "returns an empty array when no images are in the text.", function() {
		expect( getImageSources( "Hey, there is no image!" ) )
			.toEqual( [ ] );
	} );
	it( "returns the source of an image with an opening and closing tag.", function() {
		expect( getImageSources( "Hey this is <img src=\"www.yoast.com\">image!</img>" ) )
			.toEqual( [ "www.yoast.com" ] );
		expect( getImageSources( "Hey this is <img src='www.yoast.com'>image!</img>" ) )
			.toEqual( [ "www.yoast.com" ] );
	} );
	it( "returns the source of an image with other attributes after as well.", function() {
		expect( getImageSources( "Hey this is <img src=\"www.yoast.com\" alt=\"a sample image\">image!</img>" ) )
			.toEqual( [ "www.yoast.com" ] );
		expect( getImageSources( "Hey this is <img src='www.yoast.com' alt='a sample image'>image!</img>" ) )
			.toEqual( [ "www.yoast.com" ] );
	} );
	it( "returns the source of an image with other attributes before as well.", function() {
		expect( getImageSources( "Hey this is <img alt=\"a sample image\" src=\"www.yoast.com\"/>image!" ) )
			.toEqual( [ "www.yoast.com" ] );
		expect( getImageSources( "Hey this is <img alt='a sample image' src='www.yoast.com'/>image!" ) )
			.toEqual( [ "www.yoast.com" ] );
	} );
	it( "returns an empty array when an image has an empty source attribute.", function() {
		expect( getImageSources( "Hey this is <img alt=\"a sample image\" src=\"\"/>image!" ) )
			.toEqual( [ ] );
		expect( getImageSources( "Hey this is <img alt='a sample image' src=''/>image!" ) )
			.toEqual( [ ] );
	} );
} );
