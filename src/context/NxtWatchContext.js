import {useState, createContext} from 'react'

const NxtWatchContext = createContext({
  isDarkTheme: false,
  toggleTheme: () => {},
  savedVideos: [],
  addOrRemoveVideo: () => {},
})

export const NxtWatchProvider = ({children}) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [savedVideos, setSavedVideos] = useState([])

  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme)
  }

  const addOrRemoveVideo = videoDetails => {
    const isAlreadySaved = savedVideos.some(
      video => video.id === videoDetails.id,
    )

    if (isAlreadySaved) {
      setSavedVideos(prevVideos =>
        prevVideos.filter(video => video.id !== videoDetails.id),
      )
    } else {
      setSavedVideos(prevVideos => [...prevVideos, videoDetails])
    }
  }

  return (
    <NxtWatchContext.Provider
      value={{
        isDarkTheme,
        toggleTheme,
        savedVideos,
        addOrRemoveVideo,
      }}
    >
      {children}
    </NxtWatchContext.Provider>
  )
}

export default NxtWatchContext
