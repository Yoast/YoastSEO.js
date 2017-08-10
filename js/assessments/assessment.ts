import AssessmentResult from "../values/AssessmentResult";

interface Assessment {
    identifier: string,
    getResult( paper: Object, researcher: Object, i18n: Object ): AssessmentResult,
    isApplicable( paper: Object ): boolean,
}

export default Assessment;
