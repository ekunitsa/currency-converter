import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { save } from '../../store/formsSlice';
import { errors } from '../../utils/errors'
import Error from '../../components/Error';
import Form from '../../components/Form';
import ResultString from '../../components/ResultString';
import Timer from '../../components/Timer';
import getCurrencyFromApi from '../../utils/fetchFromApi';

function HomePage() {
    const [result, setResult] = useState({ value: '', currency: '' });
    const [timerStatus, setTimerStatus] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (data) => {
        setTimerStatus(false);

        const { text } = data;
        const regexp = new RegExp('^(-?\\d+[\\.,]\\d+|-?\\d+) (\\w{3}) in (\\w{3})$', 'mi');

        if (!regexp.test(text)) {
            setResult({ error: errors.data });
        } else {
            const matchInfo = text.toUpperCase().match(regexp);
            const info = {
                currencyValue: Number(matchInfo[1].replace(',', '.')),
                baseCurrency: matchInfo[2],
                currencyConvertTo: matchInfo[3],
            }

            if (info.baseCurrency === info.currencyConvertTo) {
                setResult({ error: errors.different });
            } else if (Number(info.currencyValue) <= 0) {
                setResult({ error: errors.minus });
            } else {
                const getDataFromApi = await getCurrencyFromApi(info.baseCurrency);

                if (getDataFromApi.response === false) {
                    if (getDataFromApi.status === 422) {
                        setResult({ error: errors.notFound });
                    } else {
                        setResult({ error: errors.api });
                    }

                    return false;
                }

                info.valueCurrencyConvertTo = getDataFromApi.data[info.currencyConvertTo]?.value;

                if (info.valueCurrencyConvertTo === undefined) {
                    setResult({ error: errors.notFound });
                } else {
                    setResult({
                        value: (info.currencyValue * info.valueCurrencyConvertTo).toFixed(4),
                        currency: info.currencyConvertTo,
                    });

                    dispatch(save({
                        id: 'stringForm',
                        text: text,
                    }));

                    setTimerStatus(true);
                }
            }
        }
    }

    return (
        <>
            <Form btnText="Convert!" label="Example: 100 USD in UAH" onSubmit={ handleSubmit } id="stringForm" />
            <Timer status={ timerStatus }  />

            { result?.error ? <Error msg={ result.error } /> : <ResultString number={ result.value } currency={ result.currency } /> }
        </>
    );
}

export default HomePage;
