import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from '@mui/icons-material'
import { Box, Typography, Divider, useTheme } from '@mui/material'
import UserImage from 'components/UserImage'
import FlexBetween from 'components/FlexBetween'
import WidgetWrapper from 'components/WidgetWrapper'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null)
  const { palette } = useTheme()
  const navigate = useNavigate()
  const token = useSelector((state) => state.token)
  const dark = palette.neutral.dark
  const medium = palette.neutral.medium
  const main = palette.neutral.main

  const getUser = async () => {
    try {
      const hearder = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await axios.get(`/api/users/${userId}`, hearder)
      setUser(data)
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message)
      console.log('error from logigetUsern' + JSON.stringify(error))
    }
  }
  useEffect(() => {
    getUser()
  }, [])

  if (!user) {
    return null
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impression,
    friends,
  } = user

  return (
    <WidgetWrapper>
      <FlexBetween
        gap="0.5rem"
        pb="1.5rem"
        onClick={() => {
          navigate(`/profile/${userId}`)
        }}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                '&:hover': {
                  color: palette.primary.light,
                  cursor: 'pointer',
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
            <ManageAccountsOutlined />
          </Box>
        </FlexBetween>

        <Divider />

        {/**2nd row */}
        <Box p="1rem 0">
          <Box display={'flex'} alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{location}</Typography>
          </Box>
          <Box display={'flex'} alignItems="center" gap="1rem">
            <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{occupation}</Typography>
          </Box>

          {/**3rd row */}
        </Box>
      </FlexBetween>
    </WidgetWrapper>
  )
}

export default UserWidget
