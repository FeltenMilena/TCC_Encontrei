import React, { useState } from 'react';
import {SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

export default function Book({ navigation }){
    const [message, setMessage] = useState('');
    const id = navigation.getParam('id');

    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem('userCandidate');

        await api.post(`/registerJobs/${id}/bookings`, {
            message
        }, {
            headers: { user_id }
        })

        Alert.alert('Solicitação de vaga enviada.');

        navigation.navigate('List');
    }

    function handleCancel() {
        navigation.navigate('List');
    }

    return (

        <SafeAreaView style={styles.container}>
            
            <Text style={styles.label}>MENSAGEM PARA A EMPRESA *</Text>
            <TextInput
            style={styles.input}
            placeholder="Escreva alguma mensagem para a empresa."
            placeholderTextColor="#999"
            autoCapitalize="none"
            autoCorrect={false}
            value={message}
            onChangeText={setMessage}
            />
    
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>
    
            <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
        );
}

const styles = StyleSheet.create({
    container: {
        margin: 30,
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        margin: 20,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 4
    },

    button: {
        height: 42,
        backgroundColor: '#35aaff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },

    cancelButton: {
        backgroundColor: '#ccc',
        marginTop: 10,
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
});