const recommendedKeywordCount = require( "../../js/assessmentHelpers/recommendedKeywordCount.js" );
const Paper = require( "../../js/values/Paper.js" );
const maxRecommendedDensity = 3;
const minRecommendedDensity = 0.5;

describe( "Test for getting the recommended keyword count for a text", function() {
	it( "returns the maximum recommended keyword count for a text with 300 words and a 1-word keyphrase", function() {
		let mockPaper = new Paper( "Lorem ipsum dolor sit amet, no ridens definitionem eam, duo ubique efficiendi an." +
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
		expect( recommendedKeywordCount( mockPaper, maxRecommendedDensity, "max" ) ).toBe( 8 );
	} );

	it( "returns the maximum recommended keyword count for a text with 300 words and a multi-word keyphrase", function() {
		let mockPaper = new Paper( "Lorem ipsum dolor sit amet, no ridens definitionem eam, duo ubique efficiendi an." +
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
			"Vix ad ubique fierent. Ubique repudiare prodesset eam.", { keyword: "keyword keyword" } );
		expect( recommendedKeywordCount( mockPaper, maxRecommendedDensity, "max" ) ).toBe( 6 );
	} );

	it( "returns the minimum recommended keyword count for a text with 1200 words and a 1-word keyphrase", function() {
		let mockPaper = new Paper( "Lorem keyword dolor keyword amet, keyword ridens definitionem eam, duo ubique efficiendi an." +
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
			"Vix ad ubique fierent. Ubique repudiare prodesset eam." +
			"Lorem keyword dolor keyword amet, keyword ridens definitionem eam, duo ubique efficiendi an." +
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
			"Lorem keyword dolor keyword amet, keyword ridens definitionem eam, duo ubique efficiendi an." +
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
			"Lorem keyword dolor keyword amet, keyword ridens definitionem eam, duo ubique efficiendi an." +
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
			"Lorem ipsum dolor sit amet, idque temporibus concludaturque eu mea. Causae vulputate ius ad, eos ei erant eleifend." +
			"Te delenit expetendis vix. Quo cibo.", { keyword: "keyword" } );
		expect( recommendedKeywordCount( mockPaper, minRecommendedDensity, "min" ) ).toBe( 6 );
	} );

	it( "returns 2 as the default recommended minimum keyword count if the text is very short", function() {
		let mockPaper = new Paper( "This is a short text.", { keyword: "keyword" } );
		expect( recommendedKeywordCount( mockPaper, minRecommendedDensity, "min" ) ).toBe( 2 );
	} );

	it( "returns 0 when the word count of the text is 0", function() {
		let mockPaper = new Paper( "<img src='http://image.com/image.png'>", { keyword: "keyword" } );
		expect( recommendedKeywordCount( mockPaper, maxRecommendedDensity, "max" ) ).toBe( 0 );
	} );

	it( "returns the maximum recommended keyword count when the maxOrMin variable is not explicitly defined", function() {
		let mockPaper = new Paper( "Lorem ipsum dolor sit amet, no ridens definitionem eam, duo ubique efficiendi an." +
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
		expect( recommendedKeywordCount( mockPaper, maxRecommendedDensity ) ).toBe( 8 );
	} );
} );
