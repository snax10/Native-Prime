import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #141a29;
  padding: 4px 0;
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  width: 100%;
  height: 50px;
  align-items: center;
  padding: 0 14px;
  margin-bottom: 8px;
`;
export const Input = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.6);
  width: 80%;
  height: 50px;
  border-radius: 50px;
  padding: 8px 15px;
  font-size: 18px;
  color: #FFF;
`;
export const SearchButton = styled.TouchableOpacity`
  width: 20%;
  height: 50px;
  justify-content: center;
  align-items: center;
`;
export const Title = styled.Text`
  padding-top: 20px;
  padding-bottom: 8px;
  font-size: 24px;
  font-weight: bold;
  color: #FFF;
  margin-left: 14px;
`;

export const BannerButton = styled.TouchableOpacity`

`;

export const Banner = styled.Image`
  height: 200px;
  border-radius: 6px;
  margin: 0 14px;
`;

export const SliderMovie = styled.FlatList`
  height: 250px;
  padding: 0 14px;
`;