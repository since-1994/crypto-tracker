const URL = 'https://api.coinpaprika.com/v1';

export async function fetchCoins() {
    return (await (await fetch(`${URL}/coins`)).json()).slice(0, 100);
}

export async function fetchCoinInfo(coinId: string) {
    return (await (await fetch(`${URL}/coins/${coinId}`)).json());
}

export async function fetchCoinPrice(coinId: string) {
    return (await (await fetch(`${URL}/tickers/${coinId}`)).json());
}

export async function fetchCoinHistory(coinId: string) {
    const endDate = Math.floor(Date.now()/1000);
    const startDate = endDate - 60*60*24*7*3;

    console.log(`${URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`);

    return (await (await (await fetch(`${URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`)).json()));
}