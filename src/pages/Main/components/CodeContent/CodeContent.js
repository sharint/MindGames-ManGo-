import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import styled from "styled-components";
import { ButtonCustom } from "../../../../components/ButtonCustom";
import { Input } from "../../../../components/InputCustom";
import { clearGameId, createGameCode, joinGameWithCode } from "../../../../store/GameCreate/actions";
import { client, token } from "../../../../Socket";

const Text = styled.p`
  font-size: 36px;
  line-height: 42px;
  text-align: center;
`;

let cancel ='Отмена';
let close = 'Закрытая игра';
let create = 'Создать игру';
let join = 'Присоединиться';
let codeU = 'Код вашей игры:';
let wait = 'Ожидайте';
let start = 'Начать игру';
let writeCode = 'Укажите код игры:';

if(localStorage.getItem('lang') == 'ru'){
  cancel ='Отмена';
  close = 'Закрытая игра';
  create = 'Создать игру';
  join = 'Присоединиться';
  codeU = 'Код вашей игры:';
  wait = 'Ожидайте';
  start = 'Начать игру';
  writeCode = 'Укажите код игры:';
} 

if(localStorage.getItem('lang') == 'eng'){
  cancel = 'Cancel';
  close = 'Closed game';
  create = 'Create game';
  join = 'Join';
  codeU = 'Your game code:';
  wait = 'Waiting';
  start = 'Start the game';
  writeCode = 'Enter the game code:';
} 

const CustomCodeContent = ({ setSearchType, setContentType }) => (
  <>
    <Text>{close}</Text>
    <ButtonCustom mt={40} mb={30} onClick={() => setContentType("CreateGame")}>
      {create}
    </ButtonCustom>
    <ButtonCustom mb={30} onClick={() => setContentType("JoinGame")}>
      {join}
    </ButtonCustom>
    <ButtonCustom onClick={() => setSearchType("")}>{cancel}</ButtonCustom>
  </>
);

const CreateGame = ({ setSearchType, cancelGame, code }) => (
  <>
    <Text>{codeU}</Text>
    <Input value={code || {wait}} textAlign="center" disabled mt={40} mb={30} />
    <ButtonCustom mb={30} onClick={() => setSearchType("CodeEnter")}>
      {start}
    </ButtonCustom>
    <ButtonCustom onClick={() => cancelGame()}>{cancel}</ButtonCustom>
  </>
);

const JoinGame = ({ setSearchType, cancelGame, code, setCode }) => (
  <>
    <Text>{writeCode}</Text>
    <Input mt={30} mb={30} onChange={setCode} name="code" />
    <ButtonCustom
      mb={30}
      disabled={!code}
      onClick={() => code && setSearchType("CodeEnter")}
    >
     {join}
    </ButtonCustom>
    <ButtonCustom onClick={() => cancelGame()}>{cancel}</ButtonCustom>
  </>
);

export const CodeContent = ({ gameId, setSearchType }) => {
  const [code, setCode] = useState("");
  const [contentType, setContentType] = useState("");
  const dispatch = useDispatch();
  const codeGame = useSelector(state => state.createGame.code);

  useEffect(() => {
    if (contentType === "CreateGame") {
      dispatch(createGameCode());
    }
  }, [contentType]);

  const getGameId = async (val) => {
    if (val === "CodeEnter") {
      if (code) {
        await dispatch(joinGameWithCode(code));
      }
    } else {
      setSearchType(val)
    }
  }

  const cancelGame = async () => {
    client.send(JSON.stringify([7, "go/game", {command: "resign", token: token, game_id: gameId}]));
    await dispatch(clearGameId())
    setSearchType("")
  }

  return (
    <>
      {!contentType ? (
        <CustomCodeContent
          setSearchType={setSearchType}
          setContentType={setContentType}
        />
      ) : null}
      {contentType === "CreateGame" ? (
        <CreateGame cancelGame={()=>cancelGame()} setSearchType={setSearchType} code={codeGame} />
      ) : null}
      {contentType === "JoinGame" ? (
        <JoinGame cancelGame={()=>cancelGame()} setSearchType={(val) => getGameId(val)} code={code} setCode={(val) => setCode(val)} />
      ) : null}
    </>
  );
};
