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
  FormControl,
} from '@mui/material'
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  HelpMenu,
  close,
  Help,
  Menu,
  Close,
} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { setMode, setLogout } from 'states'
import { useNavigate } from 'react-router'
import FlexBetween from 'components/FlexBetween'
import { ImageContainer } from './navBar.style'
import { color, padding } from '@mui/system'

const NavBarPage = () => {
  const [isModbileMenuToggle, SetIsModbileMenuToggle] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const isNonMobileScreen = useMediaQuery('(min-width: 1000px)')

  const theme = useTheme()
  const neutralLight = theme.palette.neutral.light
  const dark = theme.palette.background.dark
  const background = theme.palette.background.default
  const primaryLight = theme.palette.primary.light
  const alt = theme.palette.background.alt

  const fullName = `${
    user && user.firstName && user.lastName
      ? user.lastName + ' ' + user.firstname
      : 'Hi There !'
  }`

  console.log(fullName)
  return (
    <FlexBetween padding="1rem" backgroundColor={alt}>
      <Typography
        fontWeight={'bold'}
        fontSize="clamp(1rem,2rem,2.25rem)"
        color="#83A523"
        onClick={() => navigate('/home')}
      >
        Avocado Connect
      </Typography>
      {isNonMobileScreen && (
        <FlexBetween
          backgroundColor={neutralLight}
          borderRadius="9px"
          gap="3rem"
          padding="0.1rem 1.5rem"
        >
          <InputBase placeholder="Search..." />
          <IconButton>
            <Search />
          </IconButton>
        </FlexBetween>
      )}
      {isNonMobileScreen ? (
        <FlexBetween>
          <IconButton
            onClick={() => {
              dispatch(setMode())
            }}
          >
            {theme.palette.mode === 'dark' ? (
              <DarkMode sx={{ fontSize: '25px' }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: '25px' }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: '25px' }} />
          <Notifications sx={{ fontSize: '25px' }} />
          <Help sx={{ fontSize: '25px' }} />

          <FormControl variant="standard" value={fullName}>
            <select
              value={fullName}
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              autoWidth
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem value="logout" onClick={() => dispatch(setLogout())}>
                Log out{' '}
              </MenuItem>
            </select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => {
            SetIsModbileMenuToggle(!isModbileMenuToggle)
          }}
        >
          <Menu />
        </IconButton>
      )}
      {/* mobile view */}
      {!isNonMobileScreen && isModbileMenuToggle && (
        <Box
          position={'fixed'}
          rigth="0"
          bottom={'0'}
          height={'100%'}
          zIndex={'10'}
          maxHeight="500px"
          minWidth={'300px'}
          backgroundColor={background}
        >
          <Box display={'flex'} justifyContent="flex-end" p={'1rem'}>
            <IconButton
              onClick={() => {
                SetIsModbileMenuToggle(!isModbileMenuToggle)
              }}
            >
              <Close />
            </IconButton>
          </Box>

          <FlexBetween
            display={'flex'}
            flexDirection="column"
            justifyContent={'center'}
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => {
                dispatch(setMode())
              }}
            >
              {theme.palette.mode === 'dark' ? (
                <DarkMode sx={{ fontSize: '25px' }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: '25px' }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: '25px' }} />
            <Notifications sx={{ fontSize: '25px' }} />
            <Help sx={{ fontSize: '25px' }} />
            <FormControl variant="standard" value={fullName}>
              <select
                value={fullName}
                sx={{
                  background: primaryLight,
                  width: '150px',
                  borderRadius: '0.25rem',
                  padding: '1rem',

                  '& .MuiSvgIcon-root': {
                    pr: '0.25rem',
                    width: '3rem',
                  },
                  '& .MuiSelect-select:focous': {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem
                  value="Log out"
                  onClick={() => dispatch(setLogout())}
                />
              </select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  )
}

export default NavBarPage
