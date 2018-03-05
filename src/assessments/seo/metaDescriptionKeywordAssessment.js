var AssessmentResult = require( "../../values/AssessmentResult.js" );
let Assessment = require( "../../assessment.js" );
let merge = require( "lodash/merge" );

/**
 * Assessment for calculating the length of the meta description.
 */
class MetaDescriptionKeywordAssessment extends Assessment
{
    /**
     * Sets the identifier and the config.
     *
     * @param {object} config The configuration to use.
     *
     * @returns {void}
     */
    constructor( config = {} ) {
        super();

        let defaultConfig = {
            recommendedMinimumMatches: 1,
            recommendedMaximumMatches: 2,
            scores: {
                tooFewMatches: 3,
                tooManyMatches: 3,
                correctNumberOfMatches: 9,
            },
        };

        this.identifier = "metaDescriptionKeyword";
        this._config = merge( defaultConfig, config );
    }

    /**
     * Runs the metaDescriptionKeyword module, based on this returns an assessment result with score.
     *
     * @param {Paper} paper The paper to use for the assessment.
     * @param {Researcher} researcher The researcher used for calling research.
     * @param {object} i18n The object used for translations
     *
     * @returns {AssessmentResult} The assessment result.
     */
    getResult( paper, researcher, i18n ) {
        var keywordMatches = researcher.getResearch( "metaDescriptionKeyword" );
        var assessmentResult = new AssessmentResult();

        assessmentResult.setScore( this.calculateScore( keywordMatches ) );
        assessmentResult.setText( this.translateScore( keywordMatches, i18n ) );

        return assessmentResult;
    }

    /**
     * Returns the score for the descriptionLength.
     *
     * @param {number} keywordMatches The number of keyword matches in the meta description.
     *
     * @returns {number} The calculated score.
     */
    calculateScore( keywordMatches ) {
        if ( keywordMatches < this._config.recommendedMinimumMatches ) {
            return this._config.scores.tooFewMatches;
        }
        if ( keywordMatches >= this._config.recommendedMinimumMatches && keywordMatches <= this._config.recommendedMaximumMatches ) {
            return this._config.scores.correctNumberOfMatches;
        }
        if ( keywordMatches > this._config.recommendedMaximumMatches ) {
            return this._config.scores.tooManyMatches;
        }
        return 0;
    }

    translateScore( keywordMatches, i18n ) {
        if ( keywordMatches < this._config.recommendedMinimumMatches ) {
            return i18n.dgettext( "js-text-analysis", "A meta description has been specified, but it does not contain the focus keyword." );
        }
        if ( keywordMatches >= this._config.recommendedMinimumMatches && keywordMatches <= this._config.recommendedMaximumMatches ) {
            return i18n.sprintf( i18n.dngettext( "js-text-analysis", "The meta description contains the focus keyword. That's great.",
                "The meta description contains the focus keyword %1$d times. That's great.", keywordMatches ), keywordMatches );
        }
        if ( keywordMatches > this._config.recommendedMaximumMatches ) {
            return i18n.sprintf( i18n.dgettext( "js-text-analysis", "The meta description contains the focus keyword %1$d times, " +
                "which is over the advised maximum of %2$d times." ), keywordMatches, this._config.recommendedMaximumMatches );
        }
        return 0;
    }

    isApplicable( paper ) {
        return paper.hasKeyword();
    }
}

module.exports =  MetaDescriptionKeywordAssessment;
