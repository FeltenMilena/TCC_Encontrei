import React, {useState, useEffect} from 'react';
import { View, SafeAreaView, StyleSheet,Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RegisterJobList from '../components/RegisterJobList';

import logo from '../assets/LogoMobile1.png';

export default function List(){
    const [prerequisites, setPrerequisites] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('prerequisites').then(storagedPrerequisites => {
            const prerequisitesArray = storagedPrerequisites.split(',').map(prerequisite => prerequisite.trim());

            setPrerequisites(prerequisitesArray);
        })
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />

            {prerequisites.map(prerequisite => <RegisterJobList key={prerequisite} prerequisite={prerequisite}/>)}
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