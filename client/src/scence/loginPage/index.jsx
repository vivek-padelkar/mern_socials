import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import { useNavigate } from 'react-router'
import Form from './Form'

const LoginPage = () => {
  const theme = useTheme()
  const isNonMobileScreen = useMediaQuery('{min-width: 1000px}')
  return (
    <Box>
      <Box
        width={'100%'}
        backgroundColor={theme.palette.background.alt}
        padding="1rem 6%"
        textAlign={'center'}
      >
        <Typography fontWeight={'bold'} fontSize="32px" color="#83A523">
          Avocado Connect
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreen ? '50%' : '90%'}
        p="2rem"
        m="2rem auto"
        borderRadius={'1.5rem'}
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight={500} variant="h5" sx={{ mb: '1.5rem' }}>
          Welcome to Avocado connect, All you need is love and avocados.
        </Typography>
        <Form />
      </Box>
    </Box>
  )
}

export default LoginPage
