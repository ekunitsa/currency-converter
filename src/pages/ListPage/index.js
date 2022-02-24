import {useState} from "react";
import Error from "../../components/Error";
import Form from "../../components/Form";
import ResultTable from "../../components/ResultTable";
import { useDispatch } from "react-redux";
import {save} from "../../store/formsSlice";
import Timer from "../../components/Timer";

function ListPage() {
  const [result, setResult] = useState({});
  const [timerStatus, setTimerStatus] = useState(false)

  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    const { text } = data;
    const regexp = new RegExp('^\\w{3}$', 'mi');

    if (regexp.test(text)) {
      fetch(`https://freecurrencyapi.net/api/v2/latest?apikey=${process.env.REACT_APP_API_FREECURRENCYAPI}&base_currency=${text}`)
        .then(res => res.json())
        .then(data => {

          if (data.too_many_requests) {
            throw data.too_many_requests
          } else {
            setResult(data.data);

            dispatch(save({
              id: 'tableForm',
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
    } else {
      setTimerStatus(false)
      setResult({error: 'Invalid data in input'})
    }
  }

  return (
    <>
      <Form btnText="Get list" label="Base currency code. Example: USD" onSubmit={handleSubmit} id="tableForm" />
      <Timer status={timerStatus}  />

      {result?.error ?
        <Error msg={result.error} /> :
        <ResultTable data={result} />
      }
    </>
  );
}

export default ListPage;