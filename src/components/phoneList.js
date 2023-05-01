import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';

const fetchData = async (accessToken,refreshToken) => {
	console.log(accessToken);
	console.log(refreshToken);
  const response = await axios.get(
		'http://phone.pinodev.shop:8000/api/phone',
		{
			headers: {
				"Content-Type": "application/json",
				Accept:"application/json",
				Authorization: `Bearer ${accessToken}`,
				Refresh:refreshToken,
			},
		}
	);
  return response.data;
};

const PhoneGrid = () => {
	
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
	const [open, setOpen] = useState(false);
	const [name, setName] = useState('');
  const [number, setNumber] = useState('');

	const handleButtonClick = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpenPopup = (param) =>{
		setOpen(true);
		setName(param.name);
		setNumber(param.number);
		console.log("param", name);
		<Modal open={open} handleClose={handleClose} handleSave={handleSave} name={name} number={number}></Modal>
	}

	const handleSave = async (event) => {
		event.preventDefault();
    const data = new FormData(event.currentTarget);
		const accessToken = localStorage.getItem("accessToken");
		const refreshToken = localStorage.getItem("refreshToken");
		await axios.post(
			'http://phone.pinodev.shop:8000/api/phone',
			{
				name: data.get('name'),
				number: data.get('number'),
			},
			{
				headers: {
					"Content-Type": "application/json",
					Accept:"application/json",
					Authorization: `Bearer ${accessToken}`,
					Refresh:refreshToken,
				},
			}
		).then((response) => {
			console.log(response.data);
			setOpen(false);
		})
	};

  useEffect(() => {
    const getData = async () => {
			const accessToken = localStorage.getItem('accessToken');
			const refreshToken = localStorage.getItem('refreshToken');
      const data = await fetchData(accessToken,refreshToken);
			
      setPhones(data.responseData);
			console.log("data = ", data.responseData)
      setLoading(false);
    };

    getData();
  }, []);

  const columns = [
		{ field: 'num', headerName: '번호', width: 200 },
    { field: 'name', headerName: '이름', width: 200,
		renderCell: (params) => (
      <div style={{cursor: 'pointer'}} onClick={() => handleOpenPopup(params.row)}>
        {params.value}
      </div>
    )
		},
    { field: 'number', headerName: '전화번호', width: 200
		},
    { field: 'userName', headerName: '등록자', width: 150 },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Phone Catalog</Typography>
						<Button onClick={handleButtonClick} variant="contained">
							전화번호 저장
						</Button>

						<Modal open={open} handleClose={handleClose} handleSave={handleSave}></Modal>

            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                loading={loading}
                rows={phones.map((phone, i) => ({
									num : i + 1,
									id: phone.idx,
									name: phone.name,
									number: phone.number,
									userName : phone.user.name,
								}))}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 25]}
                disableSelectionOnClick
              />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

function Modal(props){
	return(
		<>
			<Dialog open={props.open} onClose={props.handleClose}>
						<DialogTitle>{"전화번호 저장"}</DialogTitle>
						<Box component="form" onSubmit={props.handleSave} noValidate sx={{ mt: 1 }}>
						<DialogContent>
							<TextField
								margin="normal"
								required
								fullWidth
								id="name"
								label="name"
								name="name"
								autoComplete="name"
								autoFocus
							/>
						</DialogContent>
						<DialogContent>
						
							<TextField
								margin="normal"
								required
								fullWidth
								id="number"
								label="number"
								name="number"
								autoComplete="number"
								autoFocus
							/>
						</DialogContent>
						<DialogActions>
							<Button type="submit">저장</Button>
						</DialogActions>
						<DialogActions>
							<Button onClick={props.handleClose}>Close</Button>
						</DialogActions>
						</Box>
					</Dialog>
		</>
	)
}

export default PhoneGrid;