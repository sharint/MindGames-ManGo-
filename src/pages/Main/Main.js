import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { Header } from "./components/Header";
import { Content } from "./components/Content";
import styled from "styled-components";
import { getProfile } from "../../store/Profile/actions";
import { getCurrentGame } from "../../store/GameCreate/actions";

const Background = styled.div`
  background-color: #add8e6;
`;
const Wrapper = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  padding-top: 170px;
`;
const HelpItem = styled.div`
  width: 68%;
  margin-bottom: 0px;
  max-width: 600px;
  margin: 0 auto;
  height: 10vh;
  position: relative;
  background: "#D8AD63";
  padding: 10px;
  cursor: pointer;
`;
const HelpWrapper = styled.div`
  margin-top: 23px;
  max-height: 508px;
  overflow: scroll;
  overflow-x: hidden;
  background: ${(props) => (props.active ?"#D8AD63" : "#f6f6f6")};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const ResultGame = styled.div`
  width: 100%;
  margin-right:  -10 em;
  max-height: 508px;
  border: 1px solid orange;
  background: #fff5d7;
  margin-bottom: 0px;
  max-width: 300px;
  position: relative;
  background: "#D8AD63";
  padding: 10px;
  cursor: pointer;
`;


const Main = ({ history, location }) => {
  const [searchType, setSearchType] = useState(location.state?.from ? location.state.from : '');
  const dispatch = useDispatch();
  const playerInfo = useSelector((state) => state.profile.userProfile.user);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getCurrentGame());
  }, [])




  
  if(!playerInfo) {
    return null;
  }
let Info = 'Вы близки к достижению своей цели, не останавливайтесь, все обязательно получится.';

  return (
    <Background>
    <Wrapper>
      <Header
        history={history}
        setSearchType={setSearchType}
        searchType={searchType}
        nickname={playerInfo.nickname}
        pts={playerInfo.pts}
        avatar={playerInfo.avatar}
        winrate={playerInfo.winrate}

      />
      <Content
        history={history}
        searchType={searchType}
        setSearchType={setSearchType}
      />
 {/*    <ResultGame>  
  <h3>  О вашей последней игре: </h3>
   <p> {Info} </p>
   <p>  </p>
 </ResultGame> */}
    </Wrapper>
    </Background>
  );
};

export default Main;
