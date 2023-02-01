import styled, { ThemeProvider } from "styled-components"
import Menu from './components/Menu'
import Navbar from "./components/Navbar"
import { darkTheme, lightTheme } from "./utils/Theme"
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home, { EHomeType } from "./pages/HomePage";
import Video from "./pages/VideoPage";
import SignIn from "./pages/SignIn";
import { useSelector } from "react-redux"
import { getCurrentUser } from "./redux/slices/userSlice";
import { modalStatus } from "./redux/slices/modalSlice";
import Modal from "./components/Modal";
import SearchPage from "./pages/SearchPage";


const Container = styled.div`
display: flex;
position: relative;
`
const Main = styled.div`
flex: 7;
background-color: ${({ theme }) => theme.bg};
color: ${({ theme }) => theme.text};
overflow-y: scroll;
height: 100vh;
`
const Content = styled.div`

`

const ModalContainer = styled.div`
background-color: rgba(0,0,0,0.8);
display: flex;
justify-content: center;
align-items: center;
position: absolute;
height: 100%;
width: 100%;
`

export enum EMode {
  dark = "dark",
  light = "light"
}


type Props = {}

const App = (props: Props) => {
  // pre
  const user = useSelector(getCurrentUser);
  const isModalOpen = useSelector(modalStatus)

  // declaration
  const [mode, setMode] = useState<EMode>(EMode.dark)

  // side-effects
  useEffect(() => {
    console.log(isModalOpen);
  }, [isModalOpen])

  // actual rendering
  return (
    <ThemeProvider theme={mode == EMode.dark ? darkTheme : lightTheme}>
      <Container>
        <Router>
          <Menu mode={mode} setMode={setMode} />
          <Main>
            <Navbar />
            {/* Routes */}
            <Routes>
              <Route path="/">
                {/* base route */}
                <Route index element={<Home type={EHomeType.random} />} />
                {/* home page */}
                <Route path="/trend" element={<Home type={EHomeType.trend} />} />
                <Route
                  path="/subs"
                  element={
                    user.details ? (<Home type={EHomeType.subscribed} />) : (<Navigate to={"/"} />)
                  } />
                <Route path="/search" element={<SearchPage />} />
                {/* auth page */}
                <Route path="signin" element={<SignIn />} />
                {/* videos page */}
                <Route path="video">
                  <Route index element={<Navigate to="/" />} />
                  <Route path=":id" element={<Video />} />
                </Route>
              </Route>
            </Routes>
          </Main>
          {
            isModalOpen && <ModalContainer>
              <Modal />
            </ModalContainer>
          }
        </Router>
      </Container>
    </ThemeProvider>
  )
}

export default App