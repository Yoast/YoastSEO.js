import Assessment from "../../assessment";
import { createAnchorOpeningTag } from "../../helpers/shortlinker";
import { merge } from "lodash-es";
import AssessmentResult from "../../values/AssessmentResult";

/**
 * Assessment to check whether the images in the article does not exceed a certain file size.
 */
class ImageFileSizeAssessment extends Assessment {
	/**
	 * Sets the identifier and the config.
	 *
	 * @param {Object} [config] The configuration to use.
	 */
	constructor( config = {} ) {
		super();

		const defaultConfig = {
			parameters: {
				recommendedMaximumBytes: 500000,
			},
			scores: {
				overRecommendedMaximum: 3,
			},
			urlTitle: createAnchorOpeningTag( "https://yoa.st/3bh" ),
			urlCallToAction: createAnchorOpeningTag( "https://yoa.st/3bi" ),
		};

		this.identifier = "imageFileSize";
		this._config = merge( defaultConfig, config );
	}

	/**
	 * Checks if assessment is applicable to the paper.
	 *
	 * @param {Paper} paper The paper to be analyzed.
	 *
	 * @returns {boolean} Whether the paper has text.
	 */
	isApplicable( paper ) {
		return paper.hasText();
	}

	/**
	 *
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 * @param {Researcher} researcher The researcher used for calling research.
	 * @param {Jed} i18n The object used for translations.
	 *
	 * @returns {AssessmentResult} The result of the assessment.
	 */
	getResult( paper, researcher, i18n ) {
		this.researchResults = researcher.getResearch( "getLinkStatistics" );
		return new AssessmentResult( this.calculateResult( i18n )  );
	}

	calculateResult( i18n ) {

	}
}
