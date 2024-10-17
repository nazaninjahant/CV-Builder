import * as React from 'react';
// MUI: Icons
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, IconButton, MenuItem, Select, TextField } from '@mui/material';

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

var data = []

export default function SocialMedia({ sendSocialMediaToParent }) {
    const [link, setLink] = React.useState('');
    const [icon, setIcon] = React.useState('facebook');
    const [list, setList] = React.useState([]);
    const [selectedItem, setSelectedItem] = React.useState(null);

    React.useEffect(() => {
    }, [selectedItem])


    const updateList = () => {
        if (selectedItem !== null) {
            updateItem();
            return;
        }
        createItem();
    };
    function createItem() {
        var newItem = {
            value: icon,
            link: link,
        }
        setList([...list, newItem]);
        data = [...data, newItem];
        setLink('')
        setSelectedItem(null)
    }
    function updateItem() {
        let newArr = [...list];
        var form = {
            value: icon,
            link: link,
        }
        newArr[selectedItem] = form;
        setList(newArr);
        data[selectedItem] = form;
        setLink('')
        setSelectedItem(null)

    }

    function removeItem(index) {
        let newArr = list.splice(index, 1);
        setList(newArr);
        data.splice(index, 1);
        setLink('')
        setSelectedItem(null)

    }

    function selectItem(i) {
        setSelectedItem(i)
        setLink(list[i].link)
        setIcon(list[i].value)
    }
    function saveData() {
        sendSocialMediaToParent(data, 'socialMedia');
    }

    function RenderItems() {
        return (
            <div>
                {data.length == 0 ? (<div style={{ marginTop: '25px' }}>No Item, Create a one!</div>) :
                    <TableContainer sx={{ mt: 4 }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                            <TableHead>
                                <TableRow>
                                    <TableCell>icon</TableCell>
                                    <TableCell align="right">Url</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((item, i) => (
                                    <TableRow
                                        key={i}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {socialMediaList[item.value].icon}
                                        </TableCell>
                                        <TableCell align="right">{item.link}</TableCell>
                                        <TableCell align="right">
                                            <Button variant='contained' color='error' sx={{ marginRight: 1 }} onClick={() => {
                                                removeItem(i);
                                            }} size='small'>Delete</Button>
                                            <Button variant='contained' color='primary' onClick={() => {
                                                selectItem(i);
                                            }} size='small'>Edit</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </div >
        )
    }
    return (
        <>
            <Box >
                <Select
                    size='small'
                    labelId="Social Media"
                    value={icon}
                    label="icon"
                    onChange={e => setIcon(e.target.value)}
                >
                    {Object.keys(socialMediaList).map((item, i) => (
                        <MenuItem key={i} value={socialMediaList[item].val}>
                            <IconButton >
                                {socialMediaList[item].icon}
                            </IconButton>
                        </MenuItem>
                    ))}
                </Select>
                <TextField autoComplete='off' label='Link' required value={link} onChange={e => setLink(e.target.value)}></TextField>
                <Button onClick={updateList}>{selectedItem !== null ? 'Update Item' : 'Add New Item'}</Button>
                <RenderItems></RenderItems>
                <Button sx={{ backgroundColor: '#0d47a1', color: 'white', my: 2 }} onClick={saveData} >Save</Button>
            </Box>
        </>
    )
}