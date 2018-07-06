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
    static getAgenciasApi(){
        //console.log('entrou aqui')
        fetch('http://localhost:8080/listaagencias')
        .then(resposta => resposta.json())  
        .then(json => {
            //console.log('aqui')
            nativeLocation.setAgencias(json);
        })
        .catch(e => {
            console.warn('Não foi possível carregar as agencias... lendo plist: ' + e);
            nativeLocation.setPlist();
        });
    }
}