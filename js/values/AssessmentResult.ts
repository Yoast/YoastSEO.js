import { isUndefined } from "lodash";
import { isNumber } from "lodash";

/**
 * A function that only returns an empty that can be used as an empty marker
 *
 * @returns {Array} A list of empty marks.
 */
var emptyMarker = function() {
	return [];
};

class AssessmentResult {
	score: number = 0;
	private _hasScore: boolean = false;
	private _identifier = "";
	private _hasMarks = false;
	private _marker: () => any[] = emptyMarker;
	text = "";

	constructor( { score = 0, text = "" }: { score: number, text: string } ) {
        this.score = score;
        this.text = text;
    }

    /**
     * Check if a score is available.
     * @returns {boolean} Whether or not a score is available.
     */
	hasScore(): boolean {
		return this._hasScore;
	}

	/**
	 * Get the available score
	 * @returns {number} The score associated with the AssessmentResult.
	*/
	getScore(): number {
		return this.score;
	}

    /**
     * Set the score for the assessment.
     * @param {number} score The score to be used for the score property
     * @returns {void}
     */
    setScore( score: number ) {
        this.score = score;
        this._hasScore = true;
    };

    /**
     * Check if a text is available.
     * @returns {boolean} Whether or not a text is available.
     */
    hasText(): boolean {
        return this.text !== "";
    }

    /**
     * Get the available text
     * @returns {string} The text associated with the AssessmentResult.
     */
    getText(): string {
        return this.text;
    }

    /**
     * Set the text for the assessment.
     * @param {string} text The text to be used for the text property
     * @returns {void}
     */
    setText( text: string ) {
        this.text = text;
    }

    /**
     * Sets the identifier
     *
     * @param {string} identifier An alphanumeric identifier for this result.
     * @returns {void}
     */
    setIdentifier( identifier: string ) {
        this._identifier = identifier;
    }

    /**
     * Gets the identifier
     *
     * @returns {string} An alphanumeric identifier for this result.
     */
    getIdentifier(): string {
        return this._identifier;
    }

    /**
     * Sets the marker, a pure function that can return the marks for a given Paper
     *
     * @param {Function} marker The marker to set.
     * @returns {void}
     */
    setMarker( marker: () => any[] ) {
        this._marker = marker;
    };

    /**
     * Returns whether or not this result has a marker that can be used to mark for a given Paper
     *
     * @returns {boolean} Whether or this result has a marker.
     */
    hasMarker(): boolean {
        return this._hasMarks && this._marker !== emptyMarker;
    };

    /**
     * Gets the marker, a pure function that can return the marks for a given Paper
     *
     * @returns {Function} The marker.
     */
    getMarker(): () => any[] {
        return this._marker;
    };

    /**
     * Sets the value of _hasMarks to determine if there is something to mark.
     *
     * @param {boolean} hasMarks Is there something to mark.
     * @returns {void}
     */
    setHasMarks( hasMarks: boolean ) {
        this._hasMarks = hasMarks;
    };

    /**
     * Returns the value of _hasMarks to determine if there is something to mark.
     *
     * @returns {boolean} Is there something to mark.
     */
    hasMarks(): boolean {
        return this._hasMarks;
    };
}

export default AssessmentResult;
