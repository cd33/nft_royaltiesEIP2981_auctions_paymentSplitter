import styled from 'styled-components'
import { Link } from 'react-router-dom'

// Used for wrapping a page component
export const Screen = styled.div`
  background-color: var(--dark-grey);
  background-image: ${({ image }) => (image ? `url(${image})` : 'none')};
  background-size: cover;
  background-position: center;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

// Used for providing space between components
export const SpacerSmall = styled.div`
  height: 16px;
  width: 16px;
`

// Used for providing space between components
export const SpacerMedium = styled.div`
  height: 24px;
  width: 24px;
`

// Used for providing space between components
export const SpacerLarge = styled.div`
  height: 32px;
  width: 32px;
`

// Used for providing a wrapper around a component
export const Container = styled.div`
  display: flex;
  flex: ${({ flex }) => (flex ? flex : 0)};
  flex-direction: ${({ fd }) => (fd ? fd : 'column')};
  justify-content: ${({ jc }) => (jc ? jc : 'flex-start')};
  align-items: ${({ ai }) => (ai ? ai : 'flex-start')};
  background-color: ${({ bc }) => (bc ? bc : 'none')};
  width: 100%;
  background-image: ${({ image }) => (image ? `url(${image})` : 'none')};
  background-size: cover;
  background-position: center;
`

export const ContainerCardAuction = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: ${({ jc }) => (jc ? jc : 'flex-start')};
  align-items: center;
  background-color: ${({ bc }) => (bc ? bc : 'none')};
  width: auto;
  background-size: cover;
  background-position: center;
  padding: 20px 20px;
  box-shadow: 5px 5px 5px 5px black;
  border: 2px solid;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`

export const TextTitle = styled.p`
  color: ${({ color }) => (color ? color : 'white')};
  font-size: ${({ fs }) => (fs ? `${fs}px` : '40px')};
  font-weight: 700;
  text-shadow: 1px 1px 2px black;
`

export const TextSubTitle = styled.p`
  color: ${({ color }) => (color ? color : 'white')};
  font-size: ${({ fs }) => (fs ? `${fs}px` : '30px')};
  font-weight: 700;
  text-shadow: 1px 1px 2px black;
  text-align: center;
`

export const TextDescription = styled.p`
  color: var(--white);
  font-size: ${({ fs }) => (fs ? `${fs}px` : '14px')};
  font-weight: 600;
  margin-bottom: 0px;
  text-align: center;
`

export const TextButtonStyle = styled.div`
  color: var(--white);
  font-size: ${({ fs }) => (fs ? fs : '20px')};
  font-weight: 600;
  background-color: ${({ bc }) => (bc ? bc : 'red')};
  width: ${({ width }) => (width ? width : '100px')};
  border-radius: ${({ br }) => (br ? br : '20px')};
  text-align: center;
`

export const Navbar = styled.div`
  min-height: 3em;
  width: 100%;
  background-color: black;
  color: white;
`;

export const NavbarText = styled.div`
  position: relative;
  float: ${({ float }) => float ? float : "left"};
  margin: ${({ margin }) => margin ? `${margin}px` : "none"}
`;

export const ModalBackground = styled.div`
  z-index: auto;
  display: ${({ show }) => (show ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`

export const ModalContainer = styled.div`
  background: antiquewhite;
  width: 30%;
  height: auto;
  min-height: 30%;
  border-radius: 10px;
  padding: 0.75rem;
  color: rgba(0, 0, 139, 0.7);
  text-align: center;
  text-align-vertical: center;
`

export const up = styled.div`
  border: 2px solid black;
  transform: rotate(-45deg);
  position: relative;
  top: 14px;
  right: 6px;
  width: 40px;
  background-color: black;
  border-radius: 25px;
`

export const down = styled.div`
  border: 2px solid black;
  transform: rotate(45deg);
  position: relative;
  top: 10px;
  right: 6px;
  width: 40px;
  background-color: black;
  border-radius: 25px;
`

export const Select = styled.select`
  height: 50px;
  font-size: 1.1em;
  font-weight: 700;
  border-radius: 3px;
  border: 2px solid black;
  color: ${({ color }) => (color ? color : 'black')};
  background-color: ${({ bc }) => (bc ? bc : 'white')};
`

export const ButtonLink = styled(Link)`
  color: #fff;
  text-decoration: none;

  :hover {
    color: #fff;
    text-decoration: none;
  }
`

export const Button = styled.button`
  background: ${(props) => (props.primary ? 'black' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'black')};
  font-size: 1em;
  margin-top: 1em;
  padding: 0.25em 1em;
  border: 2px solid white;
  border-radius: 3px;

  :hover {
    background-color: ${({ bchover }) => (bchover ? bchover : '#46bcb9')};
    color: ${({ colorhover }) => (colorhover ? colorhover : 'auto')};
  }
`

export const ButtonHome = styled.div`
  background-color: #46bcb9;
  width: 300px;
  height: 60px;
  margin-top: 25px;
  border-radius: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 1px 1px 2px black;
  border: 2px solid black;

  :hover {
    background-color: #ff00ff;
    border: 2px solid var(--white);
  }
`

export const ButtonTop = styled.button`
  background: ${(props) => (props.primary ? 'black' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'black')};
  font-size: 1.2em;
  font-weight: 700;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid white;
  border-radius: 3px;
  min-height: 50px;
  border-radius: 3px;
  :hover {
    background-color: ${({ bc }) => (bc ? bc : 'white')};
    color: ${({col}) => (col ? col : 'black')};
    border: 2px solid black;
  }
`

export const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: ${props => props.inputColor || "palevioletred"};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;
