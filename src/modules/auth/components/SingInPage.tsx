import styled from "astroturf";
import Button from "components/Button";
import { Input } from "components/Input";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authRouts } from "routs/authRouts";
import { passwordRegexp } from "../../../consts/regexp";
import { authActionsAsync } from "../authActionsAsync";

type FormData = {
  name: string;
  password: string;
};

export const SignInPage = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    dispatch(authActionsAsync.signin(data));
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Title>Вход</Title>

      <Input
        error={!!errors.name}
        name="name"
        type="string"
        title="E-mail or Username"
        ref={register({ required: true })}
      />

      <Input
        error={!!errors.password}
        name="password"
        type="password"
        title="Пароль"
        ref={register({ required: true, pattern: passwordRegexp })}
      />

      <MyBtn type="submit" size="big">
        Подтвердить
      </MyBtn>

      <MyLink to={authRouts.signup.link}>Зарегистрироваться</MyLink>
    </Container>
  );
};

const Container = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 360px;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0px 5px 15px #dddddd;
  background: white;
`;

const Title = styled.h2`
  margin: 0 0 16px;
  text-align: center;
  width: 100%;
`;

const MyLink = styled(Link)`
  margin: 20px 0;
  width: 100%;
  text-align: center;
`;

const MyBtn = styled(Button)`
  width: 213px;
  margin: 20px 0;
`;
