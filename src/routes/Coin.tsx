import * as React from 'react';
import { useParams } from 'react-router-dom'

type Params = {
    coinId: string;
}

const Coin = () => {
    const { coinId } = useParams<keyof Params>();

    console.log(coinId);

    return <>Coin</>
}

export default Coin;