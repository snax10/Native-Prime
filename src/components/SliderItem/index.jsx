import React from 'react';
import { Ionicons } from '@expo/vector-icons'

import { 
    Container,
    BannerItem,
    Title,
    RateContainer,
    Rate
 } from './styles'


function SliderItem({ data, navigatePage }) {
  return (
    <Container activeOpacity={0.7} onPress={()=> navigatePage(data)} >
        <BannerItem 
            source={{ uri:`https://image.tmdb.org/t/p/original/${data.poster_path}` }}
        />

        <Title numberOfLines={1}>{data.title}</Title>
        
        <RateContainer>
            <Ionicons name="md-star" size={12} color="#FFD700" />
            <Rate>{data.vote_average}</Rate>
        </RateContainer>

    </Container>
  )
}

export default SliderItem;