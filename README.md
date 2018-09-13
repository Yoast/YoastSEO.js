[![Build Status](https://travis-ci.org/Yoast/YoastSEO.js.svg?branch=master)](https://travis-ci.org/Yoast/js-text-analysis)
[![Code Climate](https://codeclimate.com/repos/5524f75d69568028f6000fda/badges/f503961401819f93c64c/gpa.svg)](https://codeclimate.com/repos/5524f75d69568028f6000fda/feed)
[![Test Coverage](https://codeclimate.com/repos/5524f75d69568028f6000fda/badges/f503961401819f93c64c/coverage.svg)](https://codeclimate.com/repos/5524f75d69568028f6000fda/coverage)
[![Inline docs](http://inch-ci.org/github/yoast/yoastseo.js.svg?branch=master)](http://inch-ci.org/github/yoast/yoastseo.js)

# YoastSEO.js

Text analysis and assessment library in JavaScript. This library can generate interesting metrics about a text and assess these metrics to give you an assessment which can be used to improve the text.

![Screenshot of the assessment of the given text](/images/assessment.png?raw=true)

Also included is a preview of the Google search results which can be assessed using the library.

## Installation

You can install YoastSEO.js using npm:

```bash
npm install yoastseo
```

## Usage

If you want the complete experience with UI and everything you can use the `App`. You need to have a few HTML elements to make this work: A snippet preview container, a focusKeyword input element and a content input field.

```js
var SnippetPreview = require( "yoastseo" ).SnippetPreview;
var App = require( "yoastseo" ).App;

window.onload = function() {
	var focusKeywordField = document.getElementById( "focusKeyword" );
	var contentField = document.getElementById( "content" );

	var snippetPreview = new SnippetPreview({
		targetElement: document.getElementById( "snippet" )
	});

	var app = new App({
		snippetPreview: snippetPreview,
		targets: {
			output: "output"
		},
		callbacks: {
			getData: function() {
				return {
					keyword: focusKeywordField.value,
					text: contentField.value
				};
			}
		}
	});

	app.refresh();

	focusKeywordField.addEventListener( 'change', app.refresh.bind( app ) );
	contentField.addEventListener( 'change', app.refresh.bind( app ) );
};
```

You can also invoke internal components directly to be able to work with the raw data. To get metrics about the text you can use the `Researcher`:

```js
var Researcher = require( "yoastseo" ).Researcher;
var Paper = require( "yoastseo" ).Paper;

var researcher = new Researcher( new Paper( "Text that has been written" ) );

console.log( researcher.getResearch( "wordCountInText" ) );
```

## Supported languages
|                     | English | German | Dutch | French | Spanish  | Italian | Japanese | Portuguese | Russian | Catalan | Polish |
|---------------------|---------|--------|-------|--------|---------|---------|----------|----------|----------|----------|----------
| Transition words    | ✅      | ✅     | ✅    | ✅      | ✅       | ✅       |          | ✅        | ✅       | ✅        | ✅        |
| Flesch reading ease  | ✅      | ✅     | ✅    | ✅      | ✅       | ✅       | ❌<sup>2</sup>        |          | ✅        |          | ❌<sup>3</sup>
| Passive voice       | ✅      | ✅     | ✅     | ✅     | ✅       | ✅       | ❌<sup>2</sup>        |          | ✅       |          | ✅        |
| Sentence beginnings | ✅      | ✅     | ✅    | ✅     | ✅       | ✅       | ❌<sup>2</sup>        |          | ✅       |          | ✅        |
| Sentence length<sup>1</sup>     | ✅      | ✅     | ✅    | ✅     | ✅       | ✅       |          |          | ✅       |          | ✅        |
| Function words (for Internal linking and insights)      | ✅      | ✅     | ✅    | ✅     | ✅       | ✅       |          | ✅        | ✅       |          | ✅        |

<sup>1</sup> This means the default upper limit of 20 words has been verified for this language, or the upper limit has been changed.

<sup>2</sup> This means that this feature doesn't make sense for the specific language.

<sup>3</sup> There is no existing Flesch reading ease formula for Polish

The following readability assessments are available for all languages: 
- sentence length (with a default upper limit of 20 words, see<sup>1</sup> above )
- paragraph length
- subheading distribution

## Change log

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Documentation

The data that will be analyzed by YoastSEO.js can be modified by plugins. Plugins can also add new research and assessments. To find out how to do this, checkout out the [customization documentation](./docs/Customization.md).

## Testing

```bash
npm test
```

Generate coverage using the `--coverage` flag.

## Code style

To test your code style:

```bash
grunt check
```

## Testing with Yoast SEO

In the YoastSEO.js directory, run:

```bash
npm link
```

Then, in the [Yoast SEO](https://github.com/Yoast/wordpress-seo) directory, assuming you have a complete development version, run:

```bash
npm link yoastseo
grunt build:js && grunt build:css
```

From that point on you need to re-do `grunt build:js && grunt build:css` when you make changes to YoastSEO.js. If you want to unlink, simply do:

```bash
npm unlink yoastseo
```

## Contributing

Please see [CONTRIBUTING](.github/CONTRIBUTING.md) for details.

## Security

If you discover any security related issues, please email security [at] yoast.com instead of using the issue tracker.

## Credits

- [Team Yoast](https://github.com/orgs/Yoast/people)
- [All Contributors](https://github.com/Yoast/YoastSEO.js/graphs/contributors)

## License

We follow the GPL. Please see [License](LICENSE) file for more information.
