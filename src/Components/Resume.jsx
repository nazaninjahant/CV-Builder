// React
import * as React from 'react';
// MUI 
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import VerifiedIcon from '@mui/icons-material/Verified';
// Local
import ResumeCard from './ResumeCard';
import { Badge, Chip, ListItem, Stack } from '@mui/material';
// MUI: Icons
import CameraIcon from '@mui/icons-material/Camera';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';

const socialMediaList = {
    facebook: {
        icon: <FacebookIcon />,
        val: 'facebook',
    },
    instagram: {
        icon: <InstagramIcon />,
        val: 'instagram',
    },
    linkedin: {
        icon: <LinkedInIcon />,
        val: 'linkedin',
    },
    twitter: {
        icon: <TwitterIcon />,
        val: 'twitter',
    },
    language: {
        icon: <LanguageIcon />,
        val: 'language',
    },
    link: {
        icon: <LinkIcon />,
        val: 'link',
    },
    github: {
        icon: <GitHubIcon />,
        val: 'github',
    },
}

// ResumePortfolio: A React component that displays a resume/portfolio.
export default function ResumePortfolio({ data }) {
    const [profileAvatar, setProfileAvatar] = React.useState(null);

    function stringAvatar(name) {
        var newName = '';
        if (name.includes(' ')) {
            newName = `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;
        } else {
            newName = `${name[0]}${name[1]}`;
        }
        return {
            children: newName,
        };
    }

    function InputFileUpload() {
        // Upload Avatar and padd URL in profileAvatar state
        return (
            <IconButton
                sx={{
                    width: 22,
                    height: 22,
                    padding: 2,
                    backgroundColor: 'rgb(31, 97, 151)',
                    color: 'white'
                }}
                component="label"
                size="large"
                role={undefined}
                variant="contained"
                tabIndex={-1}
            >
                <CameraIcon />
                <input
                    accept="image/*"
                    hidden
                    type="file"
                    onChange={(e) => setProfileAvatar(URL.createObjectURL(e.target.files[0]))}
                />
            </IconButton>
        );
    }

    return (
        <Box>

            <Grid container spacing={2}>
                {/* Left Column */}
                <Grid size={4}>

                    {/* Profile */}
                    <ResumeCard>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <InputFileUpload></InputFileUpload>
                                }
                            >
                                {profileAvatar !== null ? <Avatar alt="avatar" sx={{ width: 100, height: 100 }} src={profileAvatar} /> : <Avatar {...stringAvatar(data.personal.name ? data.personal.name : 'John Doe')} sx={{ width: 100, height: 100 }} />}
                            </Badge>
                            <Typography sx={{ mt: 2, fontSize: '1.5rem' }} style={{ textAlign: 'center' }}>
                                {data.personal.name ? data.personal.name : 'John Doe'}
                            </Typography>
                            <Typography sx={{ mt: 1 }} style={{ textAlign: 'center' }}>
                                {data.personal.expertise ? data.personal.expertise : 'CTO'}
                            </Typography>
                        </Box>

                        {/* Contact Details */}
                        <Divider sx={{ mt: 2 }} />
                        <List dense>
                            <ListItem alignItems="flex-start" disablePadding>
                                <ListItemButton>
                                    <ListItemIcon style={{ minWidth: '36px' }}>
                                        <AlternateEmailIcon color='primary' />
                                    </ListItemIcon>
                                    <ListItemText style={{ lineBreak: 'anywhere' }} primary={data.personal.email ? data.personal.email : 'johndoe@gmail.com'} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon style={{ minWidth: '36px' }}>
                                        <LocationOnIcon color='primary' />
                                    </ListItemIcon>
                                    <ListItemText primary={data.personal.location ? data.personal.location : 'Iran'} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon style={{ minWidth: '36px' }}>
                                        <LocalPhoneIcon color='primary' />
                                    </ListItemIcon>
                                    <ListItemText primary={data.personal.phone ? data.personal.phone : '+98 921 222 222'} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                        <Divider sx={{ mb: 2 }} />

                        {/* Skills */}
                        <Typography variant="h6" style={{ textAlign: 'center' }} component="div" sx={{ mt: 2 }}>
                            Skills
                        </Typography>
                        <Box sx={{ mt: 1, textAlign: 'center' }}>
                            {data.skills.length > 0 ?
                                <Stack spacing={1}
                                    direction="row"
                                    useFlexGap
                                    sx={{ flexWrap: 'wrap' }}>
                                    {data.skills.map((skill, index) => (
                                        <Chip key={index} label={skill.label} />
                                    ))}
                                </Stack>
                                : <Typography sx={{ marginTop: 2 }}>No Item Added !!</Typography>
                            }
                        </Box>
                    </ResumeCard>

                    {/* Social Media Links */}
                    <ResumeCard>
                        <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
                            Social Media
                        </Typography>
                        <Box sx={{ mt: 2, textAlign: 'center' }}>
                            {data.socialMedia.length > 0 ?
                                <div>
                                    {
                                        data.socialMedia.map((media, index) => (
                                            <IconButton color="primary" key={index} target='_blank' href={media.link}>
                                                {socialMediaList[media.value].icon}
                                            </IconButton>
                                        ))
                                    }
                                </div>
                                :
                                <Typography sx={{ marginTop: 2 }}>No Item Added !!</Typography>
                            }
                        </Box>
                    </ResumeCard>
                </Grid>

                {/* Right Column */}
                <Grid size={8}>

                    {/* Education */}
                    <ResumeCard >
                        <Typography variant="h6" component="div">
                            Education
                        </Typography>
                        {data.education.length > 0 ?
                            <Box sx={{ m: 2, textAlign: 'left' }}>
                                {data.education.map((education, index) => (
                                    <React.Fragment key={education.id}>
                                        <Box sx={{ mb: 3 }}>
                                            <div style={{ display: 'flex', marginBottom: '7px' }}>
                                                <IconButton color="primary" sx={{ p: 0 }}>
                                                    <VerifiedIcon></VerifiedIcon>
                                                </IconButton>
                                                <Typography sx={{ ml: 1, color: 'gray' }} variant="h5">{education.degree}</Typography>
                                            </div>
                                            <div style={{ marginLeft: 30 }}>

                                                <Typography variant="subtitle2" color="secondary" sx={{ mb: 1 }}>
                                                    {education.startDate} - {education.endDate}
                                                </Typography>

                                                <Typography variant="body1" >{education.title}</Typography>

                                            </div>
                                        </Box>

                                        {/* Divider but not for single or last item */}
                                        {index !== data.education.length - 1 && (
                                            <Divider sx={{ mb: 2 }} />
                                        )}

                                    </React.Fragment>
                                ))}
                            </Box> : <Typography sx={{ marginTop: 2 }}>No Item Added !!</Typography>
                        }
                    </ResumeCard>

                    {/* Experience */}
                    <ResumeCard>
                        <Typography variant="h6" component="div">
                            Work Experience
                        </Typography>
                        {data.experience.length > 0 ?
                            <Box sx={{ m: 2, textAlign: 'left' }}>
                                {data.experience.map((experience, index) => (
                                    <React.Fragment key={experience.id}>
                                        <Box sx={{ mb: 3 }}>
                                            <div style={{ display: 'flex', marginBottom: '7px' }}>
                                                <IconButton color="primary" sx={{ p: 0 }}>
                                                    <VerifiedIcon></VerifiedIcon>
                                                </IconButton>
                                                <Typography sx={{ ml: 1, color: 'gray' }} variant="h5">{experience.degree}</Typography>
                                            </div>
                                            <div style={{ marginLeft: 30 }}>

                                                <Typography variant="subtitle2" color="secondary" sx={{ mb: 1 }}>
                                                    {experience.startDate} - {experience.endDate}
                                                </Typography>

                                                <Typography variant="body1" >{experience.title}</Typography>

                                            </div>
                                        </Box>

                                        {/* Divider but not for single or last item */}
                                        {index !== data.experience.length - 1 && (
                                            <Divider sx={{ mb: 2 }} />
                                        )}

                                    </React.Fragment>
                                ))}
                            </Box> : <Typography sx={{ marginTop: 2 }}>No Item Added !!</Typography>
                        }
                    </ResumeCard>

                </Grid>
            </Grid>

        </Box>
    );
}