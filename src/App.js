import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));
const App = () => {
  const [APIData, setAPIData] = useState([]);
  const [result, setResult] = useState([]);
  const [text, setText] = useState('');
  useEffect(() => {
    axios.get(`https://api-mobilespecs.azharimm.site/v2/brands/`)
      .then((response) => {
        setAPIData(response.data.data);
        setResult(response.data.data);
      })
  }, [])

  const search = (text) =>{
    setText(text);
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField id="filled-basic" label="Search..." variant="filled" style={{ width: '100%' }} onChange={(e)=>search(e.target.value)}/>
        {console.log(APIData)}
        <Stack
          direction={{ xs: 'column', sm: 'column' }}
          spacing={{ xs: 1, sm: 1, md: 1 }}
        >
          {result.filter(item => item.brand_name.includes(text)).sort((a, b) => a.brand_name.localeCompare(b.brand_name)).map((filteredItem, key) => (
            <Item key={key}>{filteredItem.brand_name}</Item>
          ))}
        </Stack>
      </Grid>
    </Grid>
  )
}

export default App;