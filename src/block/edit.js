/**
 * External dependencies
 */
import axios from 'axios';
var HtmlToReactParser = require('html-to-react').Parser;
const { Component, Fragment } = wp.element;

const { __ } = wp.i18n;

const {
	PanelBody,
	Placeholder,
	QueryControls,
	RangeControl,
	SelectControl,
	Spinner,
	TextControl,
	ToggleControl,
	Toolbar,
	withAPIData,
	ColorPalette,
	Button,
} = wp.components;

const {
	InspectorControls,
	BlockControls,
	BlockAlignmentToolbar,
	MediaUpload,
	RichText,
	AlignmentToolbar,
	PanelColorSettings,
} = wp.editor;

// Import block dependencies and components
import classnames from 'classnames';


class WP_Plugin_Card extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			type: this.props.attributes.type,
			slug: this.props.attributes.slug,
			loading: this.props.attributes.loading,
			card_loading: false,
			html: this.props.attributes.html,
			image: this.props.attributes.image,
			containerid: this.props.attributes.containerid,
			margin: this.props.attributes.margin,
			clear: this.props.attributes.clear,
			expiration: this.props.attributes.expiration,
			ajax: this.props.attributes.ajax,
			scheme: this.props.attributes.scheme,
			layout: this.props.attributes.layout,
			width: this.props.attributes.width,
		};
	}

	slugChange = (event) => {
		this.setState( {
			slug: event.target.value
		} );
	}

	typeChange = (event) => {
		this.setState( {
			type: event.target.value
		} );
	}

	pluginOnClick = (event) => {
		if( '' !== this.state.type && '' !== this.state.slug ) {
			this.setState( {
				loading: false
			} );
			this.setState(
				{
					card_loading: true
				}
			);
			var rest_url = wppic.rest_url + 'wppic/v1/get_html/';
			axios.get(rest_url + `?type=${this.props.attributes.type}&slug=${this.props.attributes.slug}&align=${this.props.attributes.align}&image=${this.props.attributes.image}&containerid=${this.props.attributes.containerid}&margin=${this.props.attributes.margin}&clear=${this.props.attributes.clear}&expiration=${this.props.attributes.expiration}&ajax=${this.props.attributes.ajax}&scheme=${this.props.attributes.scheme}&layout=${this.props.attributes.layout}` ).then( ( response ) => {
				// Now Set State
				this.setState( {
					card_loading: false,
					html: response.data
				} );
				this.props.setAttributes({html: response.data});
			} );
		}
	}

	render() {
		const { attributes, setAttributes } = this.props;
		const { type, slug, loading, align, image, containerid, margin, clear, expiration, ajax, scheme, layout, width} = attributes;
		let htmlToReactParser = new HtmlToReactParser();

		const resetSelect = [
			{
				icon: 'update',
				title: __( 'Reset', 'wp-plugin-info-card' ),
				onClick: () => this.setState( { loading: true } )
			}
		];
		const alignOptions = [
			{ value: 'left', label: __('Left', 'wp-plugin-info-card' ) },
			{ value: 'center', label: __('Center', 'wp-plugin-info-card' ) },
			{ value: 'right', label: __('Right', 'wp-plugin-info-card' ) },
		];
		const clearOptions = [
			{ value: 'none', label: __('None', 'wp-plugin-info-card' ) },
			{ value: 'before', label: __('Before', 'wp-plugin-info-card' ) },
			{ value: 'after', label: __('After', 'wp-plugin-info-card' ) },
		];
		const ajaxOptions = [
			{ value: 'false', label: __('No', 'wp-plugin-info-card' ) },
			{ value: 'true', label: __('Yes', 'wp-plugin-info-card' ) },
		];
		const schemeOptions = [
			{ value: 'default', label: __('Default', 'wp-plugin-info-card' ) },
			{ value: 'scheme1', label: __('Scheme 1', 'wp-plugin-info-card' ) },
			{ value: 'scheme2', label: __('Scheme 2', 'wp-plugin-info-card' ) },
			{ value: 'scheme3', label: __('Scheme 3', 'wp-plugin-info-card' ) },
			{ value: 'scheme4', label: __('Scheme 4', 'wp-plugin-info-card' ) },
			{ value: 'scheme5', label: __('Scheme 5', 'wp-plugin-info-card' ) },
			{ value: 'scheme6', label: __('Scheme 6', 'wp-plugin-info-card' ) },
			{ value: 'scheme7', label: __('Scheme 7', 'wp-plugin-info-card' ) },
			{ value: 'scheme8', label: __('Scheme 8', 'wp-plugin-info-card' ) },
			{ value: 'scheme9', label: __('Scheme 9', 'wp-plugin-info-card' ) },
			{ value: 'scheme10', label: __('Scheme 10', 'wp-plugin-info-card' ) },
			{ value: 'scheme11', label: __('Scheme 11', 'wp-plugin-info-card' ) },
		];
		const layoutOptions = [
			{ value: 'card', label: __('Card', 'wp-plugin-info-card' ) },
			{ value: 'large', label: __('Large', 'wp-plugin-info-card' ) },
			{ value: 'wordpress', label: __('WordPress', 'wp-plugin-info-card' ) },
			{ value: 'flex', label: __('Flex', 'wp-plugin-info-card' ) },
		];
		const widthOptions = [
			{ value: 'none', label: __('Default', 'wp-plugin-info-card' ) },
			{ value: 'full', label: __('Full Width', 'wp-plugin-info-card' ) },
		];
		const pluginOnClick = this.pluginOnClick;
		const inspectorControls = (
			<InspectorControls>
				<PanelBody title={ __( 'WP Plugin Info Card', 'wp-plugin-info-card' ) }>
					<SelectControl
							label={ __( 'Scheme', 'wp-plugin-info-card' ) }
							options={ schemeOptions }
							value={ scheme }
							onChange={ ( value ) => { this.props.setAttributes( { scheme: value } ); this.props.attributes.scheme = value; this.setState( { scheme: value}); this.pluginOnClick(value); } }
					/>
					<SelectControl
							label={ __( 'Layout', 'wp-plugin-info-card' ) }
							options={ layoutOptions }
							value={ layout }
							onChange={ ( value ) => {
								if ( 'flex' == value ) {
									this.props.setAttributes( { layout: value, align: 'full' } );
									this.props.attributes.layout = value;
									this.props.attributes.align = 'full';
									this.setState( { layout: value, align: 'full' } );
									this.pluginOnClick(value);
								} else {
									this.props.setAttributes( { layout: value, align: 'center' } );
									this.props.attributes.layout = value;
									this.props.attributes.align = 'center';
									this.setState( { layout: value, align: 'center' } );
									this.pluginOnClick(value);
								}
							} }
					/>
					<SelectControl
							label={ __( 'Width', 'wp-plugin-info-card' ) }
							options={ widthOptions }
							value={ width }
							onChange={ ( value ) => {  this.props.setAttributes( { width: value } ); this.props.attributes.width = value; this.setState( { width: value}); } }
					/>
					<MediaUpload
						onSelect={(imageObject) => { this.props.setAttributes( { image: imageObject.url}); this.props.attributes.image = imageObject.url; this.setState( { image: imageObject.url } ); this.pluginOnClick(imageObject); } }
						type="image"
						value={image}
						render={({ open }) => (
							<Fragment>
								<button className="components-button is-button" onClick={open}>
									{__( 'Upload Image!', 'wp-plugin-info-card' )}
								</button>
								{image &&
									<Fragment>
										<div>
											<img src={image} alt={__( 'Plugin Card Image', 'wp-plugin-info-card' )} width="250" height="250" />
										</div>
										<div>
											<button className="components-button is-button" onClick={ (event) => {
												this.props.setAttributes( { image: '' } ); this.props.attributes.image = ''; this.setState( { image: '' } ); this.pluginOnClick( event );
											} }>
												{__( 'Reset Image', 'wp-plugin-info-card' )}
											</button>
										</div>
									</Fragment>
								}
							</Fragment>
						)}
					/>
					<TextControl
						label={ __( 'Container ID',  'wp-plugin-info-card' ) }
						type="text"
						value={ containerid }
						onChange={ ( value ) => { this.props.setAttributes( { containerid: value }); this.props.attributes.containerid = value; this.setState( { containerid: value } ); setTimeout( function() { pluginOnClick(value); }, 5000 ); } }
					/>
					<TextControl
						label={ __( 'Margin',  'wp-plugin-info-card' ) }
						type="text"
						value={ margin }
						onChange={ ( value ) => { this.props.setAttributes( { margin: value }); this.props.attributes.margin = value; this.setState( { margin: value } ); setTimeout( function() { pluginOnClick(value); }, 5000 ); } }
					/>
					<SelectControl
							label={ __( 'Clear', 'wp-plugin-info-card' ) }
							options={ clearOptions }
							value={ clear }
							onChange={ ( value ) => { this.props.setAttributes( { clear: value } ); this.props.attributes.clear = value; this.setState( { clear: value}); this.pluginOnClick(value); } }
					/>
					<TextControl
						label={ __( 'Expiration in minutes',  'wp-plugin-info-card' ) }
						type="number"
						value={ expiration }
						onChange={ ( value ) => { this.props.setAttributes( { expiration: value }); this.props.attributes.expiration = value; this.setState( { expiration: value } ); setTimeout( function() { pluginOnClick(value); }, 5000 ); } }
					/>
					<SelectControl
							label={ __( 'Load card via Ajax?', 'wp-plugin-info-card' ) }
							options={ ajaxOptions }
							value={ ajax }
							onChange={ ( value ) => { this.props.setAttributes( { ajax: value } ); this.props.attributes.ajax = value; this.setState( { ajax: value}); this.pluginOnClick(value); } }
					/>

				</PanelBody>
			</InspectorControls>
		);
		return(
			<Fragment>
				<Fragment>
					{this.state.loading &&
						<Placeholder>
							<div className="wppic-block">
								<div>
									<h3><label htmlFor="wppic-type-select">{__( 'Select a Type', 'wp-plugin-info-card' )}</label></h3>
									<select id="wppic-type-select" onChange={ ( event ) => { this.props.setAttributes( { type: event.target.value } ); this.typeChange(event); } }>
										<option value="theme" selected={this.state.type === 'theme' ? 'selected': '' }>{__( 'Theme', 'wp-plugin-info-card' )}</option>
										<option value="plugin" selected={this.state.type === 'plugin' ? 'selected': '' }>{__( 'Plugin', 'wp-plugin-info-card' )}</option>
									</select>
								</div>
								<div>
									<h3><label htmlFor="wppic-input-slug">{__( 'Enter a slug', 'wp-plugin-info-card' )}</label></h3>
								</div>
								<div>
									<input type="text" id="wppic-input-slug" value={this.state.slug} onChange={ ( event ) => { this.props.setAttributes( { slug: event.target.value } ); this.slugChange(event); } } />
								</div>
								<div>
									<input type="submit" id="wppic-input-submit" value={__( 'Go', 'wp-plugin-info-card' )} onClick={ ( event ) => { this.props.setAttributes( { loading: false } ); this.pluginOnClick(event); } }  />
								</div>
							</div>
						</Placeholder>
					}
					{this.state.card_loading &&
						<Fragment>
							<Placeholder>
								<div>
									<svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
									width="40px" height="40px" viewBox="0 0 850.39 850.39" enable-background="new 0 0 850.39 850.39" >
									<path fill="#DB3939" d="M425.195,2C190.366,2,0,191.918,0,426.195C0,660.472,190.366,850.39,425.195,850.39
									c234.828,0,425.195-189.918,425.195-424.195C850.39,191.918,660.023,2,425.195,2z M662.409,476.302l-2.624,4.533L559.296,654.451
									l78.654,45.525l-228.108,105.9L388.046,555.33l78.653,45.523l69.391-119.887l-239.354-0.303l-94.925-0.337l-28.75-0.032l-0.041-0.07
									h0l-24.361-42.303l28.111-48.563l109.635-189.419l-78.653-45.524L435.859,48.514l21.797,250.546l-78.654-45.525l-69.391,119.887
									l239.353,0.303l123.676,0.37l16.571,28.772l7.831,13.596L662.409,476.302z"/></svg><br />
									<div>
										<Spinner />
									</div>
								</div>
							</Placeholder>
						</Fragment>
					}
					{!this.state.loading && !this.state.card_loading &&
						<Fragment>
							{inspectorControls}
							<BlockControls>
								<Toolbar controls={ resetSelect } />
								{'flex' == this.state.layout &&
									<BlockAlignmentToolbar
										value={this.props.attributes.align}
										onChange={ (value) => {
											this.props.setAttributes( { align: value } ); this.props.attributes.align = value;
											this.setState( { align: value});
											this.pluginOnClick( value );
										}}
									>
									</BlockAlignmentToolbar>
								}
								{'card' == this.state.layout &&
									<AlignmentToolbar
										value={this.props.attributes.align}
										onChange={ (value) => {
											this.props.setAttributes( { align: value } ); this.props.attributes.align = value;
											this.setState( { align: value});
											this.pluginOnClick( value );
										} }
									></AlignmentToolbar>
								}
							</BlockControls>
							<div className={'' != width ? 'wp-pic-full-width' : ''}>
								{htmlToReactParser.parse(this.state.html)}
							</div>
						</Fragment>
					}
				</Fragment>
			</Fragment>
		);
	}
}

export default WP_Plugin_Card;
