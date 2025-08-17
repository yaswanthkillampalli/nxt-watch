import {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'
import NxtWatchContext from '../../context/NxtWatchContext'

// --- Styled Components ---
const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 250px;
  flex-shrink: 0;
  background-color: ${({theme}) => theme.bg};
  height: calc(100vh - 75px);
  transition: background-color 0.3s ease;
  font-family:'Roboto';
`

const NavLinksList = styled.ul`
  list-style-type: none;
  padding: 0;
`

const NavLinkItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  color: ${({theme}) => theme.text};
  gap:10px;
  &.active {
    background-color: ${({theme}) => theme.activeBg};
    font-weight: bold;
  }
  
  &.active svg {
    color: #ff0000;
  }
`

const CustomNavLink = styled(NavLink)`
  text-decoration: none;
  display: flex;
  align-items: center;
  width: 100%;
  color: inherit;
  
  & > svg {
    margin-right: 15px;
    font-size: 20px;
  }
`

const ContactInfo = styled.div`
  padding: 20px;
  color: ${({theme}) => theme.text};
`

const SocialLogos = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
`

const SocialLogo = styled.img`
  width: 30px;
  margin-right: 10px;
`
const ParaEl = styled.p`
  font-size:12px;
`
// --- Sidebar Component ---
const Sidebar = () => {
  const {isDarkTheme} = useContext(NxtWatchContext)

  const theme = isDarkTheme
    ? {bg: '#212121', text: '#f9f9f9', activeBg: '#383838'}
    : {bg: '#ffffff', text: '#1e293b', activeBg: '#e2e8f0'}

  return (
    <SidebarContainer theme={theme}>
      <NavLinksList>
        <CustomNavLink to="/" exact activeClassName="active">
          <NavLinkItem theme={theme}>
            <AiFillHome /> Home
          </NavLinkItem>
        </CustomNavLink>
        <CustomNavLink to="/trending" activeClassName="active">
          <NavLinkItem theme={theme}>
            <HiFire /> Trending
          </NavLinkItem>
        </CustomNavLink>
        <CustomNavLink to="/gaming" activeClassName="active">
          <NavLinkItem theme={theme}>
            <SiYoutubegaming /> Gaming
          </NavLinkItem>
        </CustomNavLink>
        <CustomNavLink to="/saved-videos" activeClassName="active">
          <NavLinkItem theme={theme}>
            <MdPlaylistAdd /> Saved Videos
          </NavLinkItem>
        </CustomNavLink>
      </NavLinksList>
      <ContactInfo theme={theme}>
        <p>CONTACT US</p>
        <SocialLogos>
          <SocialLogo
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
          />
          <SocialLogo
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
          />
          <SocialLogo
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
          />
        </SocialLogos>
        <ParaEl>Enjoy! Now to see your channels and recommendations!</ParaEl>
      </ContactInfo>
    </SidebarContainer>
  )
}

export default Sidebar
