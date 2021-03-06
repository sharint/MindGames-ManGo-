import React from "react";
import styled from "styled-components";

const Btn = styled.button`
  width: ${(props) => (props.width ? props.width : "100%")};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 400)};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "center")};
  font-family: "Bradley Hand", cursive;
  padding: ${(props) => (props.padding ? props.padding : "0")};
  height: ${(props) => (props.height ? props.height : "62px")};
  display: block;
  outline: none;
  flex-shrink: 0;
  margin-right: ${(props) => (props.mr ? `${props.mr}px` : "0")};
  margin-left: ${(props) => (props.ml ? `${props.ml}px` : "0")};
  margin-top: ${(props) => (props.mt ? `${props.mt}px` : "0")};
  margin-bottom: ${(props) => (props.mb ? `${props.mb}px` : "0")};
  background-color: ${(props) =>
    props.disabled
      ? "#e5f4ff"
      : props.backgroundColor
      ? props.backgroundColor 
      : "#ddd2ec"};
  color: ${(props) =>
    props.disabled ? "#9b9b9b" : props.textColor ? props.textColor : "#000000"};
  cursor: pointer;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "28px")};
  border: none;
  &:hover {
    background-color: ${(props) => (props.disabled ? "#e5f4ff" : "#FFFFFF")};
  }
  border-color: #8B00FF;
  border-style: outset; 
  border-width: 4px 4px 4px 4px;
  border-radius: 40px;
`;

export const ButtonCustom = ({
  children,
  width,
  fontWeight,
  textAlign,
  padding,
  height,
  mr,
  fontSize,
  ml,
  mt,
  mb,
  backgroundColor,
  textColor,
  disabled,
  type,
  onClick
}) => (
  <Btn
    width={width}
    fontWeight={fontWeight}
    textAlign={textAlign}
    padding={padding}
    fontSize={fontSize}
    height={height}
    mr={mr}
    ml={ml}
    mt={mt}
    mb={mb}
    backgroundColor={backgroundColor}
    textColor={textColor}
    disabled={disabled}
    type={type}
    onClick={onClick}
  >
    {children}
  </Btn>
);
