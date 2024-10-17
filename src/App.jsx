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
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// Local
import PersonalInfo from './Components/PersonalInfo';
import EducationInfo from './Components/EducationInfo';
import Skills from './Components/Skillset';
import Portfolio from './Components/Resume';
import { Divider } from '@mui/material';
import ExperienceInfo from './Components/Experience';
import SocialMedia from './Components/SocialMedia';

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
    experience: [],
    education: [],
    skills: [],
    socialMedia: [],
  });


  function handleData(list, key) {
    var _data = JSON.parse(JSON.stringify(data));
    _data[key] = list;
    setData(_data);
  }

  function Panel({ id, name, children }) {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={id + "bh-content"}
          id={id + "bh-header"}
        >
          <Typography >{name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {children}
        </AccordionDetails>
      </Accordion>
    )
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
          <CardContent >
            <Portfolio data={data} />
          </CardContent>
          <CardActions>
            <Button style={{ color: 'red' }}>Save as PDF</Button>
          </CardActions>
        </Card >


        :
        // Edit Mode view
        <Card sx={{ minWidth: 800, backgroundColor: '#212121', color: 'white', boxShadow: '2px 10px 20px rgba(66,66,66,.3)', borderRadius: '13px' }}>
          <CardContent>
            <Panel id='personal' name='Personal'>
              <PersonalInfo sendPersonalInfoToParent={handleData}></PersonalInfo>
            </Panel>
            <Divider sx={{ mt: 2 }} />
            <Panel id='education' name='Education'>
              <EducationInfo sendEducationInfoToParent={handleData}></EducationInfo>
            </Panel>
            <Divider sx={{ mt: 2 }} />
            <Panel id='experience' name='Experience'>
              <ExperienceInfo sendExperienceInfoToParent={handleData}></ExperienceInfo>
            </Panel>
            <Divider sx={{ mt: 2 }} />
            <Panel id='skills' name='Skills'>
              <Skills sendSkillsToParent={handleData}></Skills>
            </Panel>
            <Divider sx={{ mt: 2 }} />
            <Panel id='socialMedia' name='Social Media'>
              <SocialMedia sendSocialMediaToParent={handleData}></SocialMedia>
            </Panel>
          </CardContent>
        </Card >
      }
    </>
  )
}

export default App
