import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Stack, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid from '@mui/material/Grid2';
import { nanoid } from 'nanoid/non-secure';

function EducationInfo() {
    const [list, setList] = React.useState([{
        id: nanoid(),
        title: "madrak",
        name: "uny",
        startDate: "",
        endDate: "",
    }]);

    const addComponent = () => {
        var newItem = {
            id: nanoid(),
            title: "madrak",
            name: "uny",
            startDate: "",
            endDate: "",
        }
        setList([...list, newItem]);
    };

    return (
        <>
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, maxWidth: 700, mx: 'auto' } }}
                autoComplete="off"
            >
                {list.map((item) => (
                    <div key={item.id}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField id="title" label="Title" variant="outlined" name="title" type='text' fullWidth value={data.name}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField id="name" label="Name" variant="outlined" name="name" type='text' fullWidth
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker label='Start Date' sx={{ width: '100%' }} />
                                </LocalizationProvider>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker label='End Date' sx={{ width: '100%' }} />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                        <hr style={{ opacity: '.04', marginTop: '20px', marginBottom: '20px' }} />
                    </div>
                ))}
            </Box>
            <Button onClick={addComponent}>Add</Button>
            <Button sx={{ backgroundColor: '#0d47a1', color: 'white', my: 2 }} >Save</Button>
        </>
    )
}

export default EducationInfo
