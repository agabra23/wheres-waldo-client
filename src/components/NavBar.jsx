import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoMenu } from "react-icons/io5";

const NavDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #333;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  color: white;
`;

const NavBarList = styled.ul`
  display: ${(props) => (props.mobile ? "none" : "flex")};
  justify-content: flex-end;
  gap: 32px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    justify-content: space-between;
    top: 65px;
    left: 0;
    width: 100%;
    padding: 10px;
    display: ${(props) => (props.open ? "flex" : "none")};
    z-index: 1;
  }
`;

const MobileList = styled(NavBarList)`
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: #333;
  @media (min-width: 768px) {
    display: none;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 400;
`;

const NavItem = styled(Link)`
  text-decoration: none;
  list-style-type: none;
  color: white;
  font-size: 20px;
  align-items: center;
  margin: 0;

  &:hover {
    color: #ccc;
  }

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const MobileMenuButton = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    cursor: pointer;
  }
`;

function NavBar() {
  const [open, setOpen] = React.useState(false);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
    console.log();
  };
  return (
    <>
      <NavDiv>
        <Title>Where's The Superhero?</Title>
        <MobileMenuButton onClick={toggleMenu}>
          <IoMenu style={{ width: 24, height: 24 }} />
        </MobileMenuButton>
        <NavBarList>
          <NavItem to={"/"}>Home</NavItem>
          <NavItem to={"/play"}>Play</NavItem>
          <NavItem to={"/leaderboard"}>Leaderboard</NavItem>
        </NavBarList>
      </NavDiv>
      <MobileList open={open}>
        <NavItem onClick={toggleMenu} to={"/"}>
          Home
        </NavItem>
        <NavItem onClick={toggleMenu} to={"/play"}>
          Play
        </NavItem>
        <NavItem onClick={toggleMenu} to={"/leaderboard"}>
          Leaderboard
        </NavItem>
      </MobileList>
    </>
  );
}

export default NavBar;
