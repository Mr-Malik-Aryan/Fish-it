import '../App.css';
import Container from './container';
import phoneWave from "./images/WaveMobile.png"
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import wave from "./images/base.png"
import Navbar from './navbar';
import Alert from '@mui/material/Alert';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from '@mui/material/TextField';
import { Box, Button, Typography } from "@mui/material";
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Download() {
   
    const [filename, setFilename] = useState();
    const [message, setMessage] = useState();
    const [password, setPassword] = useState();
    const [downloader, setDownloader] = useState();
    const [loader, setLoader] = useState('none');
    const formData = new FormData();

    formData.append('name', filename);  // Replace with actual name
    formData.append('message', message);  // Replace with actual message
    formData.append('password', password);  // Replace with actual password
    const navigate = useNavigate();
    const handleClick = (() => {

        // if the filename does not exist, then it returns back error
        if (!filename) {
            alert("Please enter a valid filename");
            setLoader('none');
            return;
        }

        setLoader('flex');
       // https://fish-it-backend.onrender.com/download/
       
        axios.get(`https://fish-it-backend-1.onrender.com/download/${filename}/${password}`, {
            
        })
            .then(response => {
                      console.log(response.data)
                if(response.data === "Wrong Password")
                {
                    alert("Wrong Password")
                    setLoader("none")
                }
                else if(response.data.message === 'success'){
                    setDownloader(1);
                   
                    setMessage(response.data.text)
                   
                    window.location.replace(`https://fish-it-backend-1.onrender.com/downloadfile/${filename}/${password}`)
                    // setLoader("none")
                }
             
                 
            })
            .catch(error => {
                setLoader("none")
             alert(" No such file exists ")
            });
    })
    useEffect(() => {

    }, [downloader,loader])
    if (downloader === 1) {
        return (
            <>
                <Navbar></Navbar>
                <Box sx={ 
                    {display:"loader", flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
              

            
                <Alert sx={{width:'100vw'}} severity="success">Please Wait downloading will start shortly
              
                </Alert>

                </Box>
                <Box sx={{ display: 'flex', alignItems: 'top', height: '100vh', justifyContent: 'center' }}>
                   
                        <Typography sx={{color:'white'}}>{message}</Typography>
               

                </Box>
            </>)
    }
    else {


        return (
            <>
                <Navbar></Navbar>
                <Box sx={{width:"100vw",height:'100vh',display:loader,position:"absolute",justifyContent:'center'}}>
                <CircularProgress />
                </Box>
            
                <Box sx={{ display: 'flex' ,marginTop:'5%', alignItems: 'flex end', height: '80vh', justifyContent: 'center' }}>

                    <Box sx={{ display: 'flex', flexDirection: 'column', color: 'white',  justifyContent: 'center',height:'70vh',width:'60vh', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '20px', alignItems: 'center' }}>
                        <TextField sx={{ color: '#ffffff', backgroundColor: '#D9D9D9', borderRadius: '15px', marginBottom: '5%', width: '90%', textAlign: "center", }} id="outlined-basic" variant="outlined" label="File Name" onChange={(event) => { setFilename(event.target.value) }} />
                        <TextField sx={{ color: '#ffffff', backgroundColor: '#D9D9D9', borderRadius: '15px', marginBottom: '5%', width: '90%', textAlign: "center", }} id="outlined-basic" variant="outlined" label="Password" type="password" onChange={(event) => { setPassword(event.target.value) }} />
                        <Box sx={{ width: "100%", height: "100px", justifyContent: 'space-around', display: "flex", alignItems: 'center' }}>
                       
                            <Button sx={{ color: 'white', border: 'solid 2px #52D9BB ', borderRadius: '8px', width: '40%', fontSize: '80%', height: '60%', ":hover": { bgcolor: '#52D9BB', color: '#16162E' } }} onClick={() => { handleClick() }} >Download</Button>



                        </Box>



                    </Box>


                </Box>
                <Box sx={{display:{xs:'flex',md:'none',xl:'none'},width:'100vw',alignItems:"flex-end"}}>
        <img src={phoneWave} height={70} width="100%" alt="" />
        </Box>
        <Box sx={{display:{xs:'none',md:'flex',xl:'flex'},width:'100vw',alignItems:"flex-end"}}>
        <img src={wave} height={80} width="100%" alt="" />
        </Box>
            </>
        );
    }

}
