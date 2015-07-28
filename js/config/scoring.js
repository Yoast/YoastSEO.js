YoastSEO_analyzerScoreRating = 9;
YoastSEO_analyzerScoring = [
    {
        scoreName: "wordCount",
        scoreArray: [
            {min: 300, score: 9, text: translation.wordCountAbove },
            {min: 250, max: 299, score: 7, text: translation.wordCountSlightlyBelow},
            {min: 200, max: 249, score: 5, text: translation.wordCountBelow},
            {min: 100, max: 199, score: -10, text: translation.wordCountBelow},
            {min: 0, max: 99, score: -20, text: translation.wordCountFarBelow}
        ],
        replaceArray: [
            {name: "wordCount",position: "%1$d",source: "matcher"},
            {name: "recommendedWordcount",position: "%2$d",value: 300}

        ]
    },
    {
        scoreName: "keywordDensity",
        scoreArray: [
            {min: 3.5, score: -50, text: translation.keywordDensityWayOver},
            {min: 2.5, max: 3.49, score: -10, text: translation.keywordDensityOver},
            {min: 0.5, max: 2.49, score: 9, text: translation.keywordDensityGood},
            {min: 0, max: 0.49, score: 4, text: translation.keywordDensityLow}
        ],
        replaceArray: [
            {name: "keywordDensity", position: "%1$f", source: "matcher"},
            {name: "keywordCount", position: "%1$d", sourceObj: ".refObj.__store.keywordCount"}
        ]
    },
    {
        scoreName: "linkCount",
        scoreArray: [
            {matcher: "total", min: 0, max: 0, score: 6, text: translation.linkCountNoLink},
            {matcher: "totalKeyword", min: 1, score: 2, text: translation.linkCountOtherPage},
            {type: "externalAllNofollow", score: 7, text: translation.linkCountAllNoFollow},
            {type: "externalHasNofollow", score: 8, text: translation.linkCountHasNoFollow},
            {type: "externalAllDofollow", score: 9, text: translation.linkCountAllDoFollow}
        ],
        replaceArray: [
            {name: "links", position: "%1$s", sourceObj: ".result.externalTotal"},
            {name: "nofollow", position: "%2$s", sourceObj: ".result.externalNofollow"},
            {name: "dofollow", position: "%3$s", sourceObj: ".result.externalDofollow"}
        ]
    },
    {
        scoreName: "fleschReading",
        scoreArray: [
            {min: 90, score: 9, text: "<%text%>", resultText: translation.fleschReadingVeryEasy, note: ""},
            {min: 80, max: 89.9, score: 9, text: "<%text%>", resultText: translation.fleschReadingEasy, note: ""},
            {min: 70, max: 79.9, score: 8, text: "<%text%>", resultText: translation.fleschReadingFairlyEasy, note: ""},
            {min: 60, max: 69.9, score: 7, text: "<%text%>", resultText: translation.fleschReadingOK, note: ""},
            {min: 50, max: 59.9, score: 6, text: "<%text%>", resultText: translation.fleschReadingFairlyDifficult, note: translation.fleschReadingFairlyDifficultNote},
            {min: 30, max: 49.9, score: 5, text: "<%text%>", resultText: translation.fleschReadingDifficult, note: translation.fleschReadingDifficultNote},
            {min: 0, max: 29.9, score: 4, text: "<%text%>", resultText:  translation.fleschReadingVeryDifficult, note: translation.fleschReadingVeryDifficultNote}
        ],
        replaceArray: [
            {name: "scoreText", position: "<%text%>", value: translation.fleschReadingScoreText},
            {name: "text", position:"%1$s", sourceObj: ".result"},
            {name: "scoreUrl", position: "%2$s", value: "<a href='https://en.wikipedia.org/wiki/Flesch-Kincaid_readability_test#Flesch_Reading_Ease' target='new'>Flesch Reading Ease</a>"},
            {name: "resultText", position: "%3$s", scoreObj: "resultText"},
            {name: "note", position: "%4$s", scoreObj: "note"}
        ]
    },
    {
        scoreName: "metaDescriptionLength",
        metaMinLength: 120,
        metaMaxLength: 156,
        scoreArray: [
            {max: 0, score: 1, text: translation.metaLengthNoMeta},
            {max: 120, score: 6, text: translation.metaLengthShort},
            {min: 156, score: 6, text: translation.metaLengthLong},
            {min: 120, max: 156, score: 9, text: translation.metaLengthGood}
        ],
        replaceArray: [
            {name: "minCharacters", position: "%1$d", value: 120},
            {name: "maxCharacters", position: "%2$d", value: 156}
        ]
    },
    {
        scoreName: "metaDescriptionKeyword",
        scoreArray: [
            {min: 1, score: 9, text: translation.metaKeywordHasKeyword},
            {max: 0, score: 3, text: translation.metaKeywordNoKeyword}
        ]
    },{
        scoreName: "firstParagraph",
        scoreArray: [
            {max: 0, score: 3, text: translation.firstParagraphNoKeyword},
            {min: 1, score: 9, text: translation.firstParagraphHasKeyword}
        ]
    },{
        scoreName: "stopwordKeywordCount",
        scoreArray: [
            {matcher: "count", min: 1, score: 5, text: translation.stopwordKeyword},
            {matcher: "count", max: 0, score: 0, text: ""}
        ],
        replaceArray: [
            {name: "scoreUrl", position: "%1$s", value: translation.stopwordUrl},
            {name: "stopwords", position: "%2$s", sourceObj: ".result.matches"}
        ]
    },{
        scoreName: "subHeadings",
        scoreArray: [
            {matcher: "count", max: 0, score: 7, text: translation.subHeadingsNone},
            {matcher: "matches", max: 0, score: 3, text: translation.subHeadingsNoKeyword},
            {matcher: "matches", min: 1, score: 9, text: translation.subHeadingsKeyword}
        ],
        replaceArray: [
            {name: "count", position: "%1$d", sourceObj: ".result.count"},
            {name: "matches", position: "%2$d", sourceObj: ".result.matches"}
        ]
    },{
        scoreName: "pageTitleLength",
        scoreArray: [
            {max: 0, score: 1, text: translation.pageTitleLengthNone},
            {max: 40, score: 6, text: translation.pageTitleLengthBelow},
            {min: 70, score: 6, text: translation.pageTitleLengthAbove},
            {min: 40, max: 70, score: 9, text: translation.pageTitleLengthGood}
        ],
        replaceArray:[
            {name: "minLength", position: "%1$d", value: 40},
            {name: "maxLength", position: "%2$d", value: 70},
            {name: "length", position: "%3$d", source: "matcher"}
        ]
    },{
        scoreName: "pageTitleKeyword",
        scoreTitleKeywordLimit: 0,
        scoreArray:[
            {matcher: "matches", max: 0, score: 2, text: translation.pageTitleKeywordNoKeyword},
            {matcher: "position", max: 1, score: 9, text: translation.pageTitleKeywordKeyword},
            {matcher: "position", min: 1, score: 6, text: translation.pageTitleKeywordNotBegin}
        ],
        replaceArray:[
            {name: "keyword", position: "%1$s", sourceObj: ".refObj.config.keyword"}
        ]
    },{
        scoreName: "urlKeyword",
        scoreArray:[
            {min: 1, score: 9, text: translation.urlKeywordHasKeyword},
            {max: 0, score: 6, text: translation.urlKeywordNoKeyword}
        ]
    },{
        scoreName: "urlLength",
        scoreArray:[
            {type: "urlTooLong", score: 5, text: translation.urlLengthTooLong}
        ]
    },{
        scoreName: "urlStopwords",
        scoreArray:[
            {min: 1, score: 5, text: translation.urlStopwordsHasStopwords}
        ]
    },{
        scoreName: "imageCount",
        scoreArray:[
            {matcher: "total", max: 0, score: 3, text: translation.imageCountNone},
            {matcher: "noAlt", min: 1, score: 5, text: translation.imageCountNoAlt},
            {matcher: "alt", min: 1, score: 5, text: translation.imageCountAltNoKeyword},
            {matcher: "altKeyword", min: 1, score: 9, text: translation.imageCountAltKeyword}
        ]
    },{
        scoreName: "keywordDoubles",
        scoreArray:[
            {matcher: "count", max: 0, score: 9, text: translation.keywordDoublesNone},
            {matcher: "count", max: 1, score: 6, text: translation.keywordDoublesOnce},
            {matcher: "count", min: 1, score: 1, text: translation.keywordDoublesMore}
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
