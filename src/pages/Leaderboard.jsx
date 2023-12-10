import React, { useState, useEffect } from "react";
import styled from "styled-components";

const PageTitle = styled.h2`
  font-size: 28px;
  font-weight: 400;
  text-align: center;
  color: #333;
`;
const NoScores = styled.h5`
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  color: #333;
`;

const TitleContainer = styled.div`
  padding: 20px;
  margin: 10px;
`;

const EntriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 800px;
  margin: 0 auto 36px;
  gap: 30px;
`;

const ItemContainer = styled.div`
  display: flex;
  /* justify-content: space-between; */
  border-bottom: 1px solid rgba(51, 51, 51, 0.2);
  padding: 4px 4px 8px;
  margin: 0 36px;
`;

const ScoreText = styled.p`
  color: #333;
  text-overflow: ellipsis;
  font-size: 16px;
`;

const ItemNumber = styled(ScoreText)`
  margin-right: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
`;

function Leaderboard() {
  const [leaderboardData, setLeaderBoardData] = useState([]);

  function formatCentiseconds(totalCentiseconds) {
    const totalSeconds = Math.floor(totalCentiseconds / 100);
    const remainingSeconds = totalSeconds % 60;

    const totalMinutes = Math.floor(totalSeconds / 60);
    const remainingMinutes = totalMinutes % 60;

    const remainingCentiseconds = totalCentiseconds % 100;

    const formattedString = `${String(remainingMinutes).padStart(
      2,
      "0"
    )}:${String(remainingSeconds).padStart(2, "0")}:${String(
      remainingCentiseconds
    ).padStart(2, "0")}`;

    return formattedString;
  }

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const result = await fetch("http://localhost:3000/api/scores", {
          method: "GET",
        });
        const data = await result.json();
        console.log("API DATA", data);
        if (result.ok) {
          setLeaderBoardData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchScores();
  }, []);

  return (
    <>
      <TitleContainer>
        <PageTitle>Leaderboard</PageTitle>
      </TitleContainer>

      <EntriesContainer>
        {leaderboardData.length === 0 ? (
          <NoScores>No Scores! Submit a score to see it here!</NoScores>
        ) : (
          leaderboardData.map((item, index) => {
            return (
              <ItemContainer key={index}>
                <ItemNumber>{index + 1}.</ItemNumber>
                <ScoreText style={{ flex: 1 }}>{item.username}</ScoreText>
                <ScoreText>{formatCentiseconds(item.time)}</ScoreText>
              </ItemContainer>
            );
          })
        )}
      </EntriesContainer>
    </>
  );
}

export default Leaderboard;
