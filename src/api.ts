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