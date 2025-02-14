import React, {useEffect, useState} from "react";
import { View, Text, FlatList, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icon from "@react-native-vector-icons/fontawesome";


//Api
import api from "../../services/api";
import key from "../../../key";

//Components
import MovieList from "../MovieList";
import Favorites from "../Favorites";

export default function Main(){

  const [movieList, setMovieList] = useState([]);
  const [color1, setColor1] = useState("#990");
  const [color2, setColor2] = useState("#990");
  const [modalVisible, setModalIsVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  
  useEffect(() => {

    getMoviesList();
    changeScreen(1);

  }, [])


  useEffect(() => {

    getMoviesList();

  }, [page])
  
  
  
  function changeScreen(num){
    if(num == 1){
      setColor1("#00BFFF");
      setColor2("#aaa")
      setModalIsVisible(false);
    }else{
      setColor2("#00BFFF");
      setColor1("#aaa")
      setModalIsVisible(true);
    }
    
  }

  async function getMoviesList(){
    
    const response = await api.get('movie/now_playing?',{
      params:{
        api_key: key,
        language: "pt-BR",
        page: page
      }
    });

    setTotalPages(response.data.total_pages)
    
    let liked = false;
    let newList = [];
    
    response.data.results.forEach(movie => {
      movie = {...movie, liked}
      newList.push(movie)
    });
    
    setMovieList(newList);
    

  }
  
  function changePage(direction){
    if((direction == 'left' && page == 1) || (direction == 'right' && page == totalPages)){
      return;
    }
    
    if(direction == 'left'){
      setPage(page-1)
    }else{
      setPage(page+1)
    }
    
  }
  
  function changeTemPages(direction){
    if((direction == 'left' && page == 1) || (direction == 'right' && page == totalPages)){
      return;
    }

    if(direction == 'left' && page - 10 < 1){

      setPage(1);

    }else if(direction == 'right' && page + 10 > totalPages){
      setPage(totalPages);

    }else{

      if(direction == 'left'){
        setPage(page-10)
      }else{
        setPage(page+10)
      }
    }
    
    
  }
 

  return(
    <View style={{flex: 1, backgroundColor: '#151515'}}>
      {

        modalVisible ?

        <Favorites/>

        :


      <FlatList
        data={movieList}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => <MovieList data={item}/>}
      />
      }

      <View style={{height: 50, backgroundColor: '#050505', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
        <TouchableWithoutFeedback onPress={() => changeScreen(1)}>
          <View style={{flexDirection: 'column', alignItems:'center'}}>
            <Icon name="home" size={25} color={color1}/>
            <Text style={{color: '#fff', fontSize: 12}}>Início</Text>
          </View>
        </TouchableWithoutFeedback>

        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', gap: 15}}>

          <TouchableOpacity style={{width: 35, height: 35, alignItems: 'center', justifyContent: 'center'}} onPress={() => changePage("left")} onLongPress={() => changeTemPages("left")}>
            <Icon name="arrow-left" color="tomato" size={20}/>
          </TouchableOpacity>

          <Text style={{color: '#fff', fontSize: 18}}>{page} de {totalPages}</Text>

          <TouchableOpacity style={{width: 35, height: 35, alignItems: 'center', justifyContent: 'center'}} onPress={() => changePage("right")} onLongPress={() => changeTemPages("right")}>
            <Icon name="arrow-right" color="tomato" size={20}/>
          </TouchableOpacity>

        </View>

        <TouchableWithoutFeedback  onPress={() => changeScreen(2)}>
          <View style={{flexDirection: 'column', alignItems:'center'}}>
            <Icon name="heart" size={20} color={color2}/>
            <Text style={{color: '#fff', fontSize: 12}}>Favoritos</Text>
          </View>

        </TouchableWithoutFeedback>
      </View>

    </View>
  );
}