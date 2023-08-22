import { useEffect, useState } from 'react'

import { Button, Container, FormControl, FormHelperText, Input, InputLabel, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

export default function HomePage(props: any) {
    const nav = useNavigate();
    
    // states for handling validations
    const [msg, setMsg] = useState({
        m:"Please Enter your Name",
        color:"black",
        status:true
    });

    const [msgmob, setMsgMob] = useState({
        m:"Please Enter your Mobile Number",
        color:"black",
        status:true
    });

    const [emailStatus, setEmailStatus] = useState(true);

    // useEffect for checking if the user is already registered and setting and showing the option of alert
    useEffect(() => {
        if(localStorage.getItem("ph")){
            localStorage.setItem("ms", "dept");
            nav("/main"); 
        } else if(localStorage.getItem("ms") === "home") {
            props.showAlert("error", "Please Login First");
            localStorage.removeItem("ms");
        }
    }, [])
    
    // function for validating the correct value of name
    const handleName = (event:any)=>{
        const val:string = event.target.value;
        let message:boolean = false;
        for(let index = 0; index < val.length; index++) {
            if(val[index].toLowerCase() <= 'a' && val[index].toLowerCase() >= 'z'){
                message=true;
                break;
            }
        }
        if(message || val.length <= 3) {
            const obj1 = {m:"Please enter words or name of length greater than 3", color:"red", status:true}
            setMsg((obj)=>{
                return {...obj, ...obj1};
            })
        } else {
            const obj1 = {m:"", color:"white", status:false}
            setMsg((obj)=>{
                return {...obj, ...obj1};
            })
        }
    }
    // funcion for validating the mobile number
    const handleMob = (event:any)=>{
        const val = event.target.value;
        if(val.length < 10) {
            const obj1 = {m:"Please Enter 10 Digit Mobile Number", color:"red", status:true};
            setMsgMob((obj)=>{
                return {...obj, ...obj1};
            })
        } else {
            const obj1 = {m:"", color:"white", status:false};
            setMsgMob((obj)=>{
                return {...obj, ...obj1};
            })
        }
    }

    // function to be called on submit storing user details into localstorage
    const handleSubmit = ()=>{
        const name = document.getElementById("fname") as HTMLInputElement;
        const email = document.getElementById("email") as HTMLInputElement;
        const mobile = document.getElementById("mob") as HTMLInputElement;
        
        localStorage.setItem("uname", name.value);
        localStorage.setItem("ph", mobile.value);
        localStorage.setItem("email", email.value);
        
        nav("/main");
    }
    return (
        <div>
            <Container maxWidth="md">
                <Typography variant="h3" style={{ textAlign: "center", margin: "20px" }}>
                    Fill User Details
                    <form>
                        <FormControl fullWidth style={{marginTop:"30px"}}>
                            <InputLabel htmlFor="my-input">Name</InputLabel>
                            <Input id="fname" aria-describedby="my-helper-text" onChange={handleName} required/>
                            <FormHelperText id="forname" style={{color:msg.color}}>{msg.m}</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth style={{marginTop:"30px"}}>
                            <InputLabel htmlFor="my-input">Email address</InputLabel>
                            <Input type="email" id="email" aria-describedby="my-helper-text" onChange={(e)=>{e.target.value.length>5?setEmailStatus(false):setEmailStatus(true);}} required/>
                            <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                        </FormControl >
                        <FormControl fullWidth style={{marginTop:"30px"}}>
                            <InputLabel htmlFor="my-input">Phone Number</InputLabel>
                            <Input type="number" id="mob" aria-describedby="my-helper-text" onChange={handleMob} required/>
                            <FormHelperText id="forname" style={{color:msgmob.color}}>{msgmob.m}</FormHelperText>
                        </FormControl>
                        <Button variant="contained" disabled={msg.status || msgmob.status || emailStatus} onClick={handleSubmit}>Submit</Button>
                    </form>
                </Typography>
            </Container>
        </div>
    )
}
