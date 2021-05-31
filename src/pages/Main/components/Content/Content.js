import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { ButtonCustom } from "../../../../components/ButtonCustom";
import { CodeContent } from "../CodeContent";
import { Connect } from "../Connect";
import { LoadingGame } from "../LoadingGame";
import { Winner } from "../Winner";
import { Error } from "../Error";
import { INFO_URL } from "../../../../constants/routes";
import { createRandomGame, createGameWithAi } from "../../../../store/GameCreate/actions";
import { useDispatch, useSelector } from "react-redux";

const Wrapper = styled.div`
  width: 613px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

let wait1 ='Ожидание случайного соперника';
let wait2 ='Ожидание второго игрока';

if(localStorage.getItem('lang') == 'ru'){
  wait1 ='Ожидание случайного соперника';
  wait2 ='Ожидание второго игрока';
} 

if(localStorage.getItem('lang') == 'eng'){
  wait1 = 'Waiting for a random opponent';
  wait2='Waiting for the second player';
} 

const ContentMainBoard = (setSearchType, searchType, history, gameId) => {
  const [opponent, setOpponent] = useState({})
  const [code, setCode] = useState('')

  switch (searchType) {
    case "Code":
      return <CodeContent gameId={gameId} setSearchType={setSearchType} />;

    case "Random":
      return (
        <LoadingGame
          gameId={gameId}
          setSearchType={setSearchType}
          text={wait1}
          setOpponent={setOpponent}
          searchType={searchType}
          />
      );

    case "CodeEnter":
      return (
        <LoadingGame
          gameId={gameId}
          setSearchType={setSearchType}
          setOpponent={setOpponent}
          code={code}
          text={wait2}
          searchType={searchType}
        />
      );

    case "ConnectRandom":
      return (
        <Connect
          history={history}
          opponent={opponent}
          setSearchType={setSearchType}
          text="Противник найден!"
        />
      );

    case "ConnectCode":
      return (
        <Connect
          history={history}
          opponent={opponent}
          setSearchType={setSearchType}
          text="Игрок подключился!"
        />
      );

    case "Win":
      return <Winner setSearchType={setSearchType} />;

    case "Error":
      return (
        <Error
          error="Не удалось подключиться к запрашиваемой игре"
          setSearchType={setSearchType}
        />
      );

    default:
  }
};

export const Content = ({ history, searchType, setSearchType }) => {
  const dispatch = useDispatch();
  const gameId = useSelector(state => state.createGame.id);

  useEffect(async ()=>{
    if (searchType === "Random") await dispatch(createRandomGame())
    if (searchType === "WithAi") await dispatch(createGameWithAi())
  }, [searchType])

let contiune = 'Продолжить игру';
let playRand = 'Игра со случайным соперником';
let playII = 'Игра с ИИ';
let playClose = 'Закрытая игра';
let rate = 'Рейтинг игроков';

if(localStorage.getItem('lang') == 'ru'){
  contiune = 'Продолжить игру';
  playRand = 'Игра со случайным соперником';  
  playII = 'Игра с ИИ';
  playClose = 'Закрытая игра';
  rate = 'Рейтинг игроков';
} 

if(localStorage.getItem('lang') == 'eng'){
  contiune = 'Continue game';
  playRand = 'Playing with a random opponent';
  playII = 'Game with AI';
  playClose = 'Closed game';
  rate = 'Player rating';
} 

  return (
    <Wrapper>
      {!searchType ? (
        <>
          <ButtonCustom mb={30} onClick={() => history.push('/gameBoard')} disabled={gameId === null}>
             {contiune}
          </ButtonCustom>
          <ButtonCustom mb={30} onClick={() => setSearchType("Random")} disabled={gameId !== null}>
            {playRand}
          </ButtonCustom>
          <ButtonCustom mb={30} onClick={() => setSearchType("WithAi")} disabled={gameId !== null}>
            {playII}
          </ButtonCustom>
          <ButtonCustom onClick={() => setSearchType("Code")} mb={30} disabled={gameId !== null}>
            {playClose}
          </ButtonCustom>
          <ButtonCustom mb={30} onClick={() => history.push('/liders')}>{rate}</ButtonCustom>{" "}
        </>
      ) : null}
      {ContentMainBoard(setSearchType, searchType, history, gameId)}
    </Wrapper>
  );
};
