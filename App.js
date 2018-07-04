
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView from 'react-native-maps'; // 0.21.0

export default class App extends Component {
  state = {
    mapRegion: null,
    lastLat: null,
    lastLong: null,
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      // Create the object to update this.state.mapRegion through the onRegionChange function
      let region = {
        latitude:       position.coords.latitude,
        longitude:      position.coords.longitude,
        latitudeDelta:  0.00922*1.5,
        longitudeDelta: 0.00421*1.5
      }
      this.onRegionChange(region, region.latitude, region.longitude);
    });
  }

  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // If there are no new values set use the the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onMapPress(e) {
    console.log(e.nativeEvent.coordinate.longitude);
    let region = {
      latitude:       e.nativeEvent.coordinate.latitude,
      longitude:      e.nativeEvent.coordinate.longitude,
      latitudeDelta:  0.00922*1.5,
      longitudeDelta: 0.00421*1.5
    }
    this.onRegionChange(region, region.latitude, region.longitude);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <MapView
          style={styles.map}
          region={this.state.mapRegion}
          showsUserLocation={true}
          followUserLocation={true}
          onRegionChange={this.onRegionChange.bind(this)}
          onPress={this.onMapPress.bind(this)}>
          <MapView.Marker
            coordinate={{
              latitude: (this.state.lastLat + 0.00050) || -36.82339,
              longitude: (this.state.lastLong + 0.00050) || -73.03569,
            }}>
            <View>
              {/* <Text style={{color: '#000'}}>
                { this.state.lastLong } / { this.state.lastLat }
              </Text> */}
            </View>
          </MapView.Marker>
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    marginTop:20,
  }
});

//AppRegistry.registerComponent('testCoords', () => testCoords);


// import React from 'react';
// import { View, Text } from 'react-native';
// import MapView from 'react-native-maps';

// export default class MyMap extends React.Component {
//     constructor(props){
//       super(props)
//       this.state = {
//           latitude: 0.00,
//           longitude: 0.00,
//           latitudeDelta: 0.002,
//           longitudeDelta: 0.002,
//           error: ''
//       }
//     }

//     componentDidMount(){
//       this.watchId = navigator.geolocation.watchPosition(
//         (position) => {
//           console.log(position.coords.latitude)
//           this.setState({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//             latitudeDelta:  0.00922*1.5,
//             longitudeDelta: 0.00421*1.5,
//             error: null,
//           });
//         },
//         (error) => this.setState({ error: error.message }),
//         { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000, distanceFilter: 10 },
//       );
//     }
      
//     render() {
//       return (
//         <MapView style={styles.map} initialRegion={{
//          latitude:-6.270565,
//          longitude:106.759550,
//          latitudeDelta: 1,
//          longitudeDelta: 1
//         }}>
    
//         {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
//            coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
//            title={"Your Location"}
//          />}
  
//         </MapView>
//       );
//     }
    
// }

// const styles = {
//     container: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       justifyContent: 'flex-end',
//       alignItems: 'center',
//     },
//     text: {
//         marginTop :20,
//         fontSize: 30,
//         fontWeight: '700',
//         color: '#59656C',
//         marginBottom: 10,
//     },
//     map: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//     }
// };