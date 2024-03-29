import React, { useEffect, useState, useRef } from "react";
import mainPicture from "../assets/sw-wheres-waldo.jpg";
import styled from "styled-components";
import PlayBar from "../components/PlayBar";
import EndGameModal from "../components/EndGameModal";

const Loader = styled.div`
  border: 10px solid #f3f3f3;
  border-top: 10px solid #3498db;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

const MainImage = styled.img`
  max-width: 100%;
  max-height: 150%;
  object-fit: contain;
  cursor: pointer;
`;

const Overlay = styled.div`
  position: absolute;
  opacity: ${(props) => (props.$gameWon || !props.$started ? 1 : 0)};

  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1;
  background-color: rgba(51, 51, 51, 0.5);
  pointer-events: ${(props) =>
    props.$gameWon || !props.$started ? "all" : "none"};
`;

const StartButton = styled.button`
  padding: 30px;
  margin: 0;
  font-size: 16px;
  border-radius: 10px;
  background-color: white;
  color: #333;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 5;
  transform: translate(-50%, 50%);
  border: none;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  cursor: pointer;
  font-size: 24px;

  &:hover {
    background-color: #333;
    color: white;
  }
`;

const ImageWrapper = styled.div`
  height: 60vh;
  max-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;

const isWithinBoundaries = (x, y, targetX, targetY) => {
  if (targetX - 5 < x && x < 5 + targetX) {
    if (targetY - 5 < y && y < 5 + targetY) {
      return true;
    }
  }
  return false;
};

function Play() {
  const imageRef = useRef(null);
  const startButtonRef = useRef(null);
  const [characters, setCharacters] = useState([]);
  const [supermanChecked, setSupermanChecked] = useState(false);
  const [ironmanChecked, setIronmanChecked] = useState(false);
  const [hulkChecked, setHulkChecked] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  const intervalId = useRef(null);

  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  //  Takes screen size into consideration when getting click coordinates
  const updateImageDimensions = () => {
    if (imageRef.current) {
      const { width, height } = imageRef.current.getBoundingClientRect();
      setImageDimensions({ width, height });
    }
  };

  const startGame = () => {
    const id = setInterval(() => setTime((oldTime) => oldTime + 1), 10);
    intervalId.current = id;
    startButtonRef.current.style.display = "none";
    setStarted(true);
  };

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_API_URL}/api/characters`;
        const result = await fetch(apiUrl, {
          method: "GET",
          mode: "cors",
        });
        const data = await result.json();
        if (result.ok) {
          setCharacters(data);
          console.log("Connected to Server");
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCharacters();

    updateImageDimensions();
    window.addEventListener("resize", updateImageDimensions);

    return () => {
      clearInterval(intervalId.current);
      window.removeEventListener("resize", updateImageDimensions);
    };
  }, []);

  useEffect(() => {
    const alertWin = () => {
      if (hulkChecked && supermanChecked && ironmanChecked) {
        setGameWon(true);
      }
    };
    alertWin();
  }, [hulkChecked, ironmanChecked, supermanChecked]);

  useEffect(() => {
    if (gameWon) {
      clearInterval(intervalId.current);
      setScore(time);
    }
  }, [gameWon, time]);

  const checkCharacter = (characterClicked) => {
    switch (characterClicked) {
      case "hulk":
        setHulkChecked(true);
        break;
      case "ironman":
        setIronmanChecked(true);
        break;
      case "superman":
        setSupermanChecked(true);
        break;
    }
  };

  const handleClick = (e) => {
    const { left, top } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / imageDimensions.width) * 100;
    const y = ((e.clientY - top) / imageDimensions.height) * 100;
    let characterClicked = "Not a character";
    characters.forEach((character) => {
      if (isWithinBoundaries(x, y, character.x, character.y)) {
        characterClicked = character.name;
      }
    });

    checkCharacter(characterClicked);
  };

  return loading ? (
    <LoaderWrapper>
      <Loader />
    </LoaderWrapper>
  ) : (
    <>
      <ImageWrapper>
        <MainImage
          ref={imageRef}
          onLoad={updateImageDimensions}
          onClick={handleClick}
          src={mainPicture}
          alt="picture"
        />
        <PlayBar
          superman={supermanChecked}
          ironman={ironmanChecked}
          hulk={hulkChecked}
          time={time}
        />
        <EndGameModal time={score} gameWon={gameWon} />
        <StartButton ref={startButtonRef} onClick={startGame}>
          Start Game
        </StartButton>
      </ImageWrapper>
      <Overlay $gameWon={gameWon} $started={started} />
    </>
  );
}

export default Play;
