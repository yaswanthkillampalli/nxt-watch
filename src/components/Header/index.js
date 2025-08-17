import {useContext} from 'react'
import {Link, withRouter} from 'react-router-dom'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {FaMoon} from 'react-icons/fa'
import {FiSun} from 'react-icons/fi'
import NxtWatchContext from '../../context/NxtWatchContext'

// --- Styled Components ---
const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  height: 75px;
  background-color: ${({theme}) => theme.bg};
  transition: background-color 0.3s ease;
`

const LogoLink = styled(Link)`
  text-decoration: none;
`

const LogoImage = styled.img`
  width: 120px;
`

const NavItems = styled.div`
  display: flex;
  align-items: center;
`

const ThemeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({theme}) => theme.text};
  font-size: 24px;
  margin-right: 20px;
`

const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 20px;
`

const LogoutButton = styled.button`
  background: none;
  border: 1px solid ${({theme}) => theme.accent};
  color: ${({theme}) => theme.accent};
  padding: 5px 15px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
`

const PopupContainer = styled.div`
  background-color: ${({theme}) => theme.bg};
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  color: ${({theme}) => theme.text};
`

const PopupButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`

const CancelButton = styled.button`
  background: none;
  border: 1px solid #94a3b8;
  color: #94a3b8;
  padding: 8px 16px;
  margin-right: 20px;
  border-radius: 4px;
  cursor: pointer;
`

const ConfirmButton = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
`

// --- Header Component ---
const Header = props => {
  const {isDarkTheme, toggleTheme} = useContext(NxtWatchContext)

  const onConfirmLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const theme = isDarkTheme
    ? {bg: '#212121', text: '#ffffff', accent: '#ffffff'}
    : {bg: '#ffffff', text: '#000000', accent: '#3b82f6'}

  return (
    <Navbar theme={theme}>
      <LogoLink to="/">
        <LogoImage
          src={
            isDarkTheme
              ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
              : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          }
          alt="website logo"
        />
      </LogoLink>
      <NavItems>
        <ThemeButton data-testid="theme" onClick={toggleTheme} theme={theme}>
          {isDarkTheme ? <FiSun /> : <FaMoon />}
        </ThemeButton>
        <ProfileImage
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
          alt="profile"
        />
        <Popup
          modal
          trigger={<LogoutButton theme={theme}>Logout</LogoutButton>}
        >
          {close => (
            <PopupContainer theme={theme}>
              <p>Are you sure, you want to logout?</p>
              <PopupButtonsContainer>
                <CancelButton onClick={() => close()}>Cancel</CancelButton>
                <ConfirmButton onClick={onConfirmLogout}>Confirm</ConfirmButton>
              </PopupButtonsContainer>
            </PopupContainer>
          )}
        </Popup>
      </NavItems>
    </Navbar>
  )
}

export default withRouter(Header)
