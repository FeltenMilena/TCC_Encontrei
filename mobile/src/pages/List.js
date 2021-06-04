import React, {useState, useEffect} from 'react';
import socketio from 'socket.io-client';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RegisterJobList from '../components/RegisterJobList';

import logo from '../assets/LogoMobile1.png';

export default function List(){
    const [prerequisites, setPrerequisites] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('userCandidate').then(user_id => {
          const socket = socketio('http://192.168.1.108:3333', {
            query: { user_id }
          })
    
          socket.on('booking_response', booking => {
            Alert.alert(`Sua reserva em ${booking.registerJob.company} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
          })
        })
      }, []);
    
    useEffect(() => {
        AsyncStorage.getItem('prerequisites').then(storagedPrerequisites => {
            const prerequisitesArray = storagedPrerequisites.split(',').map(prerequisite => prerequisite.trim());

            setPrerequisites(prerequisitesArray);
        })
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />
            
            <ScrollView>
                {prerequisites.map(prerequisite => <RegisterJobList key={prerequisite} prerequisite={prerequisite}/>)}
            </ScrollView>

        </SafeAreaView>
      
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    
    logo: {
        height: 100,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 10
    },
});