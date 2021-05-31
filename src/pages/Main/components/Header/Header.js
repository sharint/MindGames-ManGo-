import React from "react";
import styled from "styled-components";
import Logo from "../../../../assets/img/logo.png";
import AvatarImage from "../../../../assets/img/avatar.png";
import { MAIN_URL, PROFILE_URL } from "../../../../constants/routes";
import { ButtonCustom } from "../../../../components/ButtonCustom";
import { Input } from "../../../../components/InputCustom";

const Wrapper = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 35px;;
  display: flex;
  justify-content: flex-start;
  position: absolute;
  width: 100%;
  top: 0;
  border: 3px solid blue;
  border-radius: 17px;
  background-color: #FFF;
  `;

const Left = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: auto;
  flex-shrink: 1;
`;
const Right = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const RightContent = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
`;

const RightSearch = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: no-wrap;
  cursor: pointer;
  width: 100%;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Logotype = styled.img`
  width: 554px;
  height: auto;
  margin-right: 14px;
`;

const Name = styled.p`
  font-size: 48px;
  line-height: 56px;
  font-weight: 700;
`;

const Lang = styled.p`
  font-size: 24px;
  margin-right: 25px;
  margin-left: 25px;
  weight: 100%;
`;

const SelectRu = styled.button`
  font-size: 18px;
  line-height: 30px;
  font-weight: 600;
  color: #524f4e;
  margin-left: 20px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, .1);
`;

const SelectEng = styled.button`
  font-size: 18px;
  line-height: 30px;
  font-weight: 700;
  margin-left: 10px;
  color: #524f4e;
  box-shadow: 0 8px 15px rgba(0, 0, 0, .1);
`;

const ScoreWrapper = styled.div`
  display: flex;
`;

const Pts = styled.p`
  font-size: 20px;
  line-height: 23px;
  color: #5b5b5b;
`;

const Avatar = styled.img`
  border-radius: 100px;
  margin-left: 20px;
  width: 115px;
`;

const Search = styled.img`
  border-radius: 100px;
  margin-left: 20px;
  width: 115px;
`;

const Background = styled.div`
  border-color: #000;
  border: 10px;
  background-color: #000;
`;

let menu ='В меню';
let searchName ='Введите ник игрока';


if(localStorage.getItem('lang') == 'ru'){
  menu ='В меню';
  searchName ='Введите ник игрока';
} 

if(localStorage.getItem('lang') == 'eng'){
  menu = 'Menu';
  searchName ='Enter the nickname';
} 

export const Header = ({
  history,
  setSearchType,
  searchType,
  nickname,
  pts,
  winrate,
  avatar,
  profile,
  setNicknameFunc
}) => (
  <Background>
  <Wrapper>
    <Left
      onClick={() => {
        if (searchType !== "ConnectRandom" && searchType !== "ConnectCode") {
          history.push(MAIN_URL);
          setSearchType("");
        }
      }}
    >
      <Logotype alt="logo" src={Logo} />
     {/*<Lang>Язык сайта / <br />Site language:</Lang> */}

      <SelectRu onClick={() => {
        localStorage.setItem('lang', 'ru');
        console.log(localStorage.getItem('lang'));
        window.location.reload()
      }}               
      >RU</SelectRu>  
                 
      <SelectEng SelectRu onClick={() => {
        localStorage.setItem('lang', 'eng');
        console.log(localStorage.getItem('lang'));
        window.location.reload();
      }}>ENG</SelectEng>

    </Left>
    {!profile ? (
      <Right>

        <RightContent onClick={() => {
          if (searchType !== "ConnectRandom" && searchType !== "ConnectCode") {
            history.push(PROFILE_URL);
            setSearchType("");
          }
        }}>

          <Info>
            <Name>{nickname || ""}</Name>
            <ScoreWrapper>
              <Pts style={{ marginRight: 16 }}>{pts || 0}pts</Pts>
              <Pts>{winrate || ""}</Pts>
            </ScoreWrapper>
          </Info>
          <Avatar alt="avatar" src={avatar} />
        </RightContent>
      </Right>
    ) : (
      <RightSearch>
        <Input
          onChange={(e) => setNicknameFunc(e)}
          width="500px"
          mr={40}
          textAlign="left"
          placeholder={searchName}
        />
        <ButtonCustom width="auto" onClick={() => {
          history.push(MAIN_URL)
          setSearchType("")
        }} padding="0 20px">
          {menu}
        </ButtonCustom>
      </RightSearch>
    )}
  </Wrapper>
  </Background>
);
