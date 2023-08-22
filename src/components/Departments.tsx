import { Fragment, useState, useEffect } from 'react'
import { Container, Typography } from "@mui/material";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DataTable from '../components/DataTable'
import { useNavigate } from 'react-router-dom';

export default function Departments(props:any) {
    
    const nav = useNavigate(); // navigate to navigate over the react page
    
    // useEffect for checking about whether user is already registered and showing and setting option for alert
    useEffect(() => {
        if(!localStorage.getItem("ph")){
            localStorage.setItem("ms", "home");
            nav("/");
        } else if(localStorage.getItem("ms") === "dept"){
            props.showAlert('success', 'You are Already In....');
            localStorage.removeItem("ms");
        }
    }, [])
    

    let count = 0;
    const dept: { [key: string]: boolean } = {};
    const subCheck: { [key: string]: { [key: string]: boolean } } = {};
    const parentCheck: { [key: string]: boolean } = {};

    const deptData: any[] = [
        {
            "department": "Customer Service",
            "sub_departments": [
                "Support",
                "Customer Success"
            ]
        },
        {
            "department": "Design",
            "sub_departments": [
                "Graphic Design",
                "Product Design",
                "Web Design"
            ]
        }
    ];

    // logic for creating state objects for some important components
    deptData.forEach((el) => {
        dept[(el["department" as keyof object] as string)] = true
        parentCheck[(el["department" as keyof object] as string)] = false;
        subCheck[el["department" as keyof object]] = el["sub_departments" as keyof object].map((val: any) => {
            let obj: { [key: string]: boolean } = {};
            // console.log(val);
            obj[val] = false;
            return obj;
        });

    })

    // creating respective states for handling some events
    const [isOpen, setIsOpen] = useState(dept);
    const [check, setCheck] = useState(subCheck);
    const [parentC, setParentC] = useState(parentCheck);

    // function for collapsing and expanding
    const handleClick = (event: any, dep: string) => {
        event.preventDefault();
        let value: any = isOpen;
        value[dep] = !value[dep];
        setIsOpen((obj) => { return { ...obj, ...value } });
    }


    // function for checking the children of the parent checkbox clicked.
    const handleParent = (event: any, dep: string) => {
        let checked = false;
        let changeValue = check[dep];
        for (let index = 0; index < Object.keys(changeValue).length; index++) {
            const value = Object.keys(changeValue[index]).map((el) => { return el as string });
            if (event.target.checked) {
                (changeValue[index][value[0] as keyof object] as boolean) = true;
                checked = true;
            } else {
                (changeValue[index][value[0] as keyof object] as boolean) = false;
            }
        }
        let newObj: { [key: string]: { [key: string]: boolean } } = {};
        newObj[dep] = changeValue;
        setCheck((obj) => {
            return { ...obj, ...newObj }
        });

        let obj2: { [key: string]: boolean } = {};
        obj2[dep] = checked ? true : false;
        setParentC((obj) => {
            return { ...obj, ...obj2 }
        });
    }

    // function for handling the child checking and also checking whether all children checked so that parent can be checked true
    const handleChild = (event: any, subEl: string, dep: string) => {
        let allcheck: boolean = true;
        let changeValue = check[dep];
        for (let index = 0; index < Object.keys(changeValue).length; index++) {
            if (Object.keys(changeValue[index])[0] === subEl) {
                (changeValue[index][subEl as keyof object] as boolean) = event.target.checked ? true : false;
                break;
            }
        }
        let newObj: { [key: string]: { [key: string]: boolean } } = {};
        newObj[dep] = changeValue;
        setCheck((obj) => {
            return { ...obj, ...newObj }
        });
        for (let index = 0; index < Object.keys(changeValue).length; index++) {
            const value = Object.keys(changeValue[index]).map((el) => { return el as string });
            if (!(changeValue[index][value[0] as keyof object] as boolean)) {
                allcheck = false;
                break;
            }
        }
        let obj2: { [key: string]: boolean } = {};
        obj2[dep] = allcheck ? true : false;
        setParentC((obj) => {
            return { ...obj, ...obj2 }
        });
    }

    return (
        <div>
            <Container>
                <DataTable/>
            </Container>
            <Container style={{ marginTop: "50px", textAlign: "center" }}>
                <Typography mb={3} variant="h4">Departments - Sub Departments</Typography>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                >
                    {deptData.map((element) => {
                        count = 0; // count for getting the values of child from the state created above
                        return (
                            <Fragment key={Math.random() * 1000}>
                                <ListItemButton key={element["department" as keyof object]}>
                                    <FormControlLabel control={<Checkbox checked={parentC[element["department" as keyof object]]} onChange={(e) => { handleParent(e, element["department" as keyof object]) }} />} label={element["department" as keyof object]} />
                                    {isOpen[element["department" as keyof object]] ? <RemoveCircleOutlineOutlinedIcon onClick={(e) => { handleClick(e, element["department" as keyof object]) }} /> : <AddCircleOutlineOutlinedIcon onClick={(e) => { handleClick(e, element["department" as keyof object]) }} />}
                                </ListItemButton>
                                <Collapse key={Math.random() * 1000} in={isOpen[element["department" as keyof object]]} timeout="auto" unmountOnExit>
                                    <List key={Math.random() * 10} component="div" sx={{ display: 'flex', flexDirection: 'column', ml: 3 }} disablePadding>
                                        {(element["sub_departments" as keyof object] as string[]).map((subElement) => {
                                            count++;
                                            return (
                                                <ListItemButton key={subElement} sx={{ pl: 4 }}>
                                                    <FormControlLabel control={<Checkbox checked={check[element["department" as keyof object]][count - 1 as keyof object][subElement as keyof object]} onChange={(e) => {
                                                        handleChild(e, subElement, element["department" as keyof object])
                                                    }} />} label={subElement} />
                                                </ListItemButton>
                                            );

                                        })}
                                    </List>
                                </Collapse>
                            </Fragment>
                        );
                    })}
                </List>
            </Container>
        </div>
    )
}
