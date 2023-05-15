import {
    Card,
    CardContent,
    Box
} from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function CptDisplay(props) {

    const [avgCost, setAvgCost] = useState(props.mainState.average);

    useEffect(() => {
        let selectedArr = props.mainState.costs.filter(c => c.cptCodeId == props.mainState.selectedCode);
        let result = (selectedArr.reduce((next, number) => next + number.cost, 0) / selectedArr.length).toFixed(2);
        setAvgCost(result);
    }, [props.mainState.costs, props.mainState.selectedCode])

    return (
        <Card sx={{ minWidth: 500 }}>
            <CardContent>
                <Box sx={{ color: 'text.secondary' }}>Average Costs</Box>
                <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
                    {avgCost}
                </Box>
            </CardContent>
        </Card>
    )
}

CptDisplay.propTypes = {
    mainState: PropTypes.shape({
        costs: PropTypes.array,
        selectedCode: PropTypes.string,
        formValues: PropTypes.object,
        average: PropTypes.string
    }),
    setMainState: PropTypes.func
}

export default CptDisplay;