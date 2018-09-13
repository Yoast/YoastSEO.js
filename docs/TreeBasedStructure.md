# Tree based structure

## Goals

* Provide element & offset precise markings.
* Improve speed of subsequent runs by using a form of caching. (Improves experience of real-time markings & Re-use results between markings and results)
* In non-one-text editors, allow the already existing tree to be input directly. To be able to provide 

Stretch goals:

* Incremental analyses: When doing our initial analysis, we could be halfway done creating a tree and a new analysis could be triggered. It would be nice to be able to stop our current analysis, but not throw away the work we've done.

## Exploration

### Node types

We are going to new several types of nodes:

* `HtmlNode` - Representing an html tag that should not be converted to one of the other nodes. This can include things we want to ignore, such as `<script>`, `<style>` and `<pre>` tags.
* `WhitespaceNode` - Representing a piece of text that is only whitespace.
* `Heading` - Representing a heading, denoting structure in the text. From HTML these are easily determined by looking at `h1-6` tags.
* `Paragraph` - Representing a paragraph in the text.
* `Sentence` - Representing a sentence in a text.
* `Word` - Representing a word in a sentence.
* `PunctuationNode` - Representing punctuation in a sentence.
* `Image` - Representing an HTML image.
* `Text` - Representing the whole text. This is a container for the whole text. The root node.

* `CustomNode` - Representing a Node that YoastSEO.js doesn't have any knowledge about, but is useful for non-one-text editors such as Gutenberg.

These properties should be shared by all notes:

```
{
	startOffset: number,
	length: number, // This should be the total length including children.
	// ?? ownLength: number, // The nodes own length?
}
```

All nodes need to have a startOffset and a length. This is necessary so we can calculate the precise location of marks. It also allows us to do caching.

Example:

```
text.setChildren( [
	new Heading( {
		level: 1,
		children: [
			new Word( "Amazing" ),
			new Punctuation( "!" ),
		],
		startOffset: 2,
		length: 17,
	} ),
	new Paragraph( {
		children: [
			new Sentence( {
				children: [
					new Word( "This", { startOffset: 0, lengt: 4 } ),
					new Word( "is" ),
					new Word( "a" ),
					new Word( "sentence" ),
					new Punctuation( "." ),
				],
				startOffset: 3,
			} ),
			new Sentence( {
				children: [
					new Word( "Another" ),
					new Word( "sentence" ),
					new Word( "bites" ),
					new Word( "the" ),
					new Word( "dust" ),
					new Punctuation( "." ),
				],
				startOffset: 20,
			} ),
		],
		startOffset: 20,
	} ),
	new Html( {
		tag: "script",
	} ),
] );
```

#### Custom nodes

* `GutenbergBlock` could be a node in our tree. This would make it relatively easy to run analyses on only that Gutenblock, because we would setup our research/researcher to accept any node in the tree and traverse it.

Getting to the actual content in a gutenberg block isn't that easy though. To get the actually content of a Gutenblock you need to serialize it (convert to output). This is relatively slow and Gutenberg itself only does this when saving a post. Writing block adapters for core blocks is easy so we should do that. But for all blocks we have not written an adapter we need to serialize the block. But perhaps this won't be too bad, because the current situation is that we serialize ALL blocks to be able to analyze the text in the Gutenberg editor.

* To be able to insert the Gutenblocks we need to have an extension to our parsing step.
* We also need an extension on our marking step, because we need to mark something in the correct block.

Custom nodes would look like this:

```js
text.setChildren( [
	new GutenbergBlock( {
		clientId: "client-id-of-the-block",
		type: "core/paragraph",
		children: [
			new Paragraph(),
		],
	} ),
] );
```

### Research

All of our research should be rewritten to be able to accept a node. The research can then traverse the children to get the relevant information. This would be one way to solve it.

The other way would be to have the researcher traverse the tree and call any research that is interested in that specific node. This would be depth first. The reason for this is because certain properties on words can then be used to determine if a sentence is something. So all words are marked is `isTransitionWord` and afterwards a sentence can just check if any of its words has the property `isTransitionWord` set to `true`.

