import React, {useState, useEffect} from 'react';
import socketio from 'socket.io-client';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RegisterJobList from '../components/RegisterJobList';

import logo from '../assets/LogoMobile1.png';

export default function List({ navigation }){
    const [prerequisites, setPrerequisites] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('userCandidate').then(user_id => {
          const socket = socketio('http://192.168.1.108:3333', {
            query: { user_id }
          })
    
          socket.on('booking_response', booking => {
            Alert.alert(`Sua reserva em ${booking.registerJob.company} foi ${booking.approved ? 'APROVADA entre em contato pelo número: ' + `${booking.registerJob.cell}` + ' ou envie um e-mail para: ' + `${booking.registerJob.email}` : 'REJEITADA'}`);
          })
        })
      }, []);
    
    useEffect(() => {
        AsyncStorage.getItem('prerequisites').then(storagedPrerequisites => {
            const prerequisitesArray = storagedPrerequisites.split(',').map(prerequisite => prerequisite.trim());

            setPrerequisites(prerequisitesArray);
        })
    }, []);

    function handleSubmit() {
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />

            <ScrollView>

            <TouchableOpacity 
                onPress={handleSubmit}
                accessibilityLabel="Botão para voltar"
                style={styles.buttonBack}>
                    <Text style={styles.buttonTextBack}>Voltar</Text>
            </TouchableOpacity>

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

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },

    buttonBack: {
        paddingHorizontal: 20,
        borderRadius: 4,
    },

    buttonTextBack: {
        color: '#E55E5E',
        fontSize: 16
    },
});