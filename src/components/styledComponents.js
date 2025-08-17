import styled from 'styled-components'

export const ContentContainer = styled.div`
  display: flex;
`

export const MainContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  height: calc(100vh - 75px);
  font-family:'Roboto';
`

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`

export const CommonViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 50px;
  padding: 20px;
  color: ${({theme}) => theme.text};
`

export const CommonImage = styled.img`
  width: 100%;
  max-width: 350px;
`

export const CommonHeading = styled.h1`
  font-size: 24px;
  margin-top: 20px;
`

export const CommonText = styled.p`
  font-size: 16px;
  color: #64748b;
`

export const RetryButton = styled.button`
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 10px 25px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
  font-weight: bold;
`

export const TitleHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 30px;
  background-color: ${({theme}) => theme.headerBg};
  color: ${({theme}) => theme.text};
`

export const IconContainer = styled.div`
  background-color: ${({theme}) => theme.iconBg};
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`
