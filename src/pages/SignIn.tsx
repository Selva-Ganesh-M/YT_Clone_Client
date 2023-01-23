import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { api } from "../api/api";
import { TChannelUser } from "../components/Card";
import { setUser, startSignup } from "../redux/slices/userSlice";
import { TPayload } from "./HomePage";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;


// functional component

const SignIn = () => {
  // grasping stuff
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // declaration
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  // const functions
  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // pre
    e.preventDefault();

    dispatch(startSignup())
    const response = await api.post<TPayload<TChannelUser>>("/auth/signin", {
      email, password
    })
    if (response.statusText === "OK") {
      dispatch(setUser(response.data.payload))
      navigate("/")
    }
  }

  // actual rendering
  return (
    <Container>
      <Wrapper>
        {/* sign in form */}
        <Title>Sign in</Title>
        <SubTitle>to continue to YT Clone</SubTitle>
        <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button onClick={handleSignIn}>Sign in</Button>

        {/* sign-up form */}
        <Title>or</Title>
        <SubTitle>register to YT Clone</SubTitle>
        <Input placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
        <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
