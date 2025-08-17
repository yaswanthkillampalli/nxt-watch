import {useEffect, useState, useContext} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'
import {AiOutlineSearch, AiOutlineClose} from 'react-icons/ai'

import NxtWatchContext from '../../context/NxtWatchContext'
import Header from '../Header'
import Sidebar from '../Sidebar'
import VideoItem from '../VideoItem'
import {
  ContentContainer,
  MainContent,
  LoaderContainer,
  CommonViewContainer,
  CommonImage,
  CommonHeading,
  CommonText,
  RetryButton,
} from '../styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

// --- Styled Components ---
const HomeContainer = styled.div`
  background-color: ${({theme}) => theme.bg};
  min-height: 100vh;
`

const Banner = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  padding: 20px 30px;
  display: flex; /* <--- No longer conditional */
  justify-content: space-between;
`

const BannerContent = styled.div`
  width: 85%;
`

const BannerLogo = styled.img`
  width: 140px;
`

const BannerText = styled.p`
  font-size: 18px;
  color: #1e293b;
`

const BannerButton = styled.button`
  background-color: transparent;
  border: 1px solid #1e293b;
  color: #1e293b;
  padding: 10px 15px;
  font-weight: bold;
`

const BannerCloseButton = styled.button`
  background: none;
  border: none;
  align-self: flex-start;
  font-size: 20px;
  cursor: pointer;
`

const SearchContainer = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px;
`

const SearchInput = styled.input`
  flex-grow: 1;
  padding: 8px 12px;
  border: 1px solid ${({theme}) => theme.divider};
  background-color: transparent;
  color: ${({theme}) => theme.text};
  font-size: 14px;
  outline: none;
`

const SearchButton = styled.button`
  padding: 8px 24px;
  border: 1px solid ${({theme}) => theme.divider};
  background-color: ${({theme}) => theme.btnBg};
  cursor: pointer;
`

const VideosList = styled.ul`
  list-style-type: none;
  padding: 20px;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`

// --- Home Component ---
const Home = () => {
  const {isDarkTheme} = useContext(NxtWatchContext)
  const [videos, setVideos] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [searchInput, setSearchInput] = useState('')
  const [showBanner, setShowBanner] = useState(true)

  const getVideos = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.videos.map(video => ({
        id: video.id,
        title: video.title,
        thumbnailUrl: video.thumbnail_url,
        channel: {
          name: video.channel.name,
          profileImageUrl: video.channel.profile_image_url,
        },
        viewCount: video.view_count,
        publishedAt: video.published_at,
      }))
      setVideos(updatedData)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getVideos()
    // eslint-disable-next-line
  }, [])

  const handleRetry = () => getVideos()
  const handleSearch = () => getVideos()
  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      getVideos()
    }
  }

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
      <RetryButton onClick={handleRetry}>Retry</RetryButton>
    </CommonViewContainer>
  )

  const renderVideosView = () => {
    if (videos.length === 0) {
      return (
        <CommonViewContainer
          theme={{text: isDarkTheme ? '#f9f9f9' : '#1e293b'}}
        >
          <CommonImage
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            alt="no videos"
          />
          <CommonHeading>No Search results found</CommonHeading>
          <CommonText>
            Try different key words or remove search filter
          </CommonText>
          <RetryButton onClick={handleRetry}>Retry</RetryButton>
        </CommonViewContainer>
      )
    }
    return (
      <VideosList>
        {videos.map(video => (
          <VideoItem key={video.id} video={video} />
        ))}
      </VideosList>
    )
  }

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
    ? {
        bg: '#181818',
        text: '#f9f9f9',
        divider: '#475569',
        btnBg: '#383838',
      }
    : {
        bg: '#f9f9f9',
        text: '#1e293b',
        divider: '#d7dfe9',
        btnBg: '#f1f5f9',
      }

  return (
    <HomeContainer data-testid="home" theme={theme}>
      <Header />
      <ContentContainer>
        <Sidebar />
        <MainContent>
          {showBanner && (
            <Banner data-testid="banner" show={showBanner}>
              <BannerContent>
                <BannerLogo
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="nxt watch logo"
                />
                <BannerText>
                  Buy Nxt Watch Premium prepaid plans with UPI
                </BannerText>
                <BannerButton>GET IT NOW</BannerButton>
              </BannerContent>
              <BannerCloseButton
                data-testid="close"
                onClick={() => setShowBanner(false)}
              >
                <AiOutlineClose />
              </BannerCloseButton>
            </Banner>
          )}
          <SearchContainer>
            <SearchInput
              type="search"
              placeholder="Search"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              theme={theme}
            />
            <SearchButton
              data-testid="searchButton"
              type="button"
              onClick={handleSearch}
              theme={theme}
            >
              <AiOutlineSearch color={isDarkTheme ? '#f9f9f9' : '#606060'} />
            </SearchButton>
          </SearchContainer>
          {renderFinalView()}
        </MainContent>
      </ContentContainer>
    </HomeContainer>
  )
}

export default Home
