import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const PageWrapper = styled.div`
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;
`;

const HomeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: #333;
  color: white;
  padding: 90px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 20px;

  @media (max-width: 700px) {
    padding: 20px;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  cursor: pointer;
`;

const Title = styled.h3`
  margin-bottom: 10px;
  font-size: 24px;
  text-align: center;

  @media (max-width: 500px) {
    font-size: 16px;
  }

  @media (max-width: 300px) {
    font-size: 12px;
  }
`;

function Home() {
  const navigator = useNavigate();
  return (
    <PageWrapper>
      <HomeBox>
        <Title>Welcome to Where's The Superhero!</Title>
        <Button onClick={() => navigator("/play")}>Play</Button>
        <Button onClick={() => navigator("/leaderboard")}>Leaderboard</Button>
      </HomeBox>
    </PageWrapper>
  );
}

export default Home;
