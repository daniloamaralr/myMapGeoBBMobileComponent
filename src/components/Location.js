import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  NativeModules
} from 'react-native';
import Map from 'Map';

var nativeLocation = require('NativeModules').geoBBLocation;

export default class Location {
    static getPosition(latitude, longitude){
        //fazer chamanda para nativo
        nativeLocation.setPositionNative(latitude);
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