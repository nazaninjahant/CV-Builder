import * as React from 'react';
// MUI
import Button from '@mui/material/Button';
import { Alert, Box, Divider, Snackbar, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid from '@mui/material/Grid2';
import { customAlphabet } from 'nanoid/non-secure';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// Date Converter
import dayjs from 'dayjs';
// Generate Random ID
const nanoid = customAlphabet('123456789', 5);

var data = [];

function ExperienceInfo({ sendExperienceInfoToParent }) {
    const formRef = React.useRef();
    const [list, setList] = React.useState([]);
    const [selectedItem, setSelectedItem] = React.useState({
        item: null,
        index: null
    });
    const [degree, setDegree] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [startDate, setStartDate] = React.useState(dayjs('2022-04-17'));
    const [endDate, setEndDate] = React.useState(dayjs('2022-04-17'));
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
    }, [selectedItem])

    function RenderEductionForm() {
        // Sort Added Data from inputForm
        return (
            <div>
                {data.length == 0 ? (<div>No Item, Create a one!</div>) :
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Degree</TableCell>
                                    <TableCell align="right">Title</TableCell>
                                    <TableCell align="right">Start Date</TableCell>
                                    <TableCell align="right">End Date</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((item, i) => (
                                    <TableRow
                                        key={item.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <p style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: "50px" }}>{item.degree}</p>
                                        </TableCell>
                                        <TableCell align="right">{item.title}</TableCell>
                                        <TableCell align="right">{item.startDate}</TableCell>
                                        <TableCell align="right">{item.endDate}</TableCell>
                                        <TableCell align="right">
                                            <Button variant='contained' color='error' sx={{ marginRight: 1 }} onClick={() => {
                                                removeItem(i);
                                            }} size='small'>Delete</Button>
                                            <Button variant='contained' color='primary' onClick={() => {
                                                selectItem(item, i);
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
    function selectItem(item, i) {
        setSelectedItem({
            item: item,
            index: i
        })
        setDegree(data[i].degree);
        setTitle(data[i].title);
    }

    function inputForm() {
        return (
            <div>
                <Box
                    sx={{ '& > :not(style)': { m: 1, maxWidth: 700, mx: 'auto' } }}
                    autoComplete="off"
                >
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField required label="Degree" variant="outlined" name="degree" type='text' fullWidth value={degree} onChange={e => setDegree(e.target.value)}
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField required id="title" label="Title" variant="outlined" name="title" type='text' fullWidth onChange={e => setTitle(e.target.value)} value={title}

                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker label='Start Date' sx={{ width: '100%' }} value={startDate}
                                    slotProps={{
                                        textField: {
                                            required: true,
                                        },
                                    }}
                                    onChange={(newValue) => setStartDate(newValue)} />
                            </LocalizationProvider>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker label='End Date' sx={{ width: '100%' }} value={endDate}
                                    slotProps={{
                                        textField: {
                                            required: true,
                                        },
                                    }}
                                    onChange={(newValue) => setEndDate(newValue)} />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>

                    <Button variant='contained' color='success' onClick={updateList}>{selectedItem.index !== null ? 'Update Item' : 'Add New Item'}</Button>

                    <Divider sx={{ mt: 2 }} />
                </Box>
            </div>
        )
    }
    const updateList = () => {
        let isValidated = formRef.current.reportValidity();
        if (isValidated) {
            if (selectedItem.index !== null) {
                updateItem();
                return;
            }
            createItem();
        } else {
            setError(true);
        }

    };
    function removeItem(index) {
        let newArr = [...list];
        newArr.splice(index, 1);
        setList(newArr);
        data.splice(index, 1);
        resetForm();
    }
    function resetForm() {
        setSelectedItem({
            index: null,
            item: null
        });
        setDegree("");
        setTitle("");
    }

    function updateItem() {
        let newArr = [...list];
        var form = {
            id: selectedItem.item.id,
            degree: degree,
            title: title,
            startDate: dayjs(startDate.$d).format('YYYY-MM-DD'),
            endDate: dayjs(endDate.$d).format('YYYY-MM-DD')
        };
        newArr[selectedItem.index] = form;
        setList(newArr);
        data[selectedItem.index] = form;
        resetForm();

    }
    function createItem() {
        var newItem = {
            id: nanoid(),
            title: title,
            degree: degree,
            startDate: dayjs(startDate.$d).format('YYYY-MM-DD'),
            endDate: dayjs(endDate.$d).format('YYYY-MM-DD')
        }
        setList([...list, newItem]);
        data = [...data, newItem];
        resetForm();
    }
    function saveData() {
        sendExperienceInfoToParent(data, 'experience');
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setError(false);
    };

    return (
        <>
            <form ref={formRef}>
                {inputForm()}
                <RenderEductionForm />
                <Button sx={{ backgroundColor: '#0d47a1', color: 'white', my: 2 }} onClick={saveData} >Save</Button>
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
        </>
    )
}

export default ExperienceInfo
