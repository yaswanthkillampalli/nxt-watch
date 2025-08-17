import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {useContext} from 'react'
import NxtWatchContext from '../../context/NxtWatchContext'

// --- Styled Components ---
const GameCardLink = styled(Link)`
  text-decoration: none;
  width: 48%;
  margin-bottom: 30px;
  @media (min-width: 576px) {
    width: 30%;
  }
`

const Thumbnail = styled.img`
  width: 100%;
`

const InfoContainer = styled.div`
  padding: 10px 0;
  color: ${({theme}) => theme.text};
`

const Title = styled.p`
  margin: 0 0 5px 0;
  font-weight: 500;
`

const Views = styled.p`
  margin: 0;
  color: #64748b;
`

// --- Component ---
const GameVideoItem = ({video}) => {
  const {isDarkTheme} = useContext(NxtWatchContext)
  const {id, title, thumbnailUrl, viewCount} = video

  const theme = isDarkTheme ? {text: '#f9f9f9'} : {text: '#1e2b3b'}

  return (
    <GameCardLink to={`/videos/${id}`}>
      <Thumbnail src={thumbnailUrl} alt="video thumbnail" />
      <InfoContainer theme={theme}>
        <Title>{title}</Title>
        <Views>{viewCount} Watching Worldwide</Views>
      </InfoContainer>
    </GameCardLink>
  )
}

export default GameVideoItem