### Caching

My initial thought is that we compare the text in the node with the new text. We do this by slicing the new text based on the `startOffset` and the `length` properties present in the node. If that sliced text exactly equals the text in the node, we know nothing has changed for this node in the text and we can completely reuse the node.

### HTML parsers

We need a slightly smart HTML parser because if the HTML parsing step fails we end up with garbage. So we absolutely want to avoid this. When using `htmlparser2` it just accepted `<head>` tags as a tag even though in context it is obvious that that tag doesn't mean anything there.

### Word/Sentence parsing rules

```
"Hallo dit is een ding".
```

should be parsed as:

Sentence
	Punctuation ["]
	Word [Hallo]
	Word [dit]
	Word [is]
	Word [een]
	Word [ding]
	Punctuation ["]
	Punctuation [.]


```
Omar's house.
```

should be parsed as:

Sentence
	Word [Omar's]
	Word [house]
	Punctuation [.]

### Possible pipeline

* HTML Parser
* Sentence/Word parser

### Testing tools

We need some tools that make testing easier. We don't want to have to do `new Word()`, `new Sentence()` all over the place.

Something like this:

```
const input = "This is a sentence.";
const expected = {
	"Sentence": [
		"Word [This]",
		"Word [is]",
		"Word [a]",
		"Word [sentence]",
		"Punctuation [.]",
	],
};
```

This way it is easier to write tests and to keep them updated when we find bugs.

### Proposed architecture




## Alain's input

Hi Anton,
I can think of a few ways of achieving this, that would make longer content work in a more scalable way.
One example:
Split the content up in parts (can be hierarchical), and then cache the analysis result under a key that uses an MD5 of the part of the content it represents.
If the content changes, you'll get a cache miss and need to re-analyse. Regular purging keeps the cache size in check.
If you do this hierarchically, you have what is called russian-doll-caching. So, MD5 of entire content -> MD5 of separate paragraphs for example. If the whole MD5 matches, there's no point in going through the paragraphs.

## Questions

* How can we figure out if using the tree will actually be faster. My hypothesis is that using the tree will be faster than using the regexes to do everything, but I would like to prove this hypothesis.
	* The reason for my hypothesis is that we currently do a lot of work locally that is completely useless once we have a tree. Such as stripping spaces just before determining which words are in the text.
	* My proposal: Create a prototype that works with transition words (one of the slowest) and compare and contrast the two methods.
* Do we want Word's to share instances for the same word?
	* Advantage: For each word in the text we only ever have to determine some research only once. Such as whether a word is a transition word.
	* Advantage: Would cost less memory.
	* Disadvantage: We couldn't store positional information on words.
	* Consideration: We could share the same instance, up until the moment we need positional information and then we could clone the instance.
* Do we put whitespace into the tree to keep track of it? Or do we make the whitespace implicit based on the startOffset's of nodes. If we make whitespace implicit we cannot reconstruct the tree. Is that a problem?
* Should offsets be relative or absolute?

## Todos

* Investigate whether using `parse5` would increase our bundle sizes.
* Convert the current parser to `parse5`, because it is a lot more robust.

## Meta todos

* Rewrite all research to work with the tree. 
	* We might be able to do this iteratively, but that could cause a performance hit while not everything is rewritten yet.
* Decide how to deal with interesting HTML structures
	* Lists
	* Tables
* Come up with an architecture to extend our parsing step.
* Come up with an architecture to extend our marking step.

## Discovery todos

* Handle diacritics

## Uit architecten overleg

* Concept van actieve sentence, actieve blok. Run actieve dingen met high prio.
* Subset van analyses runnen op actieve node, omdat sentence level niet nodig is op paragraph.
* Diff op welke nodes changed zijn.
* `StructuralNode` / `IgnoredNode`. Zoeken naar previous art.
* 3 Formats:
	1. Origineel / Structural / source format
	2. Semantic level Tussen (1 op 1 naar origineel) 
	3. Linguistic formaat
* Meer nodes:
	* Syllables een node. Stam van woorden met een property
	* Media
* Discuss with Natalia what the best way forward is linguistically
