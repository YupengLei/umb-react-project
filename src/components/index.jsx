import { useEffect, useState } from 'react';
import { Box, Stack } from '@mui/material';
import CptMenu from './cptMenu';
import CptDisplay from './cptDisplay';
import CptForm from './cptForm';

function Cpt() {

    //intialize state in object
    const [mainState, setMainState] = useState({
        codes: [],
        costs: [],
        selectedCode: '',
        average: '',
        formValues: {
            id: '',
            cptCodeId: '',
            cost: '',
            facilityType: '',
            copay: ''
        }
    })



    //fetch data from API
    useEffect(() => {
        Promise.all([
            fetch('http://localhost:3001/api/cptCodes'),
            fetch('http://localhost:3001/api/costs'),
        ])
            .then(([resCodes, resCosts]) =>
                Promise.all([resCodes.json(), resCosts.json()])
            )
            .then(([dataCodes, dataCosts]) => {
                setMainState(mainState => ({
                    ...mainState,
                    codes: dataCodes,
                    costs: dataCosts
                }))
            })
    }, []);

    return (
        <Box sx={{ width: 500 }}>
            <CptMenu
                mainState={mainState}
                setMainState={setMainState}
            />
            {mainState.selectedCode &&
                <Stack spacing={2} >
                    <CptDisplay
                        mainState={mainState}
                        setMainState={setMainState}
                    />
                    <CptForm
                        mainState={mainState}
                        setMainState={setMainState}
                    />
                </Stack>
            }
        </Box>
    );
}

export default Cpt;

