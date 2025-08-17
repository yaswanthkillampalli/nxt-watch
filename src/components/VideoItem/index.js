import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {formatDistanceToNow} from 'date-fns'
import {useContext} from 'react'
import NxtWatchContext from '../../context/NxtWatchContext'

// --- Styled Components ---
const VideoCard = styled.li`
  list-style-type: none;
  width: 100%;
  margin-bottom: 20px;
  @media (min-width: 576px) {
    width: 48%;
  }
  @media (min-width: 768px) {
    width: 31%;
  }
`

const Thumbnail = styled.img`
  width: 100%;
`

const VideoDetails = styled.div`
  display: flex;
  padding: 10px 0;
`

const ChannelLogo = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`

const TextContainer = styled.div`
  color: ${({theme}) => theme.text};
`

const Title = styled.p`
  margin: 0;
  font-weight: 500;
  line-height: 1.5;
`

const ChannelName = styled.p`
  margin: 5px 0;
  color: #64748b;
`

const ViewsAndDate = styled.p`
  margin: 0;
  color: #64748b;
`

// --- VideoItem Component ---
const VideoItem = ({video}) => {
  const {isDarkTheme} = useContext(NxtWatchContext)
  const {id, title, thumbnailUrl, channel, viewCount, publishedAt} = video

  const publishedDate = formatDistanceToNow(new Date(publishedAt))

  const theme = isDarkTheme ? {text: '#f9f9f9'} : {text: '#1e293b'}

  return (
    <VideoCard>
      <Link to={`/videos/${id}`} style={{textDecoration: 'none'}}>
        <Thumbnail src={thumbnailUrl} alt="video thumbnail" />
        <VideoDetails>
          <ChannelLogo src={channel.profileImageUrl} alt="channel logo" />
          <TextContainer theme={theme}>
            <Title>{title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <ViewsAndDate>
              {viewCount} views • {publishedDate} ago
            </ViewsAndDate>
          </TextContainer>
        </VideoDetails>
      </Link>
    </VideoCard>
  )
}

export default VideoItem
