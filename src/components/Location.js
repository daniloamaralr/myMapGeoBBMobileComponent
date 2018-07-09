import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    NativeModules,
    DeviceEventEmitter
} from 'react-native';
import Map from './Map';
import Api from './Api';
import Firebase from './Firebase'

//var nativeLocation = require('NativeModules').geoBBLocation;
var nativeLocation = NativeModules.geoBBLocation;

export default class Location {
    static getPosition(latitude, longitude) {
        if (latitude !== undefined && longitude !== undefined) {
            nativeLocation.setPositionNative(latitude, longitude);
        }
    }

    static didEnterOrExitListener(database) {
        DeviceEventEmitter.addListener('mov/geo/enterLocation', (payload) => {
            console.warn('enter region... log')
            if (database == 'api') {
                Api.checkIn(payload, 'enter');
            } else if (database == 'firebase') {
                Firebase.checkIn(payload, 'enter');
            }
        })

        DeviceEventEmitter.addListener('mov/geo/exitLocation', (payload) => {
            console.warn('exit region... log')
            if (database == 'api') {
                Api.checkIn(payload, 'exit');
            } else if (database == 'firebase') {
                Firebase.checkIn(payload, 'exit');
            }
        })
    }
}

// constructor(props){
    //     super(props)
    //     this.state = {
    //         latitude:'',
    //         longitude: ''
    //     }   
    // }




    // onUpdate = (latitude) => {
    //     this.setState({
    //       latitude: latitude
    //     })
    // };

    // render() {
    //   return (
    //     <View style={styles.container}>
    //         <Map onUpdate={this.onUpdate}>  </Map>
    //     </View>
    //   );
    // }

// const styles = StyleSheet.create({
//     container: {
//       alignItems: 'center'
//     },
// });

//utilizando props
// export default class Location extends Component {
//     render() {
//       return (
//         <View style={styles.container}>
//             <Text> Hello {this.props.name} ! </Text>
//         </View>
//       );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//       alignItems: 'center'
//     },
// });