// External dependencies.
import React, { Fragment } from "react";

// YoastSEO.js dependencies.
import testPapers from "yoastspec/fullTextTests/testTexts";
import Paper from "../../../src/values/Paper";

// Internal dependencies.
import Results from "./components/Results";
import Collapsible from "./components/Collapsible";

import WorkerStatus from "./components/WorkerStatus";
import Controls from "./components/Controls";
import Markings from "./components/Markings";
import { connect } from "react-redux";
import { setResults } from "./redux/actions/results";
import { setConfigurationAttribute } from "./redux/actions/configuration";
import Inputs from "./components/Inputs";
import { setStatus } from "./redux/actions/worker";

class App extends React.Component {
	/**
	 * Initializes the App component.
	 *
	 * @param {Object} props               The props.
	 * @param {Object} props.configuration The store configuration.
	 * @param {Object} props.paper         The store paper.
	 * @param {Object} props.results       The store analyses results.
	 * @param {Object} props.actions       The dispatch actions.
	 *
	 * @constructor
	 */
	constructor( props ) {
		super( props );

		this.initialize = this.initialize.bind( this );
		this.analyze = this.analyze.bind( this );
		this.analyzeSpam = this.analyzeSpam.bind( this );

		this.initialize();
	}

	/**
	 * Initialize the analysis worker.
	 *
	 * @returns {void}
	 */
	initialize() {
		const { configuration, worker } = this.props;

		worker.initialize( configuration )
			.then( data => console.log( "initialization done!", data ) )
			.then( this.analyze );
	}

	/**
	 * Requests the analyses results from the worker.
	 *
	 * @param {paper} paper The paper to analyze.
	 *
	 * @returns {void}
	 */
	analyze( paper = this.props.paper ) {
		const { setWorkerStatus, worker } = this.props;

		paper = Paper.parse( paper );

		setWorkerStatus( "analyzing" );

		worker.analyze( paper )
			.then( ( { result } ) => {
				setWorkerStatus( "idling" );

				this.props.setResults( {
					readability: result.readability.results,
					seo: result.seo[ "" ].results,
				} );
		    } );
	}

	/**
	 * Runs analysis on the full-text test papers.
	 *
	 * @returns {void}
	 */
	analyzeSpam() {
		for ( let i = 0; i < 10; i++ ) {
			testPapers.forEach( ( { paper: paper } ) => {
				this.analyze( {
					text: paper._text,
					...paper._attributes,
				} );
			} );
		}
	}

	/**
	 * Renders the app.
	 *
	 * @returns {ReactElement} The app.
	 */
	render() {
		return (
			<Fragment>
				<h1>YoastSEO.js development tool</h1>

				<Collapsible title="Input">
					<Inputs />
				</Collapsible>

				<Collapsible title="Results">
					<Results />
				</Collapsible>

				<Collapsible title="Worker status">
					<WorkerStatus />
				</Collapsible>

				<Collapsible title="Controls">
					<Controls
						onInitialize={ this.initialize }
						onAnalyze={ this.analyze }
						onAnalyzeSpam={ this.analyzeSpam }
					/>
				</Collapsible>

				<Collapsible title="Markings">
					<Markings />
				</Collapsible>

				<ul>
					<li>Debugging information</li>
					<li>Worker communication</li>
					<li>Information about when it is refreshing</li>
					<li>Buttons for standard texts in different languages</li>
					<li>Language switcher</li>

					<li>Input fields for everything</li>
					<li>Total scores</li>
					<li>Analysis results</li>

					<li>All research data</li>
					<li>Relevant words</li>

					<li>Performance information</li>
					<li>Re-order collapsibles</li>
				</ul>

				Design Todos:
				<ul>
					<li>Overall score</li>
				</ul>

				My todos:
				<ul>
					<li>Include place to mark text</li>
				</ul>
			</Fragment>
		);
	}
}

export default connect(
	( state ) => {
		return {
			useKeywordDistribution: state.configuration.useKeywordDistribution,
			paper: state.paper,
		};
	},
	( dispatch ) => {
		return {
			setResults: ( ...args ) => dispatch( setResults( ...args ) ),
			setConfigurationAttribute: ( ...args ) => dispatch( setConfigurationAttribute( ...args ) ),
			setWorkerStatus: ( status ) => dispatch( setStatus( status ) ),
		};
	}
)( App );
