import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    NativeModules
} from 'react-native';
import firebase from 'firebase'

var nativeLocation = NativeModules.geoBBLocation;

export default class Firebase {
    static configFirebase() {
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyDjiBZOmry3xxSOjSIosUfBjpgkOK7fchA",
            authDomain: "mymap-50f99.firebaseapp.com",
            databaseURL: "https://mymap-50f99.firebaseio.com",
            projectId: "mymap-50f99",
            storageBucket: "mymap-50f99.appspot.com",
            messagingSenderId: "576171527346"
        };

        firebase.initializeApp(config);
    }

    static loadAgencies() {
        firebase.database().ref('agencias').on('value', (data) => {
            //console.log(data)
            //console.log(data.toJSON());
            nativeLocation.setAgenciasFirebase(data.toJSON());
        })
    }

    static checkIn(payload, statusRegion) {
        console.log("entrou checkin firebase")
        console.log(payload.id)

        var currentdate = new Date(); 
        var datetime =  currentdate.getFullYear() + "-"
                  + (currentdate.getMonth()+1)  + "-" 
                  + currentdate.getDate() + " "  
                  + currentdate.getHours() + ":"  
                  + currentdate.getMinutes() + ":" 
                  + currentdate.getSeconds();

        firebase.database().ref('checkin').push(
            {
                idFuncionario: 1,
                idAgencia: payload.id,
                hora : datetime,
                regiao : statusRegion
            }
        ).then(() => {
            console.log('Insert')
        }).catch((error) => {
            console.log(error)
        });
    }

    // static insertFirebase() {
    //     firebase.database().ref('agencias/003').set(
    //         {
    //             nome: "Londres",
    //             latitude: "51.50998000",
    //             longitude: "-0.13370000"
    //         }
    //     ).then(() => {
    //         console.log('Insert')
    //     }).catch((error) => {
    //         console.log(error)
    //     });
    // }


}