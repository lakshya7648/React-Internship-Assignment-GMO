// import { useState } from 'react'
import { Container } from '@mui/material';
import Alert from '@mui/material/Alert';


export default function AlertMessage(props: any) {
    return (
        <div>
            <Container>
                {props.alert && <Alert severity={props.alert.severity}>{props.alert.message}</Alert>}
            </Container>
        </div>
    )
}
