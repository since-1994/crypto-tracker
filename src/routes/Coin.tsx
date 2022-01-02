import * as React from 'react';
import styled from 'styled-components';
import { useParams, useLocation, Routes, Route, Link, useMatch } from 'react-router-dom'
import Chart from './Chart';
import Price from './Price';
import { NavLink } from 'react-router-dom';

const Container = styled.div`
    padding: 0 20px;
`;

const Header = styled.div`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.div`
    color: ${props => props.theme.accentColor};
    font-size: 45px;
`;

const Body = styled.div`
    max-width: 480px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    & > span{
        line-height: 1.3;
    }
`;

const InfoList = styled.ul`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #1d2021;
    border-radius: 15px;
    width: 100%;
    padding: 10px 20px;
`;

const InfoItem = styled.li`
    display: flex;
    gap: 10px;
    flex-direction: column;
    font-size: 12px;
    h1{
        letter-spacing:  -0.5px
    }
`;

const Tabs = styled.ul`
    display: flex;
`;

const Tab = styled.li<{isActive: boolean}>`
    flex-grow: 1;
    a{
        display: flex;
        justify-content: center;
        width: 100%;
        padding: 10px 0;
        &.active{
            color: ${props => props.theme.accentColor};
            border-bottom: 1px solid ${props => props.theme.accentColor}
        }
    }
`;

type RouteParams = {
    coinId: string;
}

interface RouteLocations {
    coinName?: string;
}

interface ITag{
    id: string;
    name: string;
    coin_counter: number;
    ico_counter: number;
}
interface IInfo{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    tags: ITag[];
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    links_extended: object;
    whitepaper: object;
    first_data_at: string;
    last_data_at: string;
}
interface IPriceInfo{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_15m: number;
            percent_change_30m: number;
            percent_change_1h: number;
            percent_change_6h: number;
            percent_change_12h: number;
            percent_change_24h: number;
            percent_change_7d: number;
            percent_change_30d: number;
            percent_change_1y: number;
            ath_price: number;
            ath_date: string;
            percent_from_price_ath: number;
        }
    };
}

const Coin = () => {
    const { coinId } = useParams<keyof RouteParams>();
    const priceMatch = useMatch('/:coinId/price');
    const chartMatch = useMatch('/:coinId/chart');
    const {
        state
    } = useLocation();

    const {coinName} = state as RouteLocations || {};

    const [info, setInfo] = React.useState<IInfo|undefined>();
    const [priceInfo, setPriceInfo] = React.useState<IPriceInfo|undefined>();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        (async() => {
            const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
            const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();

            setInfo(infoData);
            setPriceInfo(priceData);
            setLoading(false);
        })();
    }, []);

    return (
        <Container>
            <Header>
                <Title>코인 { coinName ? coinName : loading? 'loading...' : info?.name }</Title>
            </Header>
            {loading? 'loading...' : (
                <Body>
                    <InfoList>
                        <InfoItem>
                            <h1>
                                RANK: 
                            </h1>
                            {info?.rank}
                        </InfoItem>
                        <InfoItem>
                            <h1>
                                SYMBOL: 
                            </h1>
                            {info?.symbol}
                        </InfoItem>
                        <InfoItem>
                            <h1>
                                OPEN SOURCE: 
                            </h1>
                            {info?.open_source}
                        </InfoItem>
                    </InfoList>
                    <span>
                        {info?.description}
                    </span>
                    <InfoList>
                        <InfoItem>        
                            <h1>
                                TOTAL SUPPLY: 
                            </h1> 
                            {priceInfo?.total_supply}
                        </InfoItem>
                        <InfoItem>                            
                            <h1>
                                MAX SUPPLY: 
                            </h1> 
                            {priceInfo?.max_supply}
                        </InfoItem>
                    </InfoList>
                    <Tabs>
                        <Tab>
                            <NavLink to='chart' className={chartMatch? 'active' : ''}>chart</NavLink>
                        </Tab>
                        <Tab>
                            <NavLink to='price' className={priceMatch? 'active' : ''}>price</NavLink>
                        </Tab>
                    </Tabs>
                    <Routes>
                        <Route path='chart' element={<Chart />}></Route>
                        <Route path='price' element={<Price />}></Route>
                    </Routes>
                </Body>
            )}
        </Container>
    )
}

export default Coin;