import React, {useEffect, useState} from "react";
import { View, Text, FlatList } from 'react-native';


//Api
import api from "./src/services/api";
import key from "./key";

//ListViwer
import MovieList from "./src/components/MovieList";

export default function App(){

  const [movieList, setMovieList] = useState([]);

  useEffect(() => {

    async function getMoviesList(){

      const response = await api.get('movie/now_playing?',{
        params:{
          api_key: key,
          language: "pt-BR",
          page: 1
        }
      });

      console.log(response.data.results)


      let liked = false;
      let newList = [];

      response.data.results.forEach(movie => {
        movie = {...movie, liked}
        newList.push(movie)
      });

      setMovieList(newList);


    }

    getMoviesList();


  }, [])



  

  return(
    <View style={{flex: 1, backgroundColor: '#252525'}}>
      
      <FlatList
        data={movieList}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => <MovieList data={item}/>}
      />

    </View>
  );
}