import styled from "styled-components";
import { Link } from 'react-router-dom'

export const Nav = styled.div`
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: black;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`

export const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  @media (max-width: 1125px) {
    overflow: hidden;
    flex-direction: column;
    max-height: ${({ isOpen }) => (isOpen ? '300px' : '0')};
    transition: max-height 0.3s ease-in;
    width: 100%;
  }
`

export const MenuLink = styled.div`
  flex: 1;
  padding: 0.1rem 1rem;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: #46bcb9;
  transition: all 0.3s ease-in;
  font-size: 1.2rem;
  &:hover {
    color: #ff00ff;
  }
`

export const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  span {
    height: 2px;
    width: 25px;
    background: #7b7fda;
    margin-bottom: 4px;
    border-radius: 5px;
  }
  @media (max-width: 1125px) {
    display: flex;
  }
`

export const NavbarAddress = styled.div`
  margin: ${({ margin }) => (margin ? `${margin}px` : 'none')}
  display: flex;
  margin-right: 20px;

  @media (max-width: 750px) {
    display: none;
  }
`

export const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;

  :hover {
    color: #fff;
    text-decoration: none;
  }
`