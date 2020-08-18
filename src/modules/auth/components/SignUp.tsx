import styled from "astroturf";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Input } from "../../../components/Input";
import { authRouts } from "../../../routs/authRouts";
import { authActionsAsync } from "../authActionsAsync";
import { useDispatch } from "react-redux";
import { emailRegexp, passwordRegexp } from "../../../consts/regexp";
import Button from "components/Button";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirm: string;
};

export const SignUp: FC = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, watch } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    delete data.confirm;
    dispatch(authActionsAsync.signup(data));
  };

  const confirm = () => {
    const password = watch("password");
    const confirm = watch("confirm");
    return password === confirm ? true : "Пароли не совпадают";
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Title>Регистрация</Title>
      <Input
        error={!!errors.username}
        name="username"
        type="text"
        title="Имя пользователя"
        ref={register({ required: true })}
      />

      <Input
        error={!!errors.email}
        name="email"
        type="email"
        title="E-mail"
        ref={register({ required: true, pattern: emailRegexp })}
      />

      <Input
        error={!!errors.password}
        name="password"
        type="password"
        title="Пароль"
        ref={register({ required: true, pattern: passwordRegexp })}
      />

      <Input
        error={!!errors.confirm}
        name="confirm"
        type="password"
        title="Подтвердите ароль"
        ref={register({ required: true, validate: { confirm } })}
      />

      <MyBtn type="submit" size="big">
        Подтвердить
      </MyBtn>

      <MyLink to={authRouts.signin.link}>Войти</MyLink>
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
