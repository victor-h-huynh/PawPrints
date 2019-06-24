import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker,} from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
Geocode.enableDebug();

class PetMap extends Component{

	constructor( props ){
		super( props );
		this.state = {
			address: '',
			city: '',
			street_number: '',
			street_name: '',
			province: '',
			postal_code: '',
			mapPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng
			},
			markerPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng
			}
		}
	}
	/**
	 * Get the current address from the default map position and set those values in the state
	 */
	componentDidMount() {
		Geocode.fromLatLng( this.state.mapPosition.lat , this.state.mapPosition.lng ).then(
			
			response => {
				console.log(response);
				const address = response.results[0].formatted_address,
					addressArray =  response.results[0].address_components,
					street_number = this.getStreetNumber (addressArray),
					city = this.getCity( addressArray ),
					street_name = this.getStreetName( addressArray ),
					province = this.getProvince( addressArray ),
					postal_code = this.getPostalCode(addressArray);

				// console.log( 'city', city, area, state );

				this.setState( {
					address: ( address ) ? address : '',
					street_name: ( street_name ) ? street_name : '',
					city: ( city ) ? city : '',
					street_number: ( street_number ) ? street_number : '',
					province: ( province ) ? province : '',
					postal_code: (postal_code) ? postal_code : '',
				} )
			},
			error => {
				console.error( error );
			}
		);
	};

	//  Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
	shouldComponentUpdate( nextProps, nextState ){
		if (
			this.state.markerPosition.lat !== this.props.center.lat ||
			this.state.address !== nextState.address ||
			this.state.city !== nextState.city ||
			this.state.street_number !== nextState.street_number ||
			this.state.street_name !== nextState.street_name ||
			this.state.province !== nextState.province||
			this.state.postal_code !== nextState.postal_code
		) {
			return true
		} else if ( this.props.center.lat === nextProps.center.lat ){
			return false
		}
	}

	// Get the city and set the city input value to the one selected

	getCity = ( addressArray ) => {
		let city = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			if ( addressArray[ i ].types[0] && 'locality' === addressArray[ i ].types[0] ) {
				city = addressArray[ i ].long_name;
				return city;
			}
		}
	};

	getStreetNumber = (addressArray) => {
		let streetNumber = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			if ( addressArray[ i ].types[0] && "street_number" === addressArray[ i ].types[0] ) {
				streetNumber = addressArray[ i ].long_name;
				return streetNumber;
			}
		}
	};

	//  Get the area and set the area input value to the one selected
	 
	getStreetName = ( addressArray ) => {
		let streetName = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			if ( addressArray[ i ].types[0] && 'route' === addressArray[ i ].types[0] ) {
				streetName = addressArray[ i ].long_name;
				return streetName;
			}
		}
	};

	//   Get the address and set the address input value to the one selected
	
	getProvince = ( addressArray ) => {
		let province = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			for( let i = 0; i < addressArray.length; i++ ) {
				if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
					province = addressArray[ i ].long_name;
					return province;
				}
			}
		}
	};

	getPostalCode = (addressArray) => {
		let postal_code = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			if ( addressArray[ i ].types[0] && 'postal_code' === addressArray[ i ].types[0] ) {
				postal_code = addressArray[ i ].long_name;
				return postal_code;
			}
		}
	}

	// And function for city,state and address input

	onChange = ( event ) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	//   This Event triggers when the marker window is closed

	onInfoWindowClose = ( event ) => {

	};


	onMarkerDragEnd = ( event ) => {
		let newLat = event.latLng.lat(),
			newLng = event.latLng.lng();

		Geocode.fromLatLng( newLat , newLng ).then(
			response => {
				const address = response.results[0].formatted_address,
					addressArray =  response.results[0].address_components,
					street_number = this.getStreetNumber( addressArray ),
					city = this.getCity( addressArray ),
					street_name = this.getStreetName( addressArray ),
					province = this.getProvince( addressArray ),
					postal_code = this.getPostalCode(addressArray);
				this.setState( {
					address: ( address ) ? address : '',
					street_number: ( street_number ) ? street_number : '',
					street_name: ( street_name ) ? street_name : '',
					city: ( city ) ? city : '',
					province: ( province ) ? province : '',
					postal_code: (postal_code) ? postal_code : '',
				} )
			},
			error => {
				console.error(error);
			}
		);
	};


	//  When the user types an address in the search box

	onPlaceSelected = ( place ) => {
		console.log( 'place', place );
		const address = place.formatted_address,
			addressArray =  place.address_components,
			city = this.getCity( addressArray ),
			street_name = this.getStreetName( addressArray ),
			province = this.getProvince( addressArray ),
			postal_code = this.getPostalCode(addressArray),
			latValue = place.geometry.location.lat(),
			lngValue = place.geometry.location.lng();
		// Set these values in the state.
		this.setState({
			address: ( address ) ? address : '',
			street_name: ( street_name ) ? street_name : '',
			city: ( city ) ? city : '',
			province: ( province ) ? province : '',
			postal_code: (postal_code) ? postal_code : '',
			markerPosition: {
				lat: latValue,
				lng: lngValue
			},
			mapPosition: {
				lat: latValue,
				lng: lngValue
			},
		})
	};


	render(){
		const AsyncMap = withScriptjs(
			withGoogleMap(
				props => (
					<GoogleMap google={ this.props.google }
					           defaultZoom={ this.props.zoom }
					           defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
					>
						{/* InfoWindow on top of marker */}
						<InfoWindow
							onClose={this.onInfoWindowClose}
							position={{ lat: ( this.state.markerPosition.lat + 0.0018 ), lng: this.state.markerPosition.lng }}
						>
							<div>
								<span style={{ padding: 0, margin: 0 }}>{ this.state.address }</span>
							</div>
						</InfoWindow>
						{/*Marker*/}
						<Marker google={this.props.google}
						        name={'Dolores park'}
						        draggable={true}
						        onDragEnd={ this.onMarkerDragEnd }
						        position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
						/>
						<Marker />
						{/* For Auto complete Search Box */}
						<Autocomplete
							style={{
								width: '100%',
								height: '40px',
								paddingLeft: '16px',
								marginTop: '2px',
								marginBottom: '500px'
							}}
							onPlaceSelected={ this.onPlaceSelected }
							types={['(regions)']}
						/>
					</GoogleMap>
				)
			)
		);
		let map;
		if( this.props.center.lat !== undefined ) {
			map = <div>
				<div>
					<div className="form-group">
						<label htmlFor="">Street Number</label>
						<input type="text" name="street_number" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.street_number }/>
					</div>
					<div className="form-group">
						<label htmlFor="">Street Name</label>
						<input type="text" name="street_name" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.street_name }/>
					</div>
					<div className="form-group">
						<label htmlFor="">City</label>
						<input type="text" name="city" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.city }/>
					</div>

					<div className="form-group">
						<label htmlFor="">Province</label>
						<input type="text" name="province" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.province }/>
					</div>
					<div className="form-group">
						<label htmlFor="">Postal Code</label>
						<input type="text" name="postal_code" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.postal_code }/>
					</div>
				</div>

				<AsyncMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`}
					loadingElement={
						<div style={{ height: `100%` }} />
					}
					containerElement={
						<div style={{ height: this.props.height }} />
					}
					mapElement={
						<div style={{ height: `100%` }} />
					}
				/>
			</div>
		} else {
			map = <div style={{height: this.props.height}} />
		}
		return( map )
	}
}
export default PetMap;