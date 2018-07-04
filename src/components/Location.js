import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Map from 'Map';

export default class Location {
    // constructor(props){
    //     super(props)
    //     this.state = {
    //         latitude:'',
    //         longitude: ''
    //     }   
    // }

    static getPosition(latitude, longitude){
        console.log(latitude)
        console.log('eitaa')

    }
    

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
}

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