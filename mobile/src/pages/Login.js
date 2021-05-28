import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Platform, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

import logo from '../assets/LogoMobile1.png';

export default function Login({ navigation }){
    const [email, setEmail] = useState('');
    const [prerequisites, setPrerequisites] = useState('');

    {/*useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user) {
                navigation.navigate('List');
            }
        })
    }, []);*/}

    async function handleSubmit(){
        console.log(email);
        const response = await api.post('/sessions', {
            email
        });

        const { _id } = response.data;

        console.log(_id);

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('prerequisites', prerequisites);

        console.log( AsyncStorage.getItem('user'));

        navigation.navigate('List');
    }

    return (
        <KeyboardAvoidingView enabled={Platform.OS == 'ios'} behavior="padding" style={styles.container}>
            <Image source={logo}></Image>
            
            <View style={styles.form}>
                <Text style={styles.label}>SEU E-MAIL *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Seu e-mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>CONHECIMENTOS * (separados por vírgula)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Pacote Office, Inglês Básico."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={prerequisites}
                    onChangeText={setPrerequisites}
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Encontrar vagas</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
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

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
});