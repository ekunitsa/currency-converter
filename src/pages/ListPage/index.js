import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { save } from '../../store/formsSlice';
import { errors } from '../../utils/errors'
import Error from '../../components/Error';
import Form from '../../components/Form';
import ResultTable from '../../components/ResultTable';
import Timer from '../../components/Timer';
import getCurrencyFromApi from '../../utils/fetchFromApi';

function ListPage() {
    const [result, setResult] = useState({});
    const [timerStatus, setTimerStatus] = useState(false)
    const dispatch = useDispatch();

    const handleSubmit = async (data) => {
        setTimerStatus(false);

        const text = data.text.toUpperCase();
        const regexp = new RegExp('^\\w{3}$', 'mi');

        if (!regexp.test(text)) {
            setResult({ error: errors.data });
        } else {
            const getDataFromApi = await getCurrencyFromApi(text);

            if (getDataFromApi.response === false) {
                if (getDataFromApi.status === 422) {
                    setResult({ error: errors.notFound });
                } else {
                    setResult({ error: errors.api });
                }

                return false;
            }

            setResult(getDataFromApi.data);

            dispatch(save({
                id: 'tableForm',
                text: text,
            }));

            setTimerStatus(true);
        }
    }

    return (
        <>
            <Form btnText="Get list" label="Base currency code. Example: USD" onSubmit={ handleSubmit } id="tableForm" />
            <Timer status={ timerStatus } />

            { result?.error ? <Error msg={ result.error } /> : <ResultTable data={ result } /> }
        </>
    );
}

export default ListPage;
