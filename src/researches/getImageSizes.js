import getImageSources from "../stringProcessing/getImageSources";

/**
 * Checks a text for images and returns their file sizes.
 *
 * Note: only checks locally hosted images.
 *
 * @param {Object} paper The paper to get the text from.
 * @returns {Object} An object with sources as keys and file sizes as values.
 */
export default function( paper ) {
	const imageSources = getImageSources( paper.getText() );
}
