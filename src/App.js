import {Route, Switch, Redirect} from 'react-router-dom'
import {NxtWatchProvider} from './context/NxtWatchContext'

import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoDetailView from './components/VideoDetailView'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <NxtWatchProvider>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/trending" component={Trending} />
        <ProtectedRoute exact path="/gaming" component={Gaming} />
        <ProtectedRoute exact path="/videos/:id" component={VideoDetailView} />
        <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </NxtWatchProvider>
  )
}

export default App
