
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  DeviceEventEmitter
} from 'react-native';

//Componentes
import Location from './src/components/Location'
import Map from './src/components/Map'
import Api from './src/components/Api'
import Firebase from './src/components/Firebase'

const SELECT_DATABASE = 'firebase';

export default class App extends Component {

  componentWillMount() {
    if (SELECT_DATABASE == 'firebase') {
      Firebase.configFirebase();
      Firebase.loadAgencies();

      Location.didEnterOrExitListener(SELECT_DATABASE);
    }
    else if (SELECT_DATABASE == 'api') {
      Api.getAgenciasApi()
      Location.didEnterOrExitListener(SELECT_DATABASE);
    }
    else{
      console.warn('Load Database Failed')
    }
    

    //Firebase.insertFirebase();
  }

  render() {
    return (
      <View style={styles.container}>
        <Map />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
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

// import React, { Component } from 'react';
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';
// import MapView from 'react-native-maps';

// export default class App extends Component {
//     constructor(props){
//         super(props)
//         this.state = {
//             mapRegion: null,
//             lastLat: null,
//             lastLong: null
//         }   
//     }

//     componentDidMount() {
//         this.watchID = navigator.geolocation.watchPosition((position) => {
//             // Create the object to update this.state.mapRegion through the onRegionChange function
//             console.log(position.coords.latitude)
//             let region = {
//                 latitude:       position.coords.latitude,
//                 longitude:      position.coords.longitude,
//                 latitudeDelta:  0.00922*1.5,
//                 longitudeDelta: 0.00421*1.5
//             }
//             this.onRegionChange(region, region.latitude, region.longitude);
//         });
//     }

//     onRegionChange(region, lastLat, lastLong) {
//         this.setState({
//             mapRegion: region,
//             // If there are no new values set use the the current ones
//             lastLat: lastLat || this.state.lastLat,
//             lastLong: lastLong || this.state.lastLong
//         });
//     }

//     componentWillUnmount() {
//         navigator.geolocation.clearWatch(this.watchID);
//     }

//     onMapPress(e) {
//         console.log(e.nativeEvent.coordinate.longitude);
//         let region = {
//             latitude:       e.nativeEvent.coordinate.latitude,
//             longitude:      e.nativeEvent.coordinate.longitude,
//             latitudeDelta:  0.00922*1.5,
//             longitudeDelta: 0.00421*1.5
//         }
//         this.onRegionChange(region, region.latitude, region.longitude);
//     }

//     render() {
//         return (
//             <View style = {styles.container}>
//                 <Text> vitor jeusus</Text>
//                 <MapView
//                     style={styles.map}
//                     region={this.state.mapRegion}
//                     showsUserLocation={true}
//                     followUserLocation={true}
//                     onRegionChange={this.onRegionChange.bind(this)}
//                     onPress={this.onMapPress.bind(this)}>
//                     <MapView.Marker
//                     coordinate={{
//                         latitude: (this.state.lastLat + 0.00050) || -36.82339,
//                         longitude: (this.state.lastLong + 0.00050) || -73.03569,
//                     }}>
//                     </MapView.Marker>
//                 </MapView>
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
// });