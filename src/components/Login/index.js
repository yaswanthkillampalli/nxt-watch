import {useState, useContext} from 'react'
import {useHistory, Redirect} from 'react-router-dom'
import styled, {ThemeProvider} from 'styled-components'
import Cookies from 'js-cookie'
import NxtWatchContext from '../../context/NxtWatchContext'

// --- Theme Objects ---
const lightTheme = {
  bg: '#f9f9f9',
  formBg: '#ffffff',
  labelColor: '#475569',
  inputColor: '#1e293b',
  inputBorder: '#d7dfe9',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
}

const darkTheme = {
  bg: '#181818',
  formBg: '#0f0f0f',
  labelColor: '#f1f1f1',
  inputColor: '#f1f1f1',
  inputBorder: '#475569',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
}

// --- Styled Components ---
const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${({theme}) => theme.bg};
  transition: background-color 0.3s ease;
  font-family: 'Roboto', sans-serif;
`

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px;
  background-color: ${({theme}) => theme.formBg};
  border-radius: 8px;
  box-shadow: ${({theme}) => theme.boxShadow};
  width: 100%;
  max-width: 400px;
  transition: background-color 0.3s ease;
`

const LogoImage = styled.img`
  width: 180px;
  margin-bottom: 32px;
`

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`

const Label = styled.label`
  font-weight: 500;
  font-size: 12px;
  color: ${({theme}) => theme.labelColor};
  margin-bottom: 8px;
  display: block;
`

const InputField = styled.input`
  width: 100%;
  padding: 10px 16px;
  border: 1px solid ${({theme}) => theme.inputBorder};
  border-radius: 4px;
  font-size: 14px;
  color: ${({theme}) => theme.inputColor};
  background-color: transparent;
  outline: none;

  &:focus {
    border-color: #3b82f6;
  }
`

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  margin-bottom: 24px;
`

const CheckboxLabel = styled.label`
  font-size: 14px;
  margin-left: 8px;
  color: ${({theme}) => theme.labelColor};
`

const LoginButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #3b82f6;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`

const ErrorMessage = styled.p`
  align-self: flex-start;
  font-size: 14px;
  margin-top: 8px;
  color: #ff0000;
`

// --- Login Component ---
const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const history = useHistory()
  const {isDarkTheme} = useContext(NxtWatchContext)

  // If a user is already logged in, redirect them to the home page
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  const onLoginSuccess = receivedToken => {
    Cookies.set('jwt_token', receivedToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  const onLoginFailure = message => {
    setErrorMsg(message)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok) {
      onLoginSuccess(data.jwt_token)
    } else {
      onLoginFailure(data.error_msg)
    }
  }

  const currentTheme = isDarkTheme ? darkTheme : lightTheme
  const logoUrl = isDarkTheme
    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

  return (
    <ThemeProvider theme={currentTheme}>
      <LoginPageContainer>
        <LoginForm onSubmit={handleSubmit}>
          <LogoImage src={logoUrl} alt="website logo" />
          <InputContainer>
            <Label htmlFor="username">USERNAME</Label>
            <InputField
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="password">PASSWORD</Label>
            <InputField
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </InputContainer>
          <CheckboxContainer>
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(prev => !prev)}
            />
            <CheckboxLabel htmlFor="showPassword">Show Password</CheckboxLabel>
          </CheckboxContainer>
          <LoginButton type="submit">Login</LoginButton>
          {errorMsg && <ErrorMessage>*{errorMsg}</ErrorMessage>}
        </LoginForm>
      </LoginPageContainer>
    </ThemeProvider>
  )
}

export default Login
