import { useState } from 'react'
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  HelpMenu,
  close,
} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { setMode, setLogout } from 'states'
import { useNavigate } from 'react-router'
import FlexBetween from 'components/FlexBetween'
import { ImageContainer } from './navBar.style'

const NavBarPage = () => {
  const [isModbileMenuToggle, SetIsModbileMenuToggle] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const isNonMobileScreen = useMediaQuery('(min-width: 1000px)')

  const theme = useTheme()
  const neutralLight = theme.palette.neutral.light
  const dark = theme.palette.background.default
  const primaryLight = theme.palette.primary.light
  const alt = theme.palette.background.alt

  // const fullName = `${user.firstName ? user.firstName : ''} ${
  //   user.lastName ? user.lastName : ''
  // }`

  return (
    <FlexBetween padding="1rem" backgroundColor={alt}>
      <ImageContainer>
        <img src="/assets/logo.png" alt="logo"></img>
      </ImageContainer>
    </FlexBetween>
  )
}

export default NavBarPage
