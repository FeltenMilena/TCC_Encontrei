import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity } from 'react-native';

import api from '../services/api';

function RegisterJobList({ prerequisite, navigation }){
    const [registerJobs, setRegisterJobs] = useState([]);

    useEffect(() => {
        async function loadRegisterJob() {
            const response = await api.get('/registerJobs', {
                params: { prerequisite }
            })

          setRegisterJobs(response.data);  
        }

        loadRegisterJob();
    }, []);

    function handleNavigate(id) {
        navigation.navigate('Book', { id });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Empresas com pré-requisitos em: <Text style={styles.bold}>{prerequisite}</Text></Text>
        
            <FlatList
                style={styles.list}
                data={registerJobs}
                keyExtractor={ registerJob => registerJob._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url }} />
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.wage}>{item.wage ? `R$${item.wage}/mês` : 'SALÁRIO À COMBINAR'}</Text>
                        <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
                            <Text style={styles.buttonText}>Solicitar Vaga</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },

    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15,
    },

    bold: {
        fontWeight: 'bold'
    },

    list: {
        paddingHorizontal: 20,
    },

    listItem: {
        marginRight: 15,
    },

    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2,
    },

    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },

    wage: {
        fontSize: 15,
        color: '#999',
        marginTop: 5
    },
    
    button: {
        height: 32,
        backgroundColor: '#35aaff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginTop: 15,
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
});

export default withNavigation(RegisterJobList);