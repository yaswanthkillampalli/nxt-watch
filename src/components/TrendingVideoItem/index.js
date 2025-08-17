import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {formatDistanceToNow} from 'date-fns'
import {useContext} from 'react'
import NxtWatchContext from '../../context/NxtWatchContext'

// --- Styled Components ---
const VideoCardLink = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  @media (min-width: 576px) {
    flex-direction: row;
  }
`

const Thumbnail = styled.img`
  width: 100%;
  @media (min-width: 576px) {
    width: 50%;
    max-width: 300px;
  }
`

const VideoDetails = styled.div`
  padding: 10px;
  color: ${({theme}) => theme.text};
`

const Title = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  @media (min-width: 768px) {
    font-size: 20px;
  }
`

const ChannelName = styled.p`
  margin: 8px 0;
  color: #64748b;
`

const ViewsAndDate = styled.p`
  margin: 0;
  color: #64748b;
`

// --- Component ---
const TrendingVideoItem = ({video}) => {
  const {isDarkTheme} = useContext(NxtWatchContext)
  const {id, title, thumbnailUrl, channel, viewCount, publishedAt} = video

  const publishedDate = formatDistanceToNow(new Date(publishedAt))

  const theme = isDarkTheme ? {text: '#f9f9f9'} : {text: '#1e293b'}

  return (
    <li>
      <VideoCardLink to={`/videos/${id}`}>
        <Thumbnail src={thumbnailUrl} alt="video thumbnail" />
        <VideoDetails theme={theme}>
          <Title>{title}</Title>
          <ChannelName>{channel.name}</ChannelName>
          <ViewsAndDate>
            {viewCount} views • {publishedDate} ago
          </ViewsAndDate>
        </VideoDetails>
      </VideoCardLink>
    </li>
  )
}

export default TrendingVideoItem
