import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import HomePage from 'scence/homePage'
import ProfilePage from 'scence/profilePage'
import LoginPage from 'scence/loginPage'
import { useMemo, userMemo } from 'react'
import { useSelector } from 'react-redux'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { themeSettings } from 'theme'
import NavBarPage from 'scence/navBar'

function App() {
  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <div className="App">
      <BrowserRouter>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<NavBarPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile/:userid" element={<ProfilePage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
