/* global modules */

var isUndefined = require( "lodash/lang/isUndefined" );

/**
 * Calculate the length of the array.
 * @param {array} The array to calculate the length of.
 * @returns {number} The length of the passed array.
 */
var calculateLength = function( array ) {
	if ( isUndefined( array ) ) {
		return 0;
	}

	return array.length;
};

/**
 * Check whether or not an array has a particular index.
 * @param {array} The array to check.
 * @param {number|string} index The wanted index.
 * @returns {boolean} Whether or not the index exists.
 */
var indexExists = function ( array, index ) {
	if ( isUndefined( array ) || isUndefined( index ) || array.indexOf( index ) === -1 ) {
		return false;
	}

	return true;
};

/**
 * Collection constructor.
 * @param {array} items The items to be used in the collection.
 * @constructor
 */
var Collection = function( items ) {
	this._iterator = 0;
	this._items = items || [];
	this._length = calculateLength( this._items );
};

/**
 * Get the next item in the collection.
 * @returns {*} The next item in the collection or false if none exists.
 */
Collection.prototype.getNextItem = function() {
	if ( this._iterator === this._length - 1 ) {
		return false;
	}

	this._iterator += 1;

	return this.getItemByIndex( this._iterator );
};

/**
 * Get the previous item in the collection.
 * @returns {*} The previous item in the collection or false if none exists.
 */
Collection.prototype.getPreviousItem = function() {
	if ( this._iterator <= 0 ) {
		return false;
	}

	this._iterator -= 1;

	return this.getItemByIndex( this._iterator );
};

/**
 * Return a specific item from the collection based on its index.
 * @param {number|string} index The index of the particular item we want.
 * @returns {boolean|*} False or the item that exists on that particular index.
 */
Collection.prototype.getItemByIndex = function( index ) {
	if ( indexExists( this._items, index ) === false ) {
		return false;
	}

	return this._items[ index ];
};

/**
 * Add an item to the collection and recalculate the total collection size.
 * @param {*} item The item to be added to the collection.
 * @returns {boolean}
 */
Collection.prototype.addItem = function( item ) {
	if ( isUndefined( item ) ) {
		return false;
	}

	this._items.push( item );
	this._length = calculateLength( this._items );

	return true;
};

/**
 * Remove an item from the collection by its index and recalculate the total collection size.
 * @param {number|string} index The index to search for.
 * @returns {boolean}
 */
Collection.prototype.removeItem = function( index ) {
	if ( indexExists( this._items, index ) === false ) {
		return false;
	}

	this._items.splice( index, 1 );
	this._length = calculateLength( this._items );

	return true;
};

modules.export = Collection;
