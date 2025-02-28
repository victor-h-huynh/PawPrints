import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker,} from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';

// Material UI 
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider'

import mapIcon1 from  './assets/mapIcon1.svg';
import mapIcon2 from  './assets/mapIcon2.svg';
import mapIcon3 from  './assets/mapIcon3.svg';
import mapIcon4 from  './assets/mapIcon4.svg';
import mapIcon5 from  './assets/mapIcon5.svg';

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
Geocode.enableDebug();

class PetMap extends Component{

	/**
	 * Get the current address from the default map position and set those values in the state
	 */
	componentDidMount() {

		Geocode.fromLatLng( this.props.parentState.mapPosition.lat , this.props.parentState.mapPosition.lng ).then(

			response => {
				const address = response.results[0].formatted_address,
					addressArray =  response.results[0].address_components,
					street_number = this.getStreetNumber (addressArray),
					city = this.getCity( addressArray ),
					street_name = this.getStreetName( addressArray ),
					province = this.getProvince( addressArray ),
					postal_code = this.getPostalCode(addressArray);

				this.props.updateParentState( {
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

	  setMapRef = (map) => {
	this.map = map
	console.log("map", map)
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

	// Get the building number and set the streetnumber input value to the one selected
	getStreetNumber = (addressArray) => {
		let streetNumber = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			if ( addressArray[ i ].types[0] && "street_number" === addressArray[ i ].types[0] ) {
				streetNumber = addressArray[ i ].long_name;
				return streetNumber;
			}
		}
	};

	//  Get the streetname and set the streetname input value to the one selected

	getStreetName = ( addressArray ) => {
		let streetName = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			if ( addressArray[ i ].types[0] && 'route' === addressArray[ i ].types[0] ) {
				streetName = addressArray[ i ].long_name;
				return streetName;
			}
		}
	};

	//   Get the province and set the province input value to the one selected

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
		this.props.updateParentState({ [event.target.name]: event.target.value });
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
				this.setState({

				});
				this.props.updateParentState( {
					address: ( address ) ? address : '',
					street_number: ( street_number ) ? street_number : '',
					street_name: ( street_name ) ? street_name : '',
					city: ( city ) ? city : '',
					province: ( province ) ? province : '',
					postal_code: (postal_code) ? postal_code : '',
					markerPosition: {
						lat: newLat,
						lng: newLng
					},
					mapPosition: {
						lat: newLat,
						lng: newLng
					},
				} )
				this.props.updateParentState(this.state);
			},
			error => {
				console.error(error);
			},
		);
	};


	//  When the user types an address in the search box

	onPlaceSelected = ( place ) => {
		const address = place.formatted_address,
			addressArray =  place.address_components,
			street_number = this.getStreetNumber( addressArray ),
			city = this.getCity( addressArray ),
			street_name = this.getStreetName( addressArray ),
			province = this.getProvince( addressArray ),
			postal_code = this.getPostalCode(addressArray),
			latValue = place.geometry.location.lat(),
			lngValue = place.geometry.location.lng();
		this.setState({

		});
		this.props.updateParentState({
			address: ( address ) ? address : '',
			street_name: ( street_name ) ? street_name : '',
			city: ( city ) ? city : '',
			province: ( province ) ? province : '',
			postal_code: (postal_code) ? postal_code : '',
			street_number: ( street_number ) ? street_number : '',
			markerPosition: {
				lat: latValue,
				lng: lngValue
			},
			mapPosition: {
				lat: latValue,
				lng: lngValue
			},
		});
	};


	render(){
		let map;
		if( this.props.center.lat !== undefined ) {
			map = <div>
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
					zoom={this.props.zoom}
					className="PetMap"
					onClose={this.onInfoWindowClose}
					markerLat={this.props.parentState.markerPosition.lat}
					markerLng={this.props.parentState.markerPosition.lng}
					address={this.props.parentState.address}
					onMarkerDragEnd={this.onMarkerDragEnd}
					onPlaceSelected={this.onPlaceSelected}
					userLocation={this.props.userLocation}
					/>

				{/* <div className = "addressConfirmation">
						<input 
							type="text" 
							name="street_number" 
							className="formControl form-control streetNumber"
							onChange={ this.onChange } 
							readOnly="readOnly" 
							value={ this.props.parentState.street_number }/>

						<input 
							type="text" 
							name="street_name" 
							className="formControl form-control streetName" 
							onChange={ this.onChange } 
							readOnly="readOnly" 
							value={ this.props.parentState.street_name }/>

						<input 
							type="text" 
							name="city" 
							className="formControl form-control city" 
							onChange={ this.onChange } 
							readOnly="readOnly" 
							value={ this.props.parentState.city }/>

						<input 
							type="text" 
							name="province" 
							className="formControl form-control province"
							onChange={ this.onChange } 
							readOnly="readOnly" 
							value={ this.props.parentState.province }/>

						<input 
							type="text" 
							name="postal_code" 
							className="formControl form-control postalCode" 
							onChange={ this.onChange } 
							readOnly="readOnly" 
							value={ this.props.parentState.postal_code }/> */}

<List className="infoMap">
      <ListItem>
        <ListItemAvatar>
					<img className="mapIcons" src={mapIcon1} alt=""></img>
        </ListItemAvatar>
        <ListItemText primary="Street Number" secondary={ this.props.parentState.street_number } onChange={ this.onChange } type="text" name="street_number" className="" value ={ this.props.parentState.street_number } />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
					<img className="mapIcons" src={mapIcon2} alt=""></img>
        </ListItemAvatar>
        <ListItemText primary="Street Name" secondary={ this.props.parentState.street_name } onChange={ this.onChange } type="text" name="street_name" className="" value ={ this.props.parentState.street_name } />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
					<img className="mapIcons" src={mapIcon3} alt=""></img> 
        </ListItemAvatar>
        <ListItemText primary="City" secondary={ this.props.parentState.city } onChange={ this.onChange } type="text" name="city" className="" value ={ this.props.parentState.city }/>
      </ListItem>
			<Divider variant="inset" component="li" />
			<ListItem>
        <ListItemAvatar>
					<img className="mapIcons" src={mapIcon4} alt=""></img>
        </ListItemAvatar>
        <ListItemText primary="Province" secondary={ this.props.parentState.province } onChange={ this.onChange } type="text" name="province" value={ this.props.parentState.province }/>
      </ListItem>
			<Divider variant="inset" component="li" />
			<ListItem>
        <ListItemAvatar>
					<img className="mapIcons" src={mapIcon5} alt=""></img>
        </ListItemAvatar>
        <ListItemText primary="Postal Code" secondary={ this.props.parentState.postal_code } onChange={ this.onChange } type="text" name="postal_code" value={ this.props.parentState.postal_code }/>
      </ListItem>
			<Divider variant="inset" component="li" />
    </List>
				</div>
			// </div>
		} else {
			map = <div style={{height: this.props.height}} />
		}
		return( map )
	}
}
export default PetMap;




		const AsyncMap = withScriptjs(
			withGoogleMap(
				props => (
					<GoogleMap
						defaultZoom={ props.zoom }
						defaultCenter={{ lat: props.userLocation.lat, lng: props.userLocation.lng }}
					   center={{ lat: props.markerLat, lng: props.markerLng }}
					>
						<InfoWindow
							onClose={props.onInfoWindowClose}
							position={{ lat: ( props.markerLat + 0.0010 ), lng: props.markerLng }}
						>
							<div>
								<span style={{ padding: 0, margin: 0 }}>{ props.address }</span>
							</div>
						</InfoWindow>

						<Marker
						        name={'Dolores park'}
						        draggable={true}
						        onDragEnd={ props.onMarkerDragEnd }
						        position={{ lat: props.markerLat, lng: props.markerLng }}
						/>
						<Marker />

						<Autocomplete
							style={{
								width: '100%',
								height: '40px',
								paddingLeft: '16px',
								marginTop: '20px',
								marginBottom: '50px',
								borderRadius: '5px ',
								border: '1px solid lightgrey',
							}}
							onPlaceSelected={ props.onPlaceSelected }
							types={['address']}
						/>
					</GoogleMap>
				)
			)
		);




