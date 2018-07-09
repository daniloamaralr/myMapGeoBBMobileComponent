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

export default class Api {
    static getAgenciasApi(){
        //console.log('entrou aqui')
        fetch('http://localhost:8080/listaagencias')
        .then(resposta => resposta.json())  
        .then(json => {
            console.log(json)
            nativeLocation.setAgencias(json);
        })
        .catch(e => {
            console.warn('Não foi possível carregar as agencias... lendo plist: ' + e);
            nativeLocation.setPlist();
        });
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