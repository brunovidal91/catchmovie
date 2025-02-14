import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Modal, Alert } from 'react-native';
import Icon from "@react-native-vector-icons/fontawesome";


import MovieDetails from "../MovieDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Favorites({ movie, getFavL, favList }){

    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [removed, setRemoved] = useState(false);

    useEffect(() => {
        getFavL();
    },[])

    useEffect(() => {

        getFavL();

    },[removed])


    function closeModal(){
        setModalIsVisible(false);
    }

    function openModal(){
        setModalIsVisible(true);
    }

    async function removeFav(movie){

    let newList = favList.filter((item) => {
        return item.id != movie.id
    });
    
    await AsyncStorage.setItem("@favs", JSON.stringify(newList))

    setRemoved(true);

    }

    return(
        <View style={style.container}>





            {

            movie ?

            <View style={style.itemContainer}>
                

                <View style={style.itemContainerData}>
                    <Image source={{uri: 'https://image.tmdb.org/t/p/original'+ movie.poster_path}} style={style.image}/>
                    <View style={style.itemContainerTitle}>
                        <Text style={style.dados} key={movie.id}>{movie.title}</Text>
                        <Text style={style.dadosAverage}>{Number(movie.vote_average).toFixed(1)}</Text>
                    </View>
                </View>
                
                <View>
                    <TouchableOpacity style={{position: 'absolute', right: 0, top: 0, width: 40, height: 40, alignItems: 'flex-end', justifyContent: 'flex-start'}} onPress={() => removeFav(movie)}> 
                        <Icon name="trash" size={25} color="red"/>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={style.btn} onPress={() => openModal()}>
                    <Text style={style.btnTxt}>LEIA MAIS</Text>
                </TouchableOpacity>

                    <Modal transparent={true} animationType="slide" visible={modalIsVisible}>
                        <MovieDetails movie={movie} func={() => closeModal()}/>
                </Modal>

            </View>

            
            :

            []
            
            }


        </View>
    );
}


const style = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        margin: 10
    },

    dados: {
        color: '#fff',
        fontSize: 15,
        width: 200

    },
    dadosAverage: {
        color: '#fc0',
        fontSize: 15,
        textAlign: 'left'
    },
    itemContainer: {
        width: '100%',
        height: 110,
        flexDirection: 'row',
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#bbb',
        padding: 10,
        borderRadius: 3,
        justifyContent: 'space-between'

    },

    itemContainerData: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    itemContainerTitle: {
        flexDirection: 'column',
        marginLeft: 10
    },

    image: {
        width: 70,
        height: 100,
        objectFit: 'cover'
    },

    btn: {
        backgroundColor: '#00BFFF',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90',
        position: 'absolute',
        zIndex: 100,
        bottom: 5,
        right: 5,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },

    btnTxt: {
        color: '#fff'
    },

});