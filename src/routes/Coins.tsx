import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Loading = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #c3c3c33f;
`;

const LoadingBullet = styled.div`
    width: 0.8rem;
    height: 0.8rem;
    margin: .3rem;
    border-radius: 50%;
    background-color: black;
`;

const Container = styled.div`
    padding: 0 20px;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
    display: flex;
    background-color: white;
    color: ${props => props.theme.bgColor};
    border-radius: 15px;
    max-width: 480px;
    margin: 0 auto 10px;
    a{
        display: flex;
        transition: color .2s ease-in;
        padding: 20px;
        align-items: center;
        gap: 5px;
    }
    &:hover{
        cursor: pointer;
        a{
            color: ${props => props.theme.accentColor}
        }
    }
    img{
        width: 45px;
        height: 45px;
    }
`;

const Title = styled.h1`
    font-size: 48px;

    color: ${props => props.theme.accentColor}
`;

interface CoinObject{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

/* const coins:CoinObject[] = [
    {
    "id": "btc-bitcoin",
    "name": "Bitcoin",
    "symbol": "BTC",
    "rank": 1,
    "is_new": false,
    "is_active": true,
    "type": "coin"
  },
  {
    "id": "eth-ethereum",
    "name": "Ethereum",
    "symbol": "ETH",
    "rank": 2,
    "is_new": false,
    "is_active": true,
    "type": "coin"
  },
  {
    "id": "bnb-binance-coin",
    "name": "Binance Coin",
    "symbol": "BNB",
    "rank": 3,
    "is_new": false,
    "is_active": true,
    "type": "coin"
  },
  {
    "id": "usdt-tether",
    "name": "Tether",
    "symbol": "USDT",
    "rank": 4,
    "is_new": false,
    "is_active": true,
    "type": "token"
  },
] */

const Coins = () => {
    const [coins, setCoins] = React.useState<CoinObject[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        (async() => {
            const response = await fetch('https://api.coinpaprika.com/v1/coins');
            const json:CoinObject[] = await response.json();
            setCoins(json.splice(0, 100));
            console.log(coins.length)
            setLoading(false);
        })()
    }, [])

    return  (
        <Container>
            {loading && (
                <Loading>
                    <LoadingBullet/>
                    <LoadingBullet/>
                    <LoadingBullet/>
                </Loading>
            )}
            <Header>
                <Title>코인</Title>
            </Header>
            <CoinsList>
                {coins.map(coin => {
                    return (
                        <Coin key={coin.id}>
                            <Link to={`/${coin.id}`} state={{coinName: coin.name}}>
                                <img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} alt="coin image"/>
                                {coin.name} &rarr;
                            </Link>
                        </Coin>
                    )
                })}
            </CoinsList>
        </Container>
    )
}

export default Coins;