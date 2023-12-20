import React, { useRef } from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const Modal1 = styled.div`
  min-width: 300px;
  position: absolute;
  z-index: 2;
  padding: 24px;
  border-radius: 12px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  display: ${(props) => (props.$gameWon ? "block" : "none")};
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;
const Modal2 = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  gap: 10px;
  min-width: 300px;
  position: absolute;
  z-index: 2;
  padding: 24px;
  border-radius: 12px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const FlexDiv = styled.div`
  display: flex;
  gap: 8px;
`;

const TextBox = styled.input`
  padding: 4px;
`;

const EndGameModal = ({ time, gameWon }) => {
  const [displayedTime, setDisplayedTime] = useState("00:00:00");
  const firstDisplay = useRef(null);
  const secondDisplay = useRef(null);
  const [usernameValue, setUsernameValue] = useState("");

  const navigator = useNavigate();

  useEffect(() => {
    setDisplayedTime(formatCentiseconds(time));
  }, [time]);

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

  const sendScore = async () => {
    try {
      const result = await fetch(
        `https://wheres-waldo-server.onrender.com/api/scores`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify({
            username: usernameValue,
            time: time,
          }),
        }
      );
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClick1 = (e) => {
    e.preventDefault();

    sendScore();
    setUsernameValue("");

    firstDisplay.current.style.display = "none";
    secondDisplay.current.style.display = "flex";
  };

  const handleChange = (e) => {
    setUsernameValue(e.target.value);
  };

  const refresh = () => {
    window.location.reload();
  };

  return (
    <>
      <Modal1 ref={firstDisplay} $gameWon={gameWon}>
        <ModalForm action="">
          <h4>You Finished! Your time is {displayedTime}</h4>
          <FlexDiv>
            <label htmlFor="">Enter Username:</label>
            <TextBox
              type="text"
              name="username"
              placeholder="Username"
              value={usernameValue}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleClick1(e);
                }
              }}
            />
          </FlexDiv>
          <button type="submit" onClick={handleClick1} onSubmit={handleClick1}>
            Submit
          </button>
          <button onClick={refresh}>Retry</button>
        </ModalForm>
      </Modal1>
      <Modal2 ref={secondDisplay}>
        <button onClick={refresh}>Play Again</button>
        <button onClick={() => navigator("/leaderboard")}>
          View Leaderboard
        </button>
      </Modal2>
    </>
  );
};

export default EndGameModal;
