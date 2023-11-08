import axios from "axios";
import { DEFAULT_API_URL } from "../contexts/AppContext";

const config = {
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
}

export default function getCryptoData(page) {
    return axios.get(DEFAULT_API_URL + "/coins/markets",{
        params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 100,
            page: page,
            sparkline: false,
        },
        config
    })
}
