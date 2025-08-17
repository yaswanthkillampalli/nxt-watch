import {useContext} from 'react'
import styled from 'styled-components'
import NxtWatchContext from '../../context/NxtWatchContext'
import Header from '../Header'
import Sidebar from '../Sidebar'
import {
  ContentContainer,
  MainContent,
  CommonViewContainer,
  CommonImage,
  CommonHeading,
  CommonText,
} from '../styledComponents'

// --- Styled Components ---
const NotFoundContainer = styled.div`
  background-color: ${({theme}) => theme.bg};
  min-height: 100vh;
`

// --- Component ---
const NotFound = () => {
  const {isDarkTheme} = useContext(NxtWatchContext)

  const theme = isDarkTheme
    ? {bg: '#0f0f0f', text: '#f9f9f9'}
    : {bg: '#f9f9f9', text: '#1e293b'}

  const imageUrl = isDarkTheme
    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

  return (
    <NotFoundContainer theme={theme}>
      <Header />
      <ContentContainer>
        <Sidebar />
        <MainContent>
          <CommonViewContainer theme={theme}>
            <CommonImage src={imageUrl} alt="not found" />
            <CommonHeading>Page Not Found</CommonHeading>
            <CommonText>
              We are sorry, the page you requested could not be found.
            </CommonText>
          </CommonViewContainer>
        </MainContent>
      </ContentContainer>
    </NotFoundContainer>
  )
}

export default NotFound
