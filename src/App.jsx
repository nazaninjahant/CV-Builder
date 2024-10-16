import * as React from 'react';
import { styled } from '@mui/material/styles';
import './App.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import PersonalInfo from './Components/PersonalInfo';
import EducationInfo from './Components/EducationInfo';

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#65C466',
        opacity: 1,
        border: 0,
        ...theme.applyStyles('dark', {
          backgroundColor: '#2ECA45',
        }),
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
      ...theme.applyStyles('dark', {
        color: theme.palette.grey[600],
      }),
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
      ...theme.applyStyles('dark', {
        opacity: 0.3,
      }),
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    ...theme.applyStyles('dark', {
      backgroundColor: '#39393D',
    }),
  },
}));

function App() {
  const [editMode, setEditMode] = React.useState(false);

  const [data, setData] = React.useState({
    personal: {},
    exp: {},
    education: {},
  });
  // Pass Personal Info Component to data
  function handleDataFromPersonal(personalList) {
    setData({
      ...data,
      personal: personalList
    })
  }
  function handleDataFromEducation(educationList) {
    setData({
      ...data,
      education: educationList
    })
  }
  return (
    <>
      <h1>Welcome to CV builder</h1>
      <FormGroup>
        <FormControlLabel
          control={<IOSSwitch sx={{ m: 1 }} value={editMode} onChange={() => setEditMode(!editMode)} />}
          label="Edit mode"
        />
      </FormGroup>
      {editMode === false ?
        <Card sx={{ minWidth: 800, backgroundColor: '#212121', color: 'white', boxShadow: '2px 10px 20px rgba(66,66,66,.3)', borderRadius: '13px' }}>
          {/* Personal view */}
          <CardContent id="personalPreview">
            <Typography variant="h5">
              {data.personal.name ? data.personal.name : 'John Doe'}
            </Typography>
            <Typography sx={{ mb: 1.5 }}>{data.personal.location ? data.personal.location : 'Canada'}</Typography>
            <Typography sx={{ mb: 1.5 }}>{data.personal.email ? data.personal.email : 'example@gmail.com'}</Typography>
            <Typography>
              {data.personal.phone ? data.personal.phone : '921 555 555'}
            </Typography>
          </CardContent>
          <hr style={{ opacity: '.04' }} />
          {/* Education View */}
          <CardContent id="educationPreview">
            <Typography variant="h5">
              hi
            </Typography>
          </CardContent>
          <CardActions>
            <Button style={{ color: 'red' }}>Save as PDF</Button>
          </CardActions>
        </Card >
        :
        // Edit Mode view
        <Card sx={{ minWidth: 800, backgroundColor: '#212121', color: 'white', boxShadow: '2px 10px 20px rgba(66,66,66,.3)', borderRadius: '13px' }}>
          <CardContent>
            <Typography sx={{ my: 2.5, fontWeight: 'bold' }}>Personal :</Typography>
            <PersonalInfo id='personal' sendPersonalInfoToParent={handleDataFromPersonal}></PersonalInfo>
            <hr style={{ opacity: '.04' }} />
            <Typography sx={{ my: 2.5, fontWeight: 'bold' }}>Education :</Typography>
            <EducationInfo sendEducationInfoToParent={handleDataFromEducation}></EducationInfo>
          </CardContent>
        </Card >
      }
    </>
  )
}

export default App
