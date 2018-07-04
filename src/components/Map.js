import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import MapView from 'react-native-maps';
import Location from './Location';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

export default class Map extends Component {
    constructor(props){
        super(props)
        this.state = {
            mapRegion: null,
            lastLat: null,
            lastLong: null
        }   
    }
    
    componentDidMount() {
        this.watchID = navigator.geolocation.watchPosition((position) => {
            // Create the object to update this.state.mapRegion through the onRegionChange function
            //console.log(position.coords.latitude)
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
        Location.getPosition(lastLat, lastLong);
    }
    
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }
    
    onMapPress(e) {
        //console.log(e.nativeEvent.coordinate.longitude);
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
            <View>
                <MapView
                    style={styles.map}
                    region={this.state.mapRegion}
                    showsUserLocation={true}
                    followUserLocation={true}
                    onRegionChange={this.onRegionChange.bind(this)}
                    onPress={this.onMapPress.bind(this)}>
                    <MapView.Marker
                        coordinate={{
                            latitude: (this.state.lastLat) || -36.82339,
                            longitude: (this.state.lastLong) || -73.03569,
                        }}>
                    </MapView.Marker>
                </MapView>
            </View>
        );
    }
}
    
const styles = StyleSheet.create({
    map: {
        height: height,
        width: width
      }
});