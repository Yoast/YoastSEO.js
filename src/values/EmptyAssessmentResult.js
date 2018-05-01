const AssessmentResult = require( "./AssessmentResult" );

class EmptyAssessmentResult extends AssessmentResult {
	constructor() {
		super( 0, '' );
	}
}

export default EmptyAssessmentResult;
