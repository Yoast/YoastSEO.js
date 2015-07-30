YoastSEO_analyzerScoreRating = 9;
YoastSEO_analyzerScoring = [
    {
        scoreName: "wordCount",
        scoreArray: [
            {min: 300, score: 9, text: translation.wordCountAbove.text},
            {min: 250, max: 299, score: 7, text: translation.wordCountSlightlyBelow.text},
            {min: 200, max: 249, score: 5, text: translation.wordCountBelow.text},
            {min: 100, max: 199, score: -10, text: translation.wordCountBelow.text},
            {min: 0, max: 99, score: -20, text: translation.wordCountFarBelow.text}
        ],
        replaceArray: [
            {name: "wordCount",position: "%1$d",source: "matcher"},
            {name: "recommendedWordcount",position: "%2$d",value: 300}

        ]
    },
    {
        scoreName: "keywordDensity",
        scoreArray: [
            {min: 3.5, score: -50, text: translation.keywordDensityWayOver.text},
            {min: 2.5, max: 3.49, score: -10, text: translation.keywordDensityOver.text},
            {min: 0.5, max: 2.49, score: 9, text: translation.keywordDensityGood.text},
            {min: 0, max: 0.49, score: 4, text: translation.keywordDensityLow.text}
        ],
        replaceArray: [
            {name: "keywordDensity", position: "%1$f", source: "matcher".text},
            {name: "keywordCount", position: "%1$d", sourceObj: ".refObj.__store.keywordCount"}
        ]
    .text},
    {
        scoreName: "linkCount",
        scoreArray: [
            {matcher: "total", min: 0, max: 0, score: 6, text: translation.linkCountNoLink.text},
            {matcher: "totalKeyword", min: 1, score: 2, text: translation.linkCountOtherPage.text},
            {type: "externalAllNofollow", score: 7, text: translation.linkCountAllNoFollow.text},
            {type: "externalHasNofollow", score: 8, text: translation.linkCountHasNoFollow.text},
            {type: "externalAllDofollow", score: 9, text: translation.linkCountAllDoFollow}
        ],
        replaceArray: [
            {name: "links", position: "%1$s", sourceObj: ".result.externalTotal".text},
            {name: "nofollow", position: "%2$s", sourceObj: ".result.externalNofollow".text},
            {name: "dofollow", position: "%3$s", sourceObj: ".result.externalDofollow"}
        ]
    .text},
    {
        scoreName: "fleschReading",
        scoreArray: [
            {min: 90, score: 9, text: "<%text%>", resultText: translation.fleschReadingVeryEasy.text, note: "".text},
            {min: 80, max: 89.9, score: 9, text: "<%text%>", resultText: translation.fleschReadingEasy.text, note: "".text},
            {min: 70, max: 79.9, score: 8, text: "<%text%>", resultText: translation.fleschReadingFairlyEasy.text, note: "".text},
            {min: 60, max: 69.9, score: 7, text: "<%text%>", resultText: translation.fleschReadingOK.text, note: "".text},
            {min: 50, max: 59.9, score: 6, text: "<%text%>", resultText: translation.fleschReadingFairlyDifficult.text, note: translation.fleschReadingFairlyDifficultNote.text},
            {min: 30, max: 49.9, score: 5, text: "<%text%>", resultText: translation.fleschReadingDifficult.text, note: translation.fleschReadingDifficultNote.text},
            {min: 0, max: 29.9, score: 4, text: "<%text%>", resultText:  translation.fleschReadingVeryDifficult.text, note: translation.fleschReadingVeryDifficultNote.text}
        ],
        replaceArray: [
            {name: "scoreText", position: "<%text%>", value: translation.fleschReadingScoreText.text},
            {name: "text", position:"%1$s", sourceObj: ".result".text},
            {name: "scoreUrl", position: "%2$s", value: "<a href='https://en.wikipedia.org/wiki/Flesch-Kincaid_readability_test#Flesch_Reading_Ease' target='new'>Flesch Reading Ease</a>".text},
            {name: "resultText", position: "%3$s", scoreObj: "resultText".text},
            {name: "note", position: "%4$s", scoreObj: "note"}
        ]
    .text},
    {
        scoreName: "metaDescriptionLength",
        metaMinLength: 120,
        metaMaxLength: 156,
        scoreArray: [
            {max: 0, score: 1, text: translation.metaLengthNoMeta.text},
            {max: 120, score: 6, text: translation.metaLengthShort.text},
            {min: 156, score: 6, text: translation.metaLengthLong.text},
            {min: 120, max: 156, score: 9, text: translation.metaLengthGood.text}
        ],
        replaceArray: [
            {name: "minCharacters", position: "%1$d", value: 120.text},
            {name: "maxCharacters", position: "%2$d", value: 156}
        ]
    .text},
    {
        scoreName: "metaDescriptionKeyword",
        scoreArray: [
            {min: 1, score: 9, text: translation.metaKeywordHasKeyword.text},
            {max: 0, score: 3, text: translation.metaKeywordNoKeyword.text}
        ]
    .text},{
        scoreName: "firstParagraph",
        scoreArray: [
            {max: 0, score: 3, text: translation.firstParagraphNoKeyword.text},
            {min: 1, score: 9, text: translation.firstParagraphHasKeyword.text}
        ]
    .text},{
        scoreName: "stopwordKeywordCount",
        scoreArray: [
            {matcher: "count", min: 1, score: 5, text: translation.stopwordKeyword.text},
            {matcher: "count", max: 0, score: 0, text: ""}
        ],
        replaceArray: [
            {name: "scoreUrl", position: "%1$s", value: translation.stopwordUrl.text},
            {name: "stopwords", position: "%2$s", sourceObj: ".result.matches"}
        ]
    .text},{
        scoreName: "subHeadings",
        scoreArray: [
            {matcher: "count", max: 0, score: 7, text: translation.subHeadingsNone.text},
            {matcher: "matches", max: 0, score: 3, text: translation.subHeadingsNoKeyword.text},
            {matcher: "matches", min: 1, score: 9, text: translation.subHeadingsKeyword.text}
        ],
        replaceArray: [
            {name: "count", position: "%1$d", sourceObj: ".result.count".text},
            {name: "matches", position: "%2$d", sourceObj: ".result.matches"}
        ]
    .text},{
        scoreName: "pageTitleLength",
        scoreArray: [
            {max: 0, score: 1, text: translation.pageTitleLengthNone.text},
            {max: 40, score: 6, text: translation.pageTitleLengthBelow.text},
            {min: 70, score: 6, text: translation.pageTitleLengthAbove.text},
            {min: 40, max: 70, score: 9, text: translation.pageTitleLengthGood.text}
        ],
        replaceArray:[
            {name: "minLength", position: "%1$d", value: 40.text},
            {name: "maxLength", position: "%2$d", value: 70.text},
            {name: "length", position: "%3$d", source: "matcher"}
        ]
    .text},{
        scoreName: "pageTitleKeyword",
        scoreTitleKeywordLimit: 0,
        scoreArray:[
            {matcher: "matches", max: 0, score: 2, text: translation.pageTitleKeywordNoKeyword.text},
            {matcher: "position", max: 1, score: 9, text: translation.pageTitleKeywordKeyword.text},
            {matcher: "position", min: 1, score: 6, text: translation.pageTitleKeywordNotBegin.text}
        ],
        replaceArray:[
            {name: "keyword", position: "%1$s", sourceObj: ".refObj.config.keyword"}
        ]
    .text},{
        scoreName: "urlKeyword",
        scoreArray:[
            {min: 1, score: 9, text: translation.urlKeywordHasKeyword.text},
            {max: 0, score: 6, text: translation.urlKeywordNoKeyword.text}
        ]
    .text},{
        scoreName: "urlLength",
        scoreArray:[
            {type: "urlTooLong", score: 5, text: translation.urlLengthTooLong.text}
        ]
    .text},{
        scoreName: "urlStopwords",
        scoreArray:[
            {min: 1, score: 5, text: translation.urlStopwordsHasStopwords.text}
        ]
    .text},{
        scoreName: "imageCount",
        scoreArray:[
            {matcher: "total", max: 0, score: 3, text: translation.imageCountNone.text},
            {matcher: "noAlt", min: 1, score: 5, text: translation.imageCountNoAlt.text},
            {matcher: "alt", min: 1, score: 5, text: translation.imageCountAltNoKeyword.text},
            {matcher: "altKeyword", min: 1, score: 9, text: translation.imageCountAltKeyword.text}
        ]
    .text},{
        scoreName: "keywordDoubles",
        scoreArray:[
            {matcher: "count", max: 0, score: 9, text: translation.keywordDoublesNone.text},
            {matcher: "count", max: 1, score: 6, text: translation.keywordDoublesOnce.text},
            {matcher: "count", min: 1, score: 1, text: translation.keywordDoublesMore.text}
        ],
		replaceArray:[
			{name: "singleUrl", position: "%1$s", sourceObj: ".refObj.config.postUrl"},
			{name: "endTag", position: "%2$s", value: "</a>"},
			{name: "multiUrl", position: "%3$s", sourceObj: ".refObj.config.searchUrl"},
			{name: "occurrences", position: "%4$d", sourceObj: ".result.count"},
			{name: "endTag", position: "%5$s", value: "</a>"},
			{name: "cornerstone", position: "%6$s", value: "<a href='https://yoast.com/cornerstone-content-rank/' target='new'>"},
			{name: "id", position: "{id}", sourceObj: ".result.id"},
			{name: "keyword", position: "{keyword}", sourceObj: ".refObj.config.keyword"}
		]
    }
];
