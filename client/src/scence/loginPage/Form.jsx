import { useState } from 'react'
import {
  Box,
  Button,
  TexField,
  useMediaQuery,
  Typography,
  useTheme,
  TextField,
} from '@mui/material'
import {
  BorderClear,
  EditOutlined,
  FormatUnderlined,
} from '@mui/icons-material'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Navigate, useAsyncValue, useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { setLogin } from 'states'
import Dropzone from 'react-dropzone'
import FlexBetween from 'components/FlexBetween'
import {
  registerSchema,
  loginSchema,
  initialValueRegister,
  initialValuesLogin,
} from './validationSchema'
import { borderRadius } from '@mui/system'
import { LIGHTBROWN, DARKBROWN } from '../../colorConstants'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
const Form = () => {
  const [pageType, setPageType] = useState('login')
  const [error, setError] = useState(null)
  const { palette } = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isMobileScreen = useMediaQuery('{min-width: 600px}')
  const isLogin = pageType === 'login'
  const isRegister = pageType === 'register'

  const register = async (values, onSubmitProps) => {
    const formData = new FormData()
    for (let value in values) {
      formData.append(value, values[value])
    }
    formData.append('picturePath', values.picture.name)
    const { data } = await axios.post('/auth/register', formData)
    onSubmitProps.resetForm()
    if (data) {
      setPageType('login')
    }
  }

  const login = async (values, onSubmitProps) => {
    try {
      console.log('i am triggreed')
      const headers = {
        headers: {
          contentType: 'Application/json',
        },
      }
      console.log('awaiting')
      const { data } = await axios.post(
        '/api/auth/login',
        JSON.stringify(values),
        headers
      )
      console.log(JSON.stringify(data))
      onSubmitProps.resetForm()
      if (data) {
        setError(null)
        dispatch(setLogin({ user: data.user, token: data.token }))
        navigate('/home')
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log('i am here error' + JSON.stringify(error))
    }
  }

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) {
      await login(values, onSubmitProps)
    }
    if (isRegister) {
      await register(values, onSubmitProps)
    }
  }

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValueRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        handleChange,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display={'grid'}
            gap="30px"
            gridTemplateColumns={'repeat(4, minmax(0,1fr)'}
            sx={{
              '& > div': {
                gridColumn: isMobileScreen ? undefined : 'span 4',
              },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  sx={{
                    gridColumn: 'span 2',
                  }}
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                />

                <TextField
                  label="Last name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  sx={{
                    gridColumn: 'span 2',
                  }}
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={
                    Boolean(touched.lastName) && Boolean(errors.lastName)
                  }
                />

                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  sx={{
                    gridColumn: 'span 4',
                  }}
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={
                    Boolean(touched.location) && Boolean(errors.location)
                  }
                />

                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  sx={{
                    gridColumn: 'span 4',
                  }}
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                />

                <Box
                  gridColumn="span 4"
                  border={`1px solid ${'#703F37'}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) => {
                      setFieldValue('picture', acceptedFiles[0])
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${'#703F37'}`}
                        sx={{
                          '&:hover': { cursor: 'pointer' },
                        }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Drop your love here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlined />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              sx={{
                gridColumn: 'span 4',
              }}
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={Boolean(touched.email) && Boolean(errors.email)}
            />
            <TextField
              label="Password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              sx={{
                gridColumn: 'span 4',
              }}
              type="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={Boolean(touched.password) && Boolean(errors.password)}
            />
          </Box>

          {/**Buttons */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: '2rem 0',
                p: '1rem',
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                '&:hover': { backgroundColor: LIGHTBROWN, color: DARKBROWN },
              }}
            >
              {isLogin ? 'LOGIN' : 'REGISTER'}
            </Button>

            <Typography
              onClick={() => {
                setPageType(isLogin ? 'register' : 'login')
                resetForm()
              }}
              sx={{
                textDecoration: 'underline',
                color: palette.primary.main,
                '&:hover': { backgroundColor: LIGHTBROWN, color: DARKBROWN },
              }}
            >
              {isLogin
                ? 'Dont have Account? Sign up here'
                : 'Already have an account ? Login here'}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default Form
