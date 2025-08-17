import {useEffect, useState, useContext} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'
import {SiYoutubegaming} from 'react-icons/si'

import NxtWatchContext from '../../context/NxtWatchContext'
import Header from '../Header'
import Sidebar from '../Sidebar'
import GameVideoItem from '../GameVideoItem'
import {
  ContentContainer,
  MainContent,
  LoaderContainer,
  CommonViewContainer,
  CommonImage,
  CommonHeading,
  CommonText,
  RetryButton,
  TitleHeader,
  IconContainer,
} from '../styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

// --- Styled Components ---
const GamingContainer = styled.div`
  background-color: ${({theme}) => theme.bg};
  min-height: 100vh;
`

const VideosList = styled.ul`
  list-style-type: none;
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

// --- Gaming Component ---
const Gaming = () => {
  const {isDarkTheme} = useContext(NxtWatchContext)
  const [videos, setVideos] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const getGamingVideos = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/gaming`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      // NOTE: Gaming API response doesn't have a 'channel' object
      const updatedData = data.videos.map(video => ({
        id: video.id,
        title: video.title,
        thumbnailUrl: video.thumbnail_url,
        viewCount: video.view_count,
      }))
      setVideos(updatedData)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getGamingVideos()
  }, [])

  const renderLoadingView = () => (
    <LoaderContainer data-testid="loader">
      <Loader
        type="ThreeDots"
        color={isDarkTheme ? '#ffffff' : '#000000'}
        height="50"
        width="50"
      />
    </LoaderContainer>
  )

  const renderFailureView = () => (
    <CommonViewContainer theme={{text: isDarkTheme ? '#f9f9f9' : '#1e293b'}}>
      <CommonImage
        src={
          isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        }
        alt="failure view"
      />
      <CommonHeading>Oops! Something Went Wrong</CommonHeading>
      <CommonText>
        We are having some trouble to complete your request. Please try again.
      </CommonText>
      <RetryButton onClick={getGamingVideos}>Retry</RetryButton>
    </CommonViewContainer>
  )

  const renderVideosView = () => (
    <VideosList>
      {videos.map(video => (
        <GameVideoItem key={video.id} video={video} />
      ))}
    </VideosList>
  )

  const renderFinalView = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderVideosView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  const theme = isDarkTheme
    ? {bg: '#0f0f0f', headerBg: '#212121', iconBg: '#000000', text: '#f9f9f9'}
    : {bg: '#f9f9f9', headerBg: '#f1f1f1', iconBg: '#e2e8f0', text: '#1e293b'}

  return (
    <GamingContainer data-testid="gaming" theme={theme}>
      <Header />
      <ContentContainer>
        <Sidebar />
        <MainContent>
          <TitleHeader theme={theme}>
            <IconContainer theme={theme}>
              <SiYoutubegaming size={30} color="#ff0000" />
            </IconContainer>
            <h1>Gaming</h1>
          </TitleHeader>
          {renderFinalView()}
        </MainContent>
      </ContentContainer>
    </GamingContainer>
  )
}

export default Gaming
