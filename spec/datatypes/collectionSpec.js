var Collection = require( "../../js/datatypes/Collection.js" );

describe( "Creating a new, empty collection", function() {
	it( "returns an empty collection when no items are passed to it", function() {
		var mockCollection = new Collection();

		expect( mockCollection ).toEqual( jasmine.any( Collection ) );
		expect( mockCollection.getLength() ).toBe( 0 );
		expect( mockCollection.getCurrentItem() ).toBe( false );
		expect( mockCollection.getNextItem() ).toBe( false );
		expect( mockCollection.getPreviousItem() ).toBe( false );
		expect( mockCollection.getItemByIndex( 1 ) ).toBe( false );
		expect( mockCollection.removeItem( 1 ) ).toBe( false );
	} );
} );

describe( "Creating a new, empty collection", function() {
	var mockCollection = new Collection();

	it( "returns an empty collection when no items are passed to it", function() {
		expect( mockCollection ).toEqual( jasmine.any( Collection ) );
		expect( mockCollection.getLength() ).toBe( 0 );
	} );

	it( "returns false when trying to iterate through the collection", function() {
		expect( mockCollection.getNextItem() ).toBe( false );
		expect( mockCollection.getPreviousItem() ).toBe( false );
	} );

	it( "returns false when trying to get a specific item in the collection", function() {
		expect( mockCollection.getCurrentItem() ).toBe( false );
		expect( mockCollection.getItemByIndex( 1 ) ).toBe( false );
		expect( mockCollection.removeItem( 1 ) ).toBe( false );
	} );
} );

describe( "Creating a new collection with items", function() {
	var mockCollection = new Collection( [ "1", "2", 3, [], {} ] );

	it( "returns an integer of the amount of items in the collection", function() {
		expect( mockCollection ).toEqual( jasmine.any( Collection ) );
		expect( mockCollection.getLength() ).toBe( 5 );
	} );

	it( "returns item when trying to iterate through the collection", function() {
		expect( mockCollection.getNextItem() ).toBe( "2" );
		expect( mockCollection.getPreviousItem() ).toBe( "1" );
	} );

	it( "returns item when trying to get a specific index in the collection that exists", function() {
		expect( mockCollection.getCurrentItem() ).toBe( "1" );
		expect( mockCollection.getItemByIndex( 1 ) ).toBe( "2" );
	} );

	it( "returns false when trying to get a specific index in the collection that does not exists", function() {
		expect( mockCollection.getItemByIndex( 1337 ) ).toBe( false );
	} );

	it( "returns true when removing a specific index in the collection", function() {
		expect( mockCollection.removeItem( 1 ) ).toBe( true );
		expect( mockCollection.getLength() ).toBe( 4 );
	} );
} );

describe( "Creating a new collection with a single item", function() {
	var mockCollection = new Collection( [ "1" ] );

	it( "returns item when trying to iterate through the collection", function() {
		expect( mockCollection.getNextItem() ).toBe( false );
		expect( mockCollection.getPreviousItem() ).toBe( false );
	} );
} );

describe( "Adding an item to an existing collection", function() {
	var mockCollection = new Collection( [ "1" ] );

	it( "returns item when trying to iterate through the collection", function() {
		expect( mockCollection.addItem( "new item" ) ).toBe( true );
		expect( mockCollection.getLength() ).toBe( 2 );
	} );
} );
