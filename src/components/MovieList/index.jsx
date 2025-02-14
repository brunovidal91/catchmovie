import React, {useState, useEffect} from "react";
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

//Detail screen
import MovieDetails from "../MovieDetails";

export default function MovieList({ data }){

    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [liked, setLiked] = useState(false);
    // const [favList, setFavList] = useState([]);


    useEffect(() => {
        async function verifyFav(){
            let list = [];
            await AsyncStorage.getItem('@favs')
            .then((response) => {
                if(response != ""){

                    list = JSON.parse(response);

                }
            })

            list.forEach(item => {
                if(data.id == item.id){
                    setLiked(true);
                }
            })
 
        }

        verifyFav();
    },[])



    function closeModal(){
        setModalIsVisible(false);
    }

    function openModal(){
        setModalIsVisible(true);
    }

    async function like(){

        var favlist = [];

           await AsyncStorage.getItem('@favs')
            .then((itens) => {
                if(itens != null){
                    favlist = JSON.parse(itens)
                }
            })

        if(liked == false){

            data.liked = true;
            setLiked(true);

            favlist.push(data)
           await AsyncStorage.setItem('@favs', JSON.stringify(favlist))

            return;

        }

        data.liked = false;
        setLiked(false);
        
        let list = favlist.filter((item) => {
            return item.id != data.id
        });

        await AsyncStorage.setItem('@favs', JSON.stringify(list));

    }


    return(
        <View style={style.container}>
            <View style={style.movieContainer}>
                <View  style={style.header}>
                    <Text style={style.title}>{data.title}</Text>
                    <TouchableOpacity onPress={() => like()} style={{ position: 'absolute', right: 10, top: 6, height: 40, width: 40, alignItems: 'flex-end', justifyContent: 'flex-start' }}>
                        <Image source={liked ? require('../../assets/likeada.png') : require('../../assets/like.png')} style={style.like}/>
                    </TouchableOpacity>
                </View>
                <Image source={{uri: 'https://image.tmdb.org/t/p/original'+ data.poster_path}} style={style.image}/>
                <TouchableOpacity style={style.btn} onPress={() => openModal()}>
                    <Text style={style.btnTxt}>LEIA MAIS</Text>
                </TouchableOpacity>
            </View>
            <Modal transparent={true} animationType="slide" visible={modalIsVisible}>
                <MovieDetails movie={data} func={() => closeModal()}/>
            </Modal>
        </View>
    );

}


const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        gap: 10,
        flexDirection: 'column',
        margin: 15,

    },

    movieContainer: {
        borderWidth: 0.7,
        borderColor: '#ccc',
        width: '100%',
        flexDirection: 'column',
        gap: 5,
    },

    title: {
        fontSize: 17,
        color: '#fff',
        textAlign: 'left',
        padding: 5
    },

    image: {
        width: '100%',
        height: 450,
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
        right: 0,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },

    btnTxt: {
        color: '#fff'
    },

    like: {
        width: 20,
        height: 20
    },

    header:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    }

});