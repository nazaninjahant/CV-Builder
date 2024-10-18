import * as React from 'react';
import { styled } from '@mui/material/styles';
// MUI
import Chip from '@mui/material/Chip';
import { Alert, Box, Button, IconButton, Snackbar, TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
// nanoi (rendom ID generater)
import { customAlphabet } from 'nanoid/non-secure';

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

const nanoid = customAlphabet('123456789', 5);

var data = [];

export default function Skills({ sendSkillsToParent }) {
    const formRef = React.useRef();
    const [skill, setSkill] = React.useState('');
    const [chipData, setChipData] = React.useState([]);
    const [error, setError] = React.useState(false);

    const handleDelete = (chipToDelete, index) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));

        let newArr = [...data];
        newArr.splice(index, 1);
        data.splice(index, 1);
        setSkill('');
    };
    function addSkill() {
        let isValidated = formRef.current.reportValidity();
        if (isValidated) {
            var list = {
                key: nanoid(),
                label: skill,
            }
            setChipData([
                ...chipData,
                list,
            ])
            data = [...data, list]
            setSkill('')
        } else {
            setError(true)
        }
    }
    function saveData() {
        sendSkillsToParent(data, 'skills');
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setError(false);
    };

    return (
        <Box
            sx={{
                listStyle: 'none',
            }}
        >
            <form ref={formRef}>
                <div style={{ width: '100%', marginBottom: '15px' }}
                >

                    <TextField
                        onChange={e => setSkill(e.target.value)}
                        sx={{ ml: 1, flex: 1 }}
                        label="Add a Skill"
                        value={skill}
                        required
                    />
                    <IconButton type="button" sx={{ mt: '9px' }} aria-label="add" onClick={addSkill}>
                        <AddCircleIcon />
                    </IconButton>
                </div>
                <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', }}>
                    {data.map((data, i) => {
                        return (
                            <ListItem key={data.key}>
                                <Chip
                                    label={data.label}
                                    onDelete={handleDelete(data, i)}
                                />
                            </ListItem>
                        );
                    })}
                </div>
                <Button variant='contained' sx={{ backgroundColor: '#0d47a1', color: 'white', my: 2 }} onClick={saveData} >Save</Button>
            </form>
            <Snackbar
                open={error}
                autoHideDuration={5000}
                onClose={handleCloseAlert}
            >
                <Alert
                    severity='error'
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Please fill all Required fields
                </Alert>

            </Snackbar>
        </Box>
    );
}