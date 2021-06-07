import React, { useState, useEffect } from 'react';
import { 
    View, 
    KeyboardAvoidingView, 
    Platform, 
    Image, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet,
    ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

import logo from '../assets/LogoMobile1.png';

export default function LoginCandidate({ navigation }){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    {/*useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user) {
                navigation.navigate('List');
            }
        })
    }, []);*/}

    async function handleSubmit(){
        const response = await api.post('/registerCandidates', { 
            email, 
            password,
        });

        const { _id } = response.data;

        await AsyncStorage.setItem('userCandidate', _id);

        navigation.navigate('Login');
    }

    function handleRegister() {
        navigation.navigate('Register');
    }

    return (
        <ScrollView>
        <KeyboardAvoidingView enabled={Platform.OS == 'ios'} behavior="padding" style={styles.container}>
            <Image 
            source={logo}
            acessibilidadeHint="Logo do Encontrei.">
            </Image>
            
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
                    accessibilityLabel="Digite seu e-mail"
                />

                <Text style={styles.label}>SENHA *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Exemplo: senha@123"
                    accessibilityLabel="Digite sua senha"
                    placeholderTextColor="#999"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity 
                onPress={handleSubmit} style={styles.button}
                accessibilityLabel="Botão para entrar no aplicativo Encontrei.">
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={handleRegister} style={styles.buttonRegister}
                accessibilityLabel="Botão para se cadastrar no aplicativo Encontrei.">
                    <Text style={styles.buttonTextRegister}>Cadastrar-se</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
        </ScrollView>
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

    buttonRegister: {
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },

    buttonTextRegister: {
        color: '#000',
        fontSize: 16
    },
});