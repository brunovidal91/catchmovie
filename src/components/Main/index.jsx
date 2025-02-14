import React, {useEffect, useState, useRef} from "react";
import { View, Text, FlatList, TouchableWithoutFeedback, TouchableOpacity, Alert } from 'react-native';
import Icon from "@react-native-vector-icons/fontawesome";
import AsyncStorage from "@react-native-async-storage/async-storage";


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
  const [favList, setFavList] = useState([]);
  const [moviePosition, setMoviePosition] = useState(0);


  const flatListRef = useRef(null);

  
  useEffect(() => {



    getMoviesList();
    changeScreen(1);
    getFavList();


  }, [])


  useEffect(() => {

    getMoviesList();
    getFavList();

  }, [page, favList])
  
  
  
   function changeScreen(num){
    if(num == 1){
      setColor1("#00BFFF");
      setColor2("#aaa")
      setModalIsVisible(false);
      // flatListRef.current.scrollToOffset({animated: true, offset: Number(`${moviePosition}`)})

    
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
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }else{
      setPage(page+1)
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
    
  }
  
  function changeTemPages(direction){
    if((direction == 'left' && page == 1) || (direction == 'right' && page == totalPages)){
      return;
    }

    if(direction == 'left' && page - 10 < 1){

      setPage(1);
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });


    }else if(direction == 'right' && page + 10 > totalPages){
      setPage(totalPages);
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });

    }else{

      if(direction == 'left'){
        setPage(page-10)
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
      }else{
        setPage(page+10)
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
      }
    }
    
    
  }

  async function getFavList(){

    await AsyncStorage.getItem("@favs")
    .then((response) =>{
        if(response){

            setFavList(JSON.parse(response));
 
            
        }   
    })
  }

 

  return(
    <View style={{flex: 1, backgroundColor: '#151515'}}>
      {

        modalVisible ?
        <View style={{flex: 1, backgroundColor: '#151515'}}>


          <Text style={{fontSize: 17, color: '#fc0', textAlign: 'center', marginTop: 10}}>Meus favoritos</Text>
          <FlatList
            data={favList}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <Favorites movie={item} getFavL={() => getFavList} favList={favList} />}

          />
          
        </View>

        :


      <FlatList
        data={movieList}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => <MovieList data={item}/>}
        ref={flatListRef}
        onViewableItemsChanged={({item, changed}) => setMoviePosition(changed[0].index)}
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

          <TouchableOpacity style={{width: 35, height: 35, alignItems: 'center', justifyContent: 'center'}} 
          onPress={() => changePage("left")} 
          onLongPress={() => changeTemPages("left")}
          disabled={modalVisible ? true : false}>
            <Icon name="arrow-left" color={modalVisible ? "#aaa" : "tomato"} size={20}/>
          </TouchableOpacity>

          <Text style={{color: '#fff', fontSize: 18}}>{page} de {totalPages}</Text>

          <TouchableOpacity style={{width: 35, height: 35, alignItems: 'center', justifyContent: 'center'}} 
          onPress={() => changePage("right")} 
          onLongPress={() => changeTemPages("right")}
          disabled={modalVisible ? true : false}>
            <Icon name="arrow-right" color={modalVisible ? "#aaa" : "tomato"} size={20}/>
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