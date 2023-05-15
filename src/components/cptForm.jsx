import {
    Box,
    TextField,
    Button,
    Alert,
    Slide
} from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';

function CptForm(props) {

    //if form is submitted
    const [isSubmitted, setIsSubmitted] = useState(false);

    //changes for cost input
    const handleCostChange = (event) =>{
        props.setMainState({
            ...props.mainState,
            formValues: {
                ...props.mainState.formValues,
                id: props.mainState.costs.length + 1,
                cptCodeId: props.mainState.selectedCode,
                cost: +event.target.value
            }          
        });
        setIsSubmitted(false);
    }

    //changes for facility type input
    const handleFacilityChange = (event) =>{
        props.setMainState({
            ...props.mainState,
            formValues: {
                ...props.mainState.formValues,
                id: props.mainState.costs.length + 1,
                cptCodeId: props.mainState.selectedCode,
                facilityType: event.target.value
            }          
        });
        setIsSubmitted(false);
    }

    //changes for copay input
    const handleCopayChange = (event) =>{
        props.setMainState({
            ...props.mainState,
            formValues: {
                ...props.mainState.formValues,
                id: props.mainState.costs.length + 1,
                cptCodeId: props.mainState.selectedCode,
                copay: +event.target.value
            }          
        });
        setIsSubmitted(false);
    }

    //when submit button is clicked, post data to API server
    const handleSubmit = () => {
        fetch('http://localhost:3001/api/costs', {
            method: 'POST',
            body: JSON.stringify(props.mainState.formValues),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
        .then(() => {
            props.setMainState({
                ...props.mainState,
                costs: [...props.mainState.costs, props.mainState.formValues],
                formValues: {
                    id: '',
                    cptCodeId: '',
                    cost: '',
                    facilityType: '',
                    copay: ''
                }          
            });
            setIsSubmitted(true);
        })
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { mt: 2, width: '500px' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="outlined-number"
                label="Cost"
                type="number"
                value={props.mainState.formValues.cost}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={handleCostChange}
            />
            <TextField
                id="outlined-helperText"
                label="Facility Type"
                value={props.mainState.formValues.facilityType}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={handleFacilityChange}
            />
            <TextField
                id="outlined-number"
                label="Copay"
                type="number"
                value={props.mainState.formValues.copay}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={handleCopayChange}
            />
            <Button 
                onClick={handleSubmit}
                variant="contained"
                sx={{
                    mt: 2, width: '500px'
                }}
            >
                Add an entry to costs
            </Button>           
            <Slide direction='up' in={isSubmitted} >
                <Alert 
                    onClose={() => setIsSubmitted(false)}
                    sx={{ mt: 2 }}
                >
                    The entry was added to costs successfully.
                </Alert>
            </Slide>                
        </Box>
    )
}

CptForm.propTypes = {
    mainState: PropTypes.shape({
        codes: PropTypes.array,
        costs: PropTypes.array,
        selectedCode: PropTypes.string,
        formValues: PropTypes.object
    }),
    setMainState: PropTypes.func
}

export default CptForm;

