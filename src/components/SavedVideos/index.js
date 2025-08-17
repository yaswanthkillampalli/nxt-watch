import {useContext} from 'react'
import styled from 'styled-components'
import {HiFire} from 'react-icons/hi'

import NxtWatchContext from '../../context/NxtWatchContext'
import Header from '../Header'
import Sidebar from '../Sidebar'
import TrendingVideoItem from '../TrendingVideoItem'
import {
  ContentContainer,
  MainContent,
  TitleHeader,
  IconContainer,
} from '../styledComponents'

// --- Styled Components ---
const SavedVideosContainer = styled.div`
  background-color: ${({theme}) => theme.bg};
  min-height: 100vh;
`

const VideosList = styled.ul`
  list-style-type: none;
  padding: 30px;
`

const NoSavedVideosView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 50px;
  padding: 20px;
  color: ${({theme}) => theme.text};
`

const NoSavedVideosImage = styled.img`
  width: 100%;
  max-width: 400px;
`

// --- SavedVideos Component ---
const SavedVideos = () => {
  const {isDarkTheme, savedVideos} = useContext(NxtWatchContext)

  const renderVideosView = () => {
    if (savedVideos.length === 0) {
      const theme = {text: isDarkTheme ? '#f9f9f9' : '#1e293b'}
      return (
        <NoSavedVideosView theme={theme}>
          <NoSavedVideosImage
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
            alt="no saved videos"
          />
          <h1>No saved videos found</h1>
          <p>You can save your videos while watching them</p>
        </NoSavedVideosView>
      )
    }

    return (
      <VideosList>
        {savedVideos.map(video => (
          <TrendingVideoItem key={video.id} video={video} />
        ))}
      </VideosList>
    )
  }

  const theme = isDarkTheme
    ? {
        bg: '#0f0f0f',
        headerBg: '#212121',
        iconBg: '#000000',
        text: '#f9f9f9',
      }
    : {
        bg: '#f9f9f9',
        headerBg: '#f1f1f1',
        iconBg: '#e2e8f0',
        text: '#1e293b',
      }

  return (
    <SavedVideosContainer data-testid="savedVideos" theme={theme}>
      <Header />
      <ContentContainer>
        <Sidebar />
        <MainContent>
          <TitleHeader theme={theme}>
            <IconContainer theme={theme}>
              <HiFire size={30} color="#ff0000" />
            </IconContainer>
            <h1>Saved Videos</h1>
          </TitleHeader>
          {renderVideosView()}
        </MainContent>
      </ContentContainer>
    </SavedVideosContainer>
  )
}

export default SavedVideos
