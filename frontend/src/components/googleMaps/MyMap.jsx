//import React, { useState  } from 'react';
import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { Container } from 'react-bootstrap';

// import { GoogleMap, LoadScript, Marker,  } from '@react-google-maps/api';
// import {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
 
// const containerStyle = {
//   width: '90rem',
//   height: '90rem',
// };
 
// const center = {
//   lat: 41.390205,
//   lng: 2.154007
// };

const mapStyles = {
  width: '80rem',
  height: '80rem',
};
 
export class MyMap extends Component  {
  
  // const teacher = props.teacher.teacher;
  // const marker = useState({lat: '',lng: ''});
  // const [map, setMap] = useState(null);
  // const [markers, setMarkers] = React.useState([]);
 
  // const onLoad = React.useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds();
  //   map.fitBounds(bounds);
  //   setMap(map)
  // }, []);
 
  // const onUnmount = React.useCallback(function callback(map) {
  //   setMap(null)
  // }, []);

  // const address = teacher.place + ',' + teacher.country;
  // const handleAddress = async(address) => {
  //   try {
    
  //     const results = await getGeocode({ address });
  //     const { lat, lng } = await getLatLng(results[0]);
  //     marker.lat = lat;
  //     marker.lng = lng;
  //     //panTo({ lat, lng });
  //   } catch (error) {
  //     console.log("😱 Error: ", error);
  //   }
  // };
  
  // var destImg = '../../../' + teacher.img;
  // // var origin = new window.google.maps.Point(0, 0);
  // // var anchor = new window.google.maps.Point(15, 15);
  // // var scaledSize = new window.google.maps.Size(30, 30);

 
  render() {
    return (
      <Container>
          <Map
              google={this.props.google}
              zoom={14}
              style={mapStyles}
              initialCenter={
                {
                  lat: 41.40359,
                  lng: 2.15379
                }
              }
            /> 
      </Container> 
      )
    // <LoadScript
    //   googleMapsApiKey="AIzaSyCQrgyzK8ytVni4hOcM-eMVkto1mz2IcGg"
    // >
    //   <GoogleMap 
    //     mapContainerStyle={containerStyle}
    //     center={center}
    //     zoom={10}
    //     onLoad={onLoad}
    //     onUnmount={onUnmount}
    //   >
    //     {
    //       teacher.name &&
    //       <Marker 
    //         key={`${marker.lat}-${marker.lng}`}
    //         position={{ lat: marker.lat, lng: marker.lng }}
    //         icon={{
    //           url: {destImg},
    //            origin: new window.google.maps.Point(0, 0),
    //            anchor: new window.google.maps.Point(15, 15),
    //            scaledSize: new window.google.maps.Size(30, 30),
    //         }}
    //       ></Marker>
    //     }
        

    //     { /* Child components, such as markers, info windows, etc. */ }
    //     <></>
    //   </GoogleMap>
    // </LoadScript>
      }
}
 
export default GoogleApiWrapper({
  apiKey: "AIzaSyCQrgyzK8ytVni4hOcM-eMVkto1mz2IcGg"
})(MyMap);