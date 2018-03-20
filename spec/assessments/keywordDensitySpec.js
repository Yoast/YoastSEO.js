/* global describe it expect */
const KeywordDensityAssessment = require( "../../js/assessments/seo/keywordDensityAssessment.js" );
const Paper = require( "../../js/values/Paper.js" );

const factory = require( "../helpers/factory.js" );
const i18n = factory.buildJed();

let keywordDensityAssessment = new KeywordDensityAssessment();

describe( "An assessment for the keywordDensity", function() {
	it( "Returns 4 and a 'less than recommended' feedback string if the keyword density is lower than recommended", function() {
		let paper = new Paper( "Lorem ipsum dolor sit amet, no ridens definitionem eam, duo ubique efficiendi an." +
			"Te essent persius mei, id vel iuvaret offendit. Te natum sonet omnium mea, ei ius menandri deseruisse definitionem." +
			"Ipsum putant eum te, cu duo maiorum deseruisse. Harum dolore voluptatum nam in, eum ea veri malorum. Simul accusam" +
			"intellegam ne mel. No mea nostro postulant principes, te possim debitis iudicabit quo, in alterum epicurei pertinax est." +
			"Per quot epicuri at, qui quaeque consectetuer ex. Nec in tritani constituam. Sed id dicat atomorum. Accusata dignissim nam" +
			"cu, ea stet nostro liberavisse eum. At eam autem munere. Eum erant veritus civibus ea, usu eu eius tractatos accommodare," +
			"scripta phaedrum eum ex. Sed suas principes in, vel semper delicata ea, ut mei veniam doctus referrentur. His eu ubique" +
			"salutandi, augue volutpat quaerendum ne nam, ne zril definitiones sit. Cu per ludus ceteros sadipscing, eu autem erant numquam pro." +
			"Dicit lucilius assueverit et vel, pro ea quaeque senserit tincidunt, illum officiis mei te. An vel postea vocibus. Alii audire eos ei," +
			"dicam dissentias eam ex. An nam soleat abhorreant comprehensam, omnium dolorum cum ei. Ut cum homero tractatos dissentiunt, eu quas" +
			"ancillae fabellas eum. Eligendi gubergren ex eam. Postea veritus recusabo sed id, incorrupte intellegebat delicatissimi pro ut." +
			"Eum ut suas option, sit possit scriptorem cu. Ocurreret argumentum eum ex, augue sonet eum eu. Gloriatur adolescens et eos, vix an" +
			"graece tritani. Et sed decore prodesset. Nullam oblique urbanitas ne has, erat consetetur eam ea, in usu commodo apeirian ocurreret." +
			"Cu justo partem concludaturque pro, aliquam principes te pro. Eum possit convenire id, ut ius dico minimum omittam, cum eu forensibus" +
			"consequuntur. Pri ut autem oporteat, at cum feugait dignissim scripserit, eu habeo pertinax nec. Quod verear mel ut, ea usu affert iisque gloriatur." +
			"Vix ad ubique fierent. Ubique repudiare prodesset eam.", { keyword: "keyword" } );
		let result = keywordDensityAssessment.getResult( paper, factory.buildMockResearcher( {
			getKeywordDensity: 0,
			keywordCount: 0,
		}, true ), i18n );
		expect( result.getScore() ).toBe( 4 );
		expect( result.getText() ).toBe( "The focus keyword was found 0 times. That's less than the recommended minimum of 2 times for a text of this length." );
	} );

	it( "Returns -10 and a 'more than recommended' feedback string if the density is higher than recommended", function() {
		let paper = new Paper( "Lorem ipsum dolor sit amet, no ridens definitionem eam, duo ubique efficiendi an." +
			"Te essent persius mei, id vel iuvaret offendit. Te natum sonet omnium mea, ei ius menandri deseruisse definitionem." +
			"Ipsum putant eum te, cu duo maiorum deseruisse. Harum dolore voluptatum nam in, eum ea veri malorum. Simul accusam" +
			"intellegam ne mel. No mea nostro postulant principes, te possim debitis iudicabit quo, in alterum epicurei pertinax est." +
			"Per quot epicuri at, qui quaeque consectetuer ex. Nec in tritani constituam. Sed id dicat atomorum. Accusata dignissim nam" +
			"cu, ea stet nostro liberavisse eum. At eam autem munere. Eum erant veritus civibus ea, usu eu eius tractatos accommodare," +
			"scripta phaedrum eum ex. Sed suas principes in, vel semper delicata ea, ut mei veniam doctus referrentur. His eu ubique" +
			"salutandi, augue volutpat quaerendum ne nam, ne zril definitiones sit. Cu per ludus ceteros sadipscing, eu autem erant numquam pro." +
			"Dicit lucilius assueverit et vel, pro ea quaeque senserit tincidunt, illum officiis mei te. An vel postea vocibus. Alii audire eos ei," +
			"dicam dissentias eam ex. An nam soleat abhorreant comprehensam, omnium dolorum cum ei. Ut cum homero tractatos dissentiunt, eu quas" +
			"ancillae fabellas eum. Eligendi gubergren ex eam. Postea veritus recusabo sed id, incorrupte intellegebat delicatissimi pro ut." +
			"Eum ut suas option, sit possit scriptorem cu. Ocurreret argumentum eum ex, augue sonet eum eu. Gloriatur adolescens et eos, vix an" +
			"graece tritani. Et sed decore prodesset. Nullam oblique urbanitas ne has, erat consetetur eam ea, in usu commodo apeirian ocurreret." +
			"Cu justo partem concludaturque pro, aliquam principes te pro. Eum possit convenire id, ut ius dico minimum omittam, cum eu forensibus" +
			"consequuntur. Pri ut autem oporteat, at cum feugait dignissim scripserit, eu habeo pertinax nec. Quod verear mel ut, ea usu affert iisque gloriatur." +
			"Vix ad ubique fierent. Ubique repudiare prodesset eam.", { keyword: "keyword" } );
		let result = keywordDensityAssessment.getResult( paper, factory.buildMockResearcher( {
			getKeywordDensity: 3.44,
			keywordCount: 10,
		}, true ), i18n );
		expect( result.getScore() ).toBe( -10 );
		expect( result.getText() ).toBe( "The focus keyword was found 10 times. That's more than the recommended maximum of 8 times for a text of this length." );
	} );

	it( "Returns -50 and a 'way more than recommended' feedback string if the density is much higher than recommended", function() {
		let paper = new Paper( "Lorem ipsum dolor sit amet, no ridens definitionem eam, duo ubique efficiendi an." +
			"Te essent persius mei, id vel iuvaret offendit. Te natum sonet omnium mea, ei ius menandri deseruisse definitionem." +
			"Ipsum putant eum te, cu duo maiorum deseruisse. Harum dolore voluptatum nam in, eum ea veri malorum. Simul accusam" +
			"intellegam ne mel. No mea nostro postulant principes, te possim debitis iudicabit quo, in alterum epicurei pertinax est." +
			"Per quot epicuri at, qui quaeque consectetuer ex. Nec in tritani constituam. Sed id dicat atomorum. Accusata dignissim nam" +
			"cu, ea stet nostro liberavisse eum. At eam autem munere. Eum erant veritus civibus ea, usu eu eius tractatos accommodare," +
			"scripta phaedrum eum ex. Sed suas principes in, vel semper delicata ea, ut mei veniam doctus referrentur. His eu ubique" +
			"salutandi, augue volutpat quaerendum ne nam, ne zril definitiones sit. Cu per ludus ceteros sadipscing, eu autem erant numquam pro." +
			"Dicit lucilius assueverit et vel, pro ea quaeque senserit tincidunt, illum officiis mei te. An vel postea vocibus. Alii audire eos ei," +
			"dicam dissentias eam ex. An nam soleat abhorreant comprehensam, omnium dolorum cum ei. Ut cum homero tractatos dissentiunt, eu quas" +
			"ancillae fabellas eum. Eligendi gubergren ex eam. Postea veritus recusabo sed id, incorrupte intellegebat delicatissimi pro ut." +
			"Eum ut suas option, sit possit scriptorem cu. Ocurreret argumentum eum ex, augue sonet eum eu. Gloriatur adolescens et eos, vix an" +
			"graece tritani. Et sed decore prodesset. Nullam oblique urbanitas ne has, erat consetetur eam ea, in usu commodo apeirian ocurreret." +
			"Cu justo partem concludaturque pro, aliquam principes te pro. Eum possit convenire id, ut ius dico minimum omittam, cum eu forensibus" +
			"consequuntur. Pri ut autem oporteat, at cum feugait dignissim scripserit, eu habeo pertinax nec. Quod verear mel ut, ea usu affert iisque gloriatur." +
			"Vix ad ubique fierent. Ubique repudiare prodesset eam.", { keyword: "keyword" } );
		let result = keywordDensityAssessment.getResult( paper, factory.buildMockResearcher( {
			getKeywordDensity: 4.13,
			keywordCount: 12,
		}, true ), i18n );
		expect( result.getScore() ).toBe( -50 );
		expect( result.getText() ).toBe( "The focus keyword was found 12 times. That's way more than the recommended maximum of 8 times for a text of this length." );
	} );

	it( "Returns 9 and a 'great' feedback string if the density is within the recommended margin", function() {
		let paper = new Paper( "Lorem ipsum dolor sit amet, no ridens definitionem eam, duo ubique efficiendi an." +
			"Te essent persius mei, id vel iuvaret offendit. Te natum sonet omnium mea, ei ius menandri deseruisse definitionem." +
			"Ipsum putant eum te, cu duo maiorum deseruisse. Harum dolore voluptatum nam in, eum ea veri malorum. Simul accusam" +
			"intellegam ne mel. No mea nostro postulant principes, te possim debitis iudicabit quo, in alterum epicurei pertinax est." +
			"Per quot epicuri at, qui quaeque consectetuer ex. Nec in tritani constituam. Sed id dicat atomorum. Accusata dignissim nam" +
			"cu, ea stet nostro liberavisse eum. At eam autem munere. Eum erant veritus civibus ea, usu eu eius tractatos accommodare," +
			"scripta phaedrum eum ex. Sed suas principes in, vel semper delicata ea, ut mei veniam doctus referrentur. His eu ubique" +
			"salutandi, augue volutpat quaerendum ne nam, ne zril definitiones sit. Cu per ludus ceteros sadipscing, eu autem erant numquam pro." +
			"Dicit lucilius assueverit et vel, pro ea quaeque senserit tincidunt, illum officiis mei te. An vel postea vocibus. Alii audire eos ei," +
			"dicam dissentias eam ex. An nam soleat abhorreant comprehensam, omnium dolorum cum ei. Ut cum homero tractatos dissentiunt, eu quas" +
			"ancillae fabellas eum. Eligendi gubergren ex eam. Postea veritus recusabo sed id, incorrupte intellegebat delicatissimi pro ut." +
			"Eum ut suas option, sit possit scriptorem cu. Ocurreret argumentum eum ex, augue sonet eum eu. Gloriatur adolescens et eos, vix an" +
			"graece tritani. Et sed decore prodesset. Nullam oblique urbanitas ne has, erat consetetur eam ea, in usu commodo apeirian ocurreret." +
			"Cu justo partem concludaturque pro, aliquam principes te pro. Eum possit convenire id, ut ius dico minimum omittam, cum eu forensibus" +
			"consequuntur. Pri ut autem oporteat, at cum feugait dignissim scripserit, eu habeo pertinax nec. Quod verear mel ut, ea usu affert iisque gloriatur." +
			"Vix ad ubique fierent. Ubique repudiare prodesset eam.", { keyword: "keyword" } );
		let result = keywordDensityAssessment.getResult( paper, factory.buildMockResearcher( {
			getKeywordDensity: 0.69,
			keywordCount: 2,
		}, true ), i18n );
		expect( result.getScore() ).toBe( 9 );
		expect( result.getText() ).toBe( "The focus keyword was found 2 times. That's great for a text of this length." );
	} );

	it( "Returns 9 and a 'great' feedback string if the keyword appears twice in the text, regardless of the density", function() {
		let paper = new Paper( "Lorem ipsum dolor sit amet.", { keyword: "keyword" } );
		let result = keywordDensityAssessment.getResult( paper, factory.buildMockResearcher( {
			getKeywordDensity: 40,
			keywordCount: 2,
		}, true ), i18n );
		expect( result.getScore() ).toBe( 9 );
		expect( result.getText() ).toBe( "The focus keyword was found 2 times. That's great for a text of this length." );
	} );

	it( "Returns 4 and a 'less than recommended' feedback string if the keyword appears only once in the text, regardless of the density", function() {
		let paper = new Paper( "Lorem ipsum dolor sit amet, amet nusquam sit et, porro dicam cum ei, utamur admodum temporibus nec cu." +
			"Pro oratio feugait eleifend at, ex quodsi iudicabit ullamcorper pro. Eu affert ponderum persecuti usu, adhuc nostrum gubergren et" +
			"vel. Quo mundi disputando ea. Ea eum vocent eripuit. Ei sed facer maiestatis, eos probo luptatum ocurreret no." +
			"Duis detracto vim ea, sed et alii dicit, est soluta gloriatur repudiandae cu." +
			"Te feugiat blandit apeirian est, eum ad iuvaret civibus pertinax. Elit theophrastus complectitur an" +
			"ius, illum porro labore an vis. Efficiendi interesset his an. Libris assueverit et vis, id pro euismod aliquid.", { keyword: "keyword" } );
		let result = keywordDensityAssessment.getResult( paper, factory.buildMockResearcher( {
			getKeywordDensity: 1,
			keywordCount: 1,
		}, true ), i18n );
		expect( result.getScore() ).toBe( 4 );
		expect( result.getText() ).toBe( "The focus keyword was found 1 time. That's less than the recommended minimum of 2 times for a text of this length." );
	} );
} );
