import React, { useState, useEffect } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Genres from "../../components/Genres";
import ModalLink from "../../components/ModalLink";

import api, { key } from "../../services/api";
import Stars from "react-native-stars";

import { ScrollView, Modal } from 'react-native'

import {
  Container,
  Header,
  HeaderButton,
  Banner,
  ButtonLink,
  Title,
  ContentArea,
  Rate,
  ListGenres,
  Description
} from "./styles";

function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const [movie, setMovie] = useState({});
  const [openLink, setOpenLink] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function getMovie() {
      const response = await api
        .get(`/movie/${route.params?.id}`, {
          params: {
            api_key: key,
            language: "pt-BR",
          },
        })
        .catch((err) => {
          console.log(err);
        });

      if (isActive) {
        setMovie(response.data);
      }
    }

    if (isActive) {
      getMovie();
    }

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <Container>
      <Header>
        <HeaderButton activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={28} color="#fff" />
        </HeaderButton>

        <HeaderButton>
          <Ionicons name="bookmarks" size={28} color="#fff" />
        </HeaderButton>
      </Header>

      <Banner
        source={{
          uri: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
        }}
        resizeMethod="resize"
      />

      <ButtonLink onPress={() => setOpenLink(true)}>
        <Feather name="link" size={28} color="#fff" />
      </ButtonLink>

      <Title numberOfLines={2}>{movie.title}</Title>

      <ContentArea>
        <Stars
          default={movie.vote_average}
          count={10}
          starSize={20}
          fullStar={<Ionicons name="md-star" size={20} color="#ffd700" />}
          emptyStar={<Ionicons name="md-star-outline" size={20} color="#ffd700" />}
          halfStar={<Ionicons name="md-star-half" size={20} color="#ffd700" />}
        />

        <Rate>{movie.vote_average}</Rate>
      </ContentArea>

      <ListGenres 
        data={movie?.genres}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) => <Genres data={item} />} 
      />    

        <ScrollView>
            <Title>Sinopse</Title>
            <Description>{movie?.overview}</Description>
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={openLink}
        >
          <ModalLink 
            link={movie?.homepage}
            title={movie?.title}
            closeModal={() => setOpenLink(false)}
          />
        </Modal>

    </Container>
  );
}

export default Detail;
