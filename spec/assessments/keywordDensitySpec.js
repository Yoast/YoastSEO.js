/* global describe it expect */
const KeywordDensityAssessment = require( "../../js/assessments/seo/keywordDensityAssessment.js" );
const Paper = require( "../../js/values/Paper.js" );

const factory = require( "../helpers/factory.js" );
const i18n = factory.buildJed();

let keywordDensityAssessment = new KeywordDensityAssessment();

describe( "An assessment for the keywordDensity", function() {
	it( "Returns 4 and a 'less than recommended' feedback string if the keyword count is 0", function() {
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

	it( "Returns 4 and a 'less than recommended' feedback string if the keyword density is lower than recommended (count: 1)", function() {
		let paper = new Paper( "Lorem ipsum dolor sit amet, congue aliquid mei ut, in ius tantas perfecto, minimum probatus quo in." +
			"Sea inani legendos no, cu vix erat dicat. Qui no conceptam definiebas. In pro partem semper veritus, ei qui aperiam fabellas facilisi." +
			"Ex sea purto possit, in modus adversarium vim. Tacimates oportere intellegebat an mel, no diam consequat ullamcorper usu. Sit eu mundi" +
			"zril praesent, ponderum consequat vis ei, pro te vero aliquip propriae. Labitur eruditi ex duo. Quaeque fastidii copiosae an mei. Ei" +
			"commodo urbanitas sed, facete meliore reprehendunt ut per. Sit id oblique labores, sea affert impetus at. In his alia brute malorum," +
			"ex sint mutat has. Graeci lucilius recteque pro et. Eam simul aliquip meliore ex. Vix copiosae reformidans te, vitae aliquip eos ei." +
			"Iriure scaevola ei vix, in mandamus argumentum constituam vel. Cum et aperiam persequeris, vel ex aliquip similique. Sale atqui persius" +
			"et mel, aliquip voluptatibus duo ad, est iusto homero et. Mel nonumy tritani cu. Eros repudiare ut eos, vim hinc nostro ne. Nec essent" +
			"vituperata et, quod mazim et quo, integre vivendum ad nam. Minim scripta pertinacia pri ei, populo causae ea vim. An legendos tractatos" +
			"comprehensam pro, omnes primis principes ei usu. An eum porro maiestatis expetendis, audiam interesset id pri. An vim suas aperiam." +
			"Dolor timeam per ad. Commodo eripuit assentior no qui, nostro lucilius usu id. Id rebum aperiri assentior has, ancillae propriae" +
			"legendos qui eu. Ex mel tempor officiis consulatu, dictas delenit quo eu. Id errem soluta adipisci quo, ea vidit albucius temporibus" +
			"nec, qui ei temporibus comprehensam. Cu usu quem porro fugit, suas epicuri et sea. Elit clita pro an. Eos ut alia everti molestie." +
			"Vocent luptatum pro cu, et sumo minim sonet duo, eu quot fierent consulatu pri. Duo no melius utamur menandri, cum ei adhuc hendrerit." +
			"Eu his prima facete alterum, ius mutat decore et. Virtute interesset cum ex, tota viderer tibique te nam, no sed unum abhorreant." +
			"Paulo decore reformidans vis no, vis dico tractatos maiestatis no. In duo utamur delectus qualisque, ex habemus ancillae dissentiunt" +
			"mea. Vis impedit maluisset splendide ex, cu agam dignissim sententiae mei. Posse audiam aperiam eu mea, latine lobortis posidonium eu" +
			"mel no etiam nonumy imperdiet duo. Ius cu nullam accusam. Ex eum sanctus platonem, legere facilis appetere duo in, pri id vivendo" +
			"vituperata. Quaeque abhorreant vim ut, id delicata philosophia mea. Ferri affert inciderint sed et, ne cum dicam vituperata instructior," +
			"ius te invenire accusamus. Ex ius augue nonumes tibique, eu posse abhorreant vituperata mea. An tantas dolorem vel, pro ullum volumus" +
			"dignissim at. Vis accusam corrumpit democritum ex. Albucius euripidis ad mei. Et erat aeterno contentiones vis. Eam feugait definitionem" +
			"no. Magna oratio definitionem ei vel, vocent pericula quaerendum mel te, voluptaria definitiones has te. Pri ei prodesset cotidieque," +
			"id mel impedit luptatum referrentur, alia copiosae tractatos in quo. Ea quidam volutpat pri, ex utroque civibus eos. Ut vitae moderatius" +
			"mel, munere definiebas usu at. Ea luptatum menandri consequuntur per, nec ne nullam dictas contentiones. Has soleat rationibus ut." +
			"In omnes.", { keyword: "keyword" } );
		let result = keywordDensityAssessment.getResult( paper, factory.buildMockResearcher( {
			getKeywordDensity: 0.21,
			keywordCount: 1,
		}, true ), i18n );
		expect( result.getScore() ).toBe( 4 );
		expect( result.getText() ).toBe( "The focus keyword was found 1 time. That's less than the recommended minimum of 3 times for a text of this length." );
	} );

	it( "Returns 4 and a 'less than recommended' feedback string if the keyword density is lower than recommended (count: >1)", function() {
		let paper = new Paper( "Lorem ipsum dolor sit amet, congue aliquid mei ut, in ius tantas perfecto, minimum probatus quo in." +
			"Sea inani legendos no, cu vix erat dicat. Qui no conceptam definiebas. In pro partem semper veritus, ei qui aperiam fabellas facilisi." +
			"Ex sea purto possit, in modus adversarium vim. Tacimates oportere intellegebat an mel, no diam consequat ullamcorper usu. Sit eu mundi" +
			"zril praesent, ponderum consequat vis ei, pro te vero aliquip propriae. Labitur eruditi ex duo. Quaeque fastidii copiosae an mei. Ei" +
			"commodo urbanitas sed, facete meliore reprehendunt ut per. Sit id oblique labores, sea affert impetus at. In his alia brute malorum," +
			"ex sint mutat has. Graeci lucilius recteque pro et. Eam simul aliquip meliore ex. Vix copiosae reformidans te, vitae aliquip eos ei." +
			"Iriure scaevola ei vix, in mandamus argumentum constituam vel. Cum et aperiam persequeris, vel ex aliquip similique. Sale atqui persius" +
			"et mel, aliquip voluptatibus duo ad, est iusto homero et. Mel nonumy tritani cu. Eros repudiare ut eos, vim hinc nostro ne. Nec essent" +
			"vituperata et, quod mazim et quo, integre vivendum ad nam. Minim scripta pertinacia pri ei, populo causae ea vim. An legendos tractatos" +
			"comprehensam pro, omnes primis principes ei usu. An eum porro maiestatis expetendis, audiam interesset id pri. An vim suas aperiam." +
			"Dolor timeam per ad. Commodo eripuit assentior no qui, nostro lucilius usu id. Id rebum aperiri assentior has, ancillae propriae" +
			"legendos qui eu. Ex mel tempor officiis consulatu, dictas delenit quo eu. Id errem soluta adipisci quo, ea vidit albucius temporibus" +
			"nec, qui ei temporibus comprehensam. Cu usu quem porro fugit, suas epicuri et sea. Elit clita pro an. Eos ut alia everti molestie." +
			"Vocent luptatum pro cu, et sumo minim sonet duo, eu quot fierent consulatu pri. Duo no melius utamur menandri, cum ei adhuc hendrerit." +
			"Eu his prima facete alterum, ius mutat decore et. Virtute interesset cum ex, tota viderer tibique te nam, no sed unum abhorreant." +
			"Paulo decore reformidans vis no, vis dico tractatos maiestatis no. In duo utamur delectus qualisque, ex habemus ancillae dissentiunt" +
			"mea. Vis impedit maluisset splendide ex, cu agam dignissim sententiae mei. Posse audiam aperiam eu mea, latine lobortis posidonium eu" +
			"mel no etiam nonumy imperdiet duo. Ius cu nullam accusam. Ex eum sanctus platonem, legere facilis appetere duo in, pri id vivendo" +
			"vituperata. Quaeque abhorreant vim ut, id delicata philosophia mea. Ferri affert inciderint sed et, ne cum dicam vituperata instructior," +
			"ius te invenire accusamus. Ex ius augue nonumes tibique, eu posse abhorreant vituperata mea. An tantas dolorem vel, pro ullum volumus" +
			"dignissim at. Vis accusam corrumpit democritum ex. Albucius euripidis ad mei. Et erat aeterno contentiones vis. Eam feugait definitionem" +
			"no. Magna oratio definitionem ei vel, vocent pericula quaerendum mel te, voluptaria definitiones has te. Pri ei prodesset cotidieque," +
			"id mel impedit luptatum referrentur, alia copiosae tractatos in quo. Ea quidam volutpat pri, ex utroque civibus eos. Ut vitae moderatius" +
			"mel, munere definiebas usu at. Ea luptatum menandri consequuntur per, nec ne nullam dictas contentiones. Has soleat rationibus ut." +
			"In omnes.", { keyword: "keyword" } );
		let result = keywordDensityAssessment.getResult( paper, factory.buildMockResearcher( {
			getKeywordDensity: 0.41,
			keywordCount: 2,
		}, true ), i18n );
		expect( result.getScore() ).toBe( 4 );
		expect( result.getText() ).toBe( "The focus keyword was found 2 times. That's less than the recommended minimum of 3 times for a text of this length." );
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
