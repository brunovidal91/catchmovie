import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Linking, Image} from 'react-native';


export default function MovieDetails({ movie, func }){
    return(
        

        <View style={style.container}>
            <View style={style.containerDetail}>
                <TouchableOpacity style={style.btn} onPress={() => func()}>
                    <Text style={style.btnTxt}>Voltar</Text>
                </TouchableOpacity>
                <ScrollView>

                    <View style={style.containerSinopse}>
                        <Text style={style.title}>{movie.title}</Text>
                        <Text style={style.sinopseTitle}>Título original: {movie.original_title}</Text>
                        <Text style={style.sinopseTitle}>Lançamento: {new Date(movie.release_date).toLocaleDateString('pt-BR')}</Text>
                        <Text style={style.sinopseTitle}>Sinopse:</Text>
                        <Text style={style.sinopse}>{movie.overview ? movie.overview : "Não há informação fornecida atualmente para este título."}</Text>
                        <View style={style.avarageContainer}>
                            <Text style={style.averageTitle}>Avaliação: </Text>
                            <Text style={style.averageRate}>{Number(movie.vote_average).toFixed(1)}</Text>
                        </View>
                        <TouchableOpacity onPress={() => Linking.openURL("https://www.youtube.com/results?search_query="+ movie.original_title + "+trailer")} style={style.btnTrailer}>
                            <Image source={require("../../assets/ytube.png")} style={style.imgTrailer}/>
                            <Text style={style.txtTrailer}>Ver Trailer</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </View>
        
        </View>

    );

}

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        alignItems: 'center',
    },

    containerDetail: {
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#252525',
        width: '100%',
        height: '70%',
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8
    },
    btn:{
        backgroundColor: 'tomato',
        padding: 8,
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8
    },
    btnTxt:{
        color: '#eee',
        fontSize: 16
    },

    title: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 5,
        textAlign: 'center'
    },

    sinopseTitle: {
        fontSize: 16,
        color: '#fff',
        marginTop: 10

    },

    sinopse: {
        fontSize: 15,
        color: '#fff',
        marginTop: 5

    },

    containerSinopse:{
        width: '100%',
        padding: 8
    },

    averageTitle: {
        fontSize: 16,
        color: '#fff'
    },

    averageRate: {
        fontSize: 17,
        color: '#fc0',
        fontWeight: 'bold',

    },

    avarageContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        gap: 5
    },

    btnTrailer:{
        width: 110,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 10
    },

    imgTrailer: {
        width: 40,
        height: 40
    },

    txtTrailer:{
        fontSize: 15,
        color: '#fff'
    }

});