import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Logo from "../../../assets/img/logo.png";
import { ButtonCustom } from "../../../components/ButtonCustom";
import { Input } from "../../../components/InputCustom";
import { regSubmit, loginSubmit } from "../../../store/Auth/actions";

const Wrapper = styled.div`
  height: 100vh;
  position: relative;
  padding: 230px 0;
  display: flex;
  align-items: center;
  background-color: #add8e6;
`;

const Container = styled.div`
  width: 513px;
  margin: 0 auto;
`;

const Form = styled.form``;

const Top = styled.div`
  display: flex;
  align-self: flex-start;
  margin-bottom: 49px;
  margin-left: 50px;
  position: absolute;
  top: 50px;
`;

const Logotype = styled.img`
  height: auto;
  width: 405px;
  margin-right: 94px;
`;

const Tabs = styled.div`
  display: flex;
  text-align: center !important;
`;

const Tab = styled.p`
  cursor: pointer;
  font-size: 24px;
  line-height: 28px;
  color: ${(props) => (props.active ? "#000000" : "#838383")};
  font-weight: 700;
  margin: 10px;
`;
const Span = styled.p`
  font-size: 24px;
  line-height: 28px;
  color: #838383;
  font-weight: 700;
  margin-left: 5px;
  margin-right: 5px;
`;

const Auth = () => {
  const [activeTab, setActiveTab] = useState("reg");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

let reg ='Зарегистрироваться\n(Sign up)';
let login='Войти\n(Sign in)';
let err = 'Заполните все поля (Fill in all the fields)';
let next = 'Далее (Next step)';

if(localStorage.getItem('lang') == 'ru'){
  reg ='Зарегистрироваться';
  login='Войти';
  err = 'Заполните все поля';
  next = 'Далее';
}

if(localStorage.getItem('lang') == 'eng'){
  reg ='Sign up';
  login ='Sign in';
  err = 'Fill in all the fields';
  next = 'Next step';
} 

  const handleAuth = async (e) => {
    e.preventDefault();
    if (activeTab === "reg") {
      if (!email || !nickname) {
        setError(err);
      } else {
        setError("");
        await dispatch(regSubmit(nickname, email));
      }
    }
    if (activeTab === "auth") {
      if (!email || !password) {
        setError(err);
      } else {
        setError("");
        // setToken(register(email, nickname)
        await dispatch(loginSubmit(password, email));
      }
    }
  };

  return (
    <Wrapper>
      <Top>
        <Logotype alt="logo" src={Logo} />
      </Top>
      <Container>
        <Form onSubmit={handleAuth}>
          <Tabs>
            <Tab
              onClick={() => setActiveTab("reg")}
              active={activeTab === "reg"}
            >
              <pre>{reg}</pre>
            </Tab>
            
            <Tab
              onClick={() => setActiveTab("auth")}
              active={activeTab === "auth"}
            >
              <pre>{login}</pre>
            </Tab>
          </Tabs>
          <Input
            mt={20}
            type="email"
            placeholder="Email"
            onChange={setEmail}
            value={email}
            name="email"
          />
          {activeTab === "reg" ? (
            <Input
              mt={10}
              mb={30}
              placeholder="Nickname"
              onChange={setNickname}
              value={nickname}
              errorMessage={error}
              name="nickname"
            />
          ) : (
            <Input
              mt={10}
              mb={30}
              placeholder="Password"
              onChange={setPassword}
              value={password}
              errorMessage={error}
              name="password"
              type="password"
            />
          )}
          <ButtonCustom type="submit">{next}</ButtonCustom>
        </Form>
      </Container>
    </Wrapper>
  );
};

export default Auth;
