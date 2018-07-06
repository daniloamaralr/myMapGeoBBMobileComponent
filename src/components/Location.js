import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  NativeModules
} from 'react-native';
import Map from 'Map';

//var nativeLocation = require('NativeModules').geoBBLocation;
var nativeLocation = NativeModules.geoBBLocation;

export default class Location {
    static getPosition(latitude, longitude){
        if (latitude !== undefined && longitude !== undefined) 
        {
            nativeLocation.setPositionNative(latitude, longitude);
        }   
    }

    static checkIn(payload, statusRegion){
        console.log(payload.id)
        const uri  = "http://localhost:8080/checkin/"
    
        var currentdate = new Date(); 
        var datetime =  currentdate.getFullYear() + "-"
                  + (currentdate.getMonth()+1)  + "-" 
                  + currentdate.getDate() + " "  
                  + currentdate.getHours() + ":"  
                  + currentdate.getMinutes() + ":" 
                  + currentdate.getSeconds();
  
        console.log(datetime)
  
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                idfuncionario: 1,
                idagencia: payload.id, 
                hora : datetime,
                regiao: statusRegion
            }),
            headers: new Headers({
            'Content-type': 'application/json'
            })
        }
  
        fetch(uri, requestInfo)
        .then(response => {
            if(response.ok)
             return response.text();
  
            console.log(response.text())
            throw new Error("Não foi possível efetuar login")
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