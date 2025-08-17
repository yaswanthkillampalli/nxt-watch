import {useEffect, useState, useContext} from 'react'
import {useParams} from 'react-router-dom'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player/youtube'
import styled from 'styled-components'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {MdPlaylistAdd, MdPlaylistAddCheck} from 'react-icons/md'

import NxtWatchContext from '../../context/NxtWatchContext'
import Header from '../Header'
import Sidebar from '../Sidebar'
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
const VideoDetailContainer = styled.div`
  background-color: ${({theme}) => theme.bg};
  min-height: 100vh;
`

const PlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
`

const StyledReactPlayer = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
`

const VideoInfoContainer = styled.div`
  padding: 20px;
  color: ${({theme}) => theme.text};
  font-family: 'Roboto';
`

const VideoTitle = styled.p`
  font-size: 18px;
  font-weight: 500;
`

const StatsAndActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`

const VideoStats = styled.p`
  color: #64748b;
`

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
`

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 15px;
  font-size: 16px;
  font-weight: 500;
  color: ${({isActive}) => (isActive ? '#2563eb' : '#64748b')};

  & > svg {
    margin-right: 5px;
    font-size: 20px;
  }
`

const HorizontalRule = styled.hr`
  border: 1px solid ${({theme}) => theme.divider};
  margin: 20px 0;
`

const ChannelContainer = styled.div`
  display: flex;
  align-items: flex-start;
`

const ChannelLogo = styled.img`
  width: 50px;
  border-radius: 50%;
  margin-right: 15px;
`

const ChannelInfo = styled.div``

const ChannelName = styled.p`
  font-weight: 500;
  margin: 0;
`

const SubscriberCount = styled.p`
  color: #64748b;
  margin-top: 5px;
`

const VideoDescription = styled.p`
  margin-top: 20px;
  line-height: 1.6;
`

// --- Main Component ---
const VideoDetailView = () => {
  const {id} = useParams()
  const {isDarkTheme, savedVideos, addOrRemoveVideo} =
    useContext(NxtWatchContext)

  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [videoDetails, setVideoDetails] = useState(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)

  const getVideoDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {headers: {Authorization: `Bearer ${jwtToken}`}}
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const formattedData = {
        id: data.video_details.id,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        thumbnailUrl: data.video_details.thumbnail_url,
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.channel.subscriber_count,
        },
        viewCount: data.video_details.view_count,
        publishedAt: data.video_details.published_at,
        description: data.video_details.description,
      }
      setVideoDetails(formattedData)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getVideoDetails()
    // eslint-disable-next-line
  }, [id])

  const toggleLike = () => {
    setIsLiked(!isLiked)
    if (isDisliked) setIsDisliked(false)
  }

  const toggleDislike = () => {
    setIsDisliked(!isDisliked)
    if (isLiked) setIsLiked(false)
  }

  const isVideoSaved = savedVideos.some(video => video.id === id)

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
      <RetryButton onClick={getVideoDetails}>Retry</RetryButton>
    </CommonViewContainer>
  )

  const renderSuccessView = () => {
    const {videoUrl, title, viewCount, publishedAt, channel, description} =
      videoDetails
    const theme = {
      text: isDarkTheme ? '#f9f9f9' : '#1e293b',
      divider: isDarkTheme ? '#475569' : '#d7dfe9',
    }
    return (
      <>
        <PlayerWrapper>
          <StyledReactPlayer
            url={videoUrl}
            controls
            width="100%"
            height="100%"
          />
        </PlayerWrapper>
        <VideoInfoContainer theme={theme}>
          <VideoTitle>{title}</VideoTitle>
          <StatsAndActionsContainer>
            <VideoStats>
              {viewCount} views • {formatDistanceToNow(new Date(publishedAt))}{' '}
              ago
            </VideoStats>
            <ActionsContainer>
              <ActionButton onClick={toggleLike} isActive={isLiked}>
                <AiOutlineLike /> Like
              </ActionButton>
              <ActionButton onClick={toggleDislike} isActive={isDisliked}>
                <AiOutlineDislike /> Dislike
              </ActionButton>
              <ActionButton
                onClick={() => addOrRemoveVideo(videoDetails)}
                isActive={isVideoSaved}
              >
                {isVideoSaved ? <MdPlaylistAddCheck /> : <MdPlaylistAdd />}{' '}
                {isVideoSaved ? 'Saved' : 'Save'}
              </ActionButton>
            </ActionsContainer>
          </StatsAndActionsContainer>
          <HorizontalRule theme={theme} />
          <ChannelContainer>
            <ChannelLogo src={channel.profileImageUrl} alt="channel logo" />
            <ChannelInfo>
              <ChannelName>{channel.name}</ChannelName>
              <SubscriberCount>
                {channel.subscriberCount} subscribers
              </SubscriberCount>
            </ChannelInfo>
          </ChannelContainer>
          <VideoDescription>{description}</VideoDescription>
        </VideoInfoContainer>
      </>
    )
  }

  const renderFinalView = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  const theme = isDarkTheme ? {bg: '#0f0f0f'} : {bg: '#f9f9f9'}

  return (
    <VideoDetailContainer data-testid="videoItemDetails" theme={theme}>
      <Header />
      <ContentContainer>
        <Sidebar />
        <MainContent>{renderFinalView()}</MainContent>
      </ContentContainer>
    </VideoDetailContainer>
  )
}

export default VideoDetailView
