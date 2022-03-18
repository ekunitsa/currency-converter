import {useState} from "react";
import Error from "../../components/Error";
import Form from "../../components/Form";
import ResultString from "../../components/ResultString";
import { useDispatch } from "react-redux";
import {save} from "../../store/formsSlice";
import Timer from "../../components/Timer";

function HomePage() {
  const [result, setResult] = useState({value: '', currency: ''});
  const [timerStatus, setTimerStatus] = useState(false)
  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    const { text } = data;
    const regexp = new RegExp('^(-?\\d+[\\.,]\\d+|-?\\d+) (\\w{3}) in (\\w{3})$', 'mi')

    if (regexp.test(text)) {
      const matchInfo = text.match(regexp);
      const currencyValue = Number(matchInfo[1].replace(',', '.'));
      const baseCurrency = matchInfo[2].toUpperCase();
      const currencyConvertTo = matchInfo[3].toUpperCase();

      if (baseCurrency === currencyConvertTo) {
        setTimerStatus(false)
        setResult({error: 'Set different currencies'})
      } else if (Number(currencyValue) <= 0) {
        setTimerStatus(false)
        setResult({error: 'The value can\'t be minus or zero'})
      } else {
        fetch(`https://api.currencyapi.com/v3/latest?apikey=${process.env.REACT_APP_API_FREECURRENCYAPI}&base_currency=${baseCurrency}`)
          .then(res => res.json())
          .then(data => {
            console.log(data.data.USD.value)
            if (data.too_many_requests) {
              throw data.too_many_requests
            }

            const valueConvertTo = data.data[currencyConvertTo].value

            if (valueConvertTo === undefined) {
              setTimerStatus(false)
              setResult({error: 'Can\'t find this currency'})
            } else {
              setResult({
                value: (currencyValue * valueConvertTo).toFixed(4),
                currency: currencyConvertTo
              })

              dispatch(save({
                id: 'stringForm',
                text: text
              }))

              // restart timer
              setTimerStatus(false) //off
              setTimerStatus(true) // on
            }
          })
          .catch((e) => {
            setTimerStatus(false)
            setResult({error: `Can't find this currency. Error: ${e}`})
          });
      }
    } else {
      setTimerStatus(false)
      setResult({error: 'Invalid data in input'})
    }
  }

  return (
    <>
      <Form btnText="Convert!" label="Example: 100 USD in UAH" onSubmit={handleSubmit} id="stringForm" />
      <Timer status={timerStatus}  />

      {result?.error ?
        <Error msg={result.error} /> :
        <ResultString number={result.value} currency={result.currency} />
      }
    </>
  );
}

export default HomePage;