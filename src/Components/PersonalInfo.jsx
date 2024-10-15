import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';

var data = {
    name: "John Doe",
    email: "john.doe@test.com",
    location: "Iran",
    phone: "098 0650 989",
};
function PersonalInfo({ sendDataToParent }) {
    const [state, setState] = React.useState({
        name: "John Doe",
        email: "john.doe@test.com",
        location: "Iran",
        phone: "098 0650 989",
    });
    const handleChange = e => {
        data[e.target.name] = e.target.value;
        setState(state => (
            {
                ...state,
                [e.target.name]: e.target.value
            }))
    };
    function handleClick() {
        sendDataToParent(state);
    }
    return (
        <>
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, maxWidth: 700, mx: 'auto', flexGrow: 1 } }}
                autoComplete="off"
            >
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField id="name" label="Name" variant="outlined" name="name" type='text' fullWidth
                            value={data.name}
                            onChange={handleChange} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField id="email" label="Email" variant="outlined" name="email" type='email' fullWidth
                            value={data.email}
                            onChange={handleChange} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField id="location" label="Location" variant="outlined" name="location" fullWidth
                            value={data.location}
                            onChange={handleChange} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField id="phone" label="Phone" variant="outlined" name="phone" fullWidth
                            value={data.phone}
                            onChange={handleChange} />
                    </Grid>
                </Grid>
            </Box>
            <Button sx={{ backgroundColor: '#0d47a1', color: 'white', my: 2 }} onClick={handleClick} >Save</Button>
        </>
    )
}

export default PersonalInfo