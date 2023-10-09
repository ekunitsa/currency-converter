async function getCurrencyFromApi(baseCurrency) {
    const response = await fetch(`https://api.currencyapi.com/v3/latest?apikey=${process.env.REACT_APP_API_FREECURRENCYAPI}&base_currency=${baseCurrency}`);

    if (!response.ok) {
        return {
            response: false,
            status: response.status
        };
    }

    return await response.json();
}

export default getCurrencyFromApi;
