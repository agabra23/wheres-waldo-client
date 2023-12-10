import React, { useEffect, useState } from "react";
import styled from "styled-components";
import hulkThumbnail from "../assets/hulk-wheres-waldo.jpeg";
import ironmanThumbnail from "../assets/ironman-wheres-waldo.jpeg";
import supermanThumbnail from "../assets/superman-wheres-waldo.jpeg";

const PlayBarContainer = styled.div`
  background-color: #333;
  padding: 10px;
  position: absolute;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 700px) {
    position: static;
    width: calc(75%);
  }
`;

const Thumbnail = styled.img`
  object-fit: contain;
  border-radius: 50%;
  max-width: 80px;

  border: ${(props) => (props.$characterChecked ? "2px solid lime" : "none")};

  @media (max-width: 900px) {
    max-width: 60px;
  }
  @media (max-width: 400px) {
    max-width: 45px;
  }
`;

const Timer = styled.p`
  color: white;
  margin-top: 10px;
  font-size: 20px;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 8px;
`;

const PlayBar = ({ superman, ironman, hulk, time }) => {
  useEffect(() => {}, [superman, ironman, hulk]);

  const [displayedTime, setDisplayedTime] = useState("00:00:00");

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

  return (
    <PlayBarContainer>
      <ImageContainer>
        <Thumbnail $characterChecked={hulk} src={hulkThumbnail} alt="Hulk" />
        <Thumbnail
          $characterChecked={ironman}
          src={ironmanThumbnail}
          alt="Iron Man"
        />
        <Thumbnail
          $characterChecked={superman}
          src={supermanThumbnail}
          alt="Superman"
        />
      </ImageContainer>
      <Timer>{displayedTime}</Timer>
    </PlayBarContainer>
  );
};

export default PlayBar;
