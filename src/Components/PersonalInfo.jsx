import * as React from 'react';
import Button from '@mui/material/Button';
import { Alert, Box, Snackbar, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';

var data = {
    name: "John Doe",
    expertise: 'CTO',
    email: "john.doe@test.com",
    location: "Iran",
    phone: "098 0650 989",
};
function PersonalInfo({ sendPersonalInfoToParent }) {
    const formRef = React.useRef();
    const [state, setState] = React.useState({
        name: "John Doe",
        expertise: 'CTO',
        email: "john.doe@test.com",
        location: "Iran",
        phone: "098 0650 989",
    });
    const [error, setError] = React.useState(false);

    const handleChange = e => {
        data[e.target.name] = e.target.value;
        setState(state => (
            {
                ...state,
                [e.target.name]: e.target.value
            }))
    };
    function saveData() {
        var isValidated = formRef.current.reportValidity();
        if (isValidated) {
            sendPersonalInfoToParent(state, 'personal');
            return
        }
        setError(true);
    }
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setError(false);
    };

    return (
        <>
            <Box
                sx={{ '& > :not(style)': { m: 1, maxWidth: 700, mx: 'auto', flexGrow: 1 } }}
                autoComplete="off"
            >
                <form ref={formRef}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField required id="name" label="Name" variant="outlined" name="name" type='text' fullWidth
                                value={data.name}
                                onChange={handleChange} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField required id="expertise" label="Expertise" variant="outlined" name="expertise" type='text' fullWidth
                                value={data.expertise}
                                onChange={handleChange} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField required id="email" label="Email" variant="outlined" name="email" type='email' fullWidth
                                value={data.email}
                                onChange={handleChange} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField required id="location" label="Location" variant="outlined" name="location" fullWidth
                                value={data.location}
                                onChange={handleChange} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField required id="phone" label="Phone" variant="outlined" name="phone" fullWidth
                                value={data.phone}
                                onChange={handleChange} />
                        </Grid>
                    </Grid>
                    <Button sx={{ backgroundColor: '#0d47a1', color: 'white', my: 2 }} onClick={saveData} >Save</Button>
                </form>
            </Box>
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
        </>
    )
}

export default PersonalInfo
