import React, { useState, useEffect } from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";

import SliderItem from "../../components/SliderItem";
import Header from "../../components/Header";

import api, { key } from "../../services/api";
import { getListMovies, getRandomBanner } from "../../utils/movie";
import { useNavigation } from '@react-navigation/native'

import {
  Container,
  SearchContainer,
  Input,
  SearchButton,
  Title,
  BannerButton,
  Banner,
  SliderMovie,
} from "./styles";

function Home() {
  const [movies, setMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [bannerMovie, setBannerMovie] = useState({});

  const [loading, setLoading] = useState(true);

  const navigation = useNavigation()

  useEffect(() => {
    let isActive = true;
    const ac = new AbortController();

    async function getMovies() {
      const [nowData, popularData, topData] = await Promise.all([
        api.get('/movie/now_playing', {
          params: {
            api_key: key,
            language: "pt-BR",
            page: 1,
          },
        }),
        api.get('/movie/popular', {
          params: {
            api_key: key,
            language: "pt-BR",
            page: 1,
          },
        }),
        api.get('/movie/top_rated', {
          params: {
            api_key: key,
            language: "pt-BR",
            page: 1,
          },
        }),
      ]);
      
      if (isActive) {
        const nowList = getListMovies(10, nowData.data.results);
        const popularList = getListMovies(5, popularData.data.results);
        const topList = getListMovies(5, topData.data.results);

        setBannerMovie(nowData.data.results[getRandomBanner(nowData.data.results)]);
  
        setMovies(nowList);
        setPopularMovies(popularList);
        setTopMovies(topList);

        setLoading(false);
      }
    }
    getMovies();

    return () => {
      isActive = false;
      ac.abort();
    }

  }, []);

  function navigateDatailsPage(item) {
    navigation.navigate("Detail", { id: item.id });
  }

  if(loading) {
    return(
      <Container>
        <ActivityIndicator size="large" color="#FFF" />
      </Container>
    )
  }

  return (
    <Container>
      <Header title="React Prime" />

      <SearchContainer>
        <Input placeholder="Buscar" placeholderTextColor="#DDD" />
        <SearchButton>
          <Feather name="search" size={30} color="#fff" />
        </SearchButton>
      </SearchContainer>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Destaques</Title>

        <BannerButton activeOpacity={0.8} onPress={() => navigateDatailsPage(bannerMovie)}>
          <Banner
            source={{
              uri: `https://image.tmdb.org/t/p/original${bannerMovie.poster_path}`,}}
            resizeMethod="resize"
          />
        </BannerButton>

        <SliderMovie
          horizontal
          showsHorizontalScrollIndicator={false}
          data={movies}
          renderItem={({ item }) => <SliderItem data={item} navigatePage={() => navigateDatailsPage(item) }/>}
          keyExtractor={( item ) => String(item.id)}
        />

        <Title>Mais assistidos</Title>

        <SliderMovie
          horizontal
          showsHorizontalScrollIndicator={false}
          data={popularMovies}
          renderItem={({ item }) => <SliderItem data={item} navigatePage={() => navigateDatailsPage(item) } />}
          keyExtractor={( item ) => String(item.id)}
        />

        <Title>Mais votados</Title>

        <SliderMovie
          horizontal
          showsHorizontalScrollIndicator={false}
          data={topMovies}
          renderItem={({ item }) => <SliderItem data={item} navigatePage={() => navigateDatailsPage(item) } />}
          keyExtractor={( item ) => String(item.id)}
        />
      </ScrollView>
    </Container>
  );
}

export default Home;
