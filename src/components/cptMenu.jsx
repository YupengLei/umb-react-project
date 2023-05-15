import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Tooltip
} from '@mui/material';
import PropTypes from 'prop-types';


function CptMenu(props) {

    //changes for dropdown menu 
    const handleChange = (event) => {
        let selectedArr = props.mainState.costs.filter(c => c.cptCodeId == event.target.value);
        let result = (selectedArr.reduce((next, number) => next + number.cost, 0) / selectedArr.length).toFixed(2);
        props.setMainState({
            ...props.mainState,
            selectedCode: event.target.value,
            average: result,
            formValues: {
                id: '',
                cptCodeId: '',
                cost: '',
                facilityType: '',
                copay: ''
            }   
        });
    }

    return (
        <FormControl minwidth='300px'>
            <InputLabel id="cpt-select-label">CPT</InputLabel>
            <Select
                labelId="cpt-select-label"
                id="cpt-select"
                value={props.mainState.selectedCode}
                label="Code"
                onChange={handleChange}
                autoWidth
                style={{ width: '500px' }}
            >
                {props.mainState.codes.length && props.mainState.codes.map(c =>
                    <MenuItem key={c.id} value={String(c.id)} sx={{ width: '500px' }}>
                        <Tooltip title={c.description}><span>{c.code}</span></Tooltip>
                    </MenuItem>
                )}
            </Select>
        </FormControl>
    )
}

CptMenu.propTypes = {
    mainState: PropTypes.shape({
        codes: PropTypes.array,
        costs: PropTypes.array,
        selectedCode: PropTypes.string,
        formValues: PropTypes.object
    }),
    setMainState: PropTypes.func
}

export default CptMenu;