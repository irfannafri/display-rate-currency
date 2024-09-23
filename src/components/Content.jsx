// Content.jsx
import { useState, useEffect } from 'react';

const Content = () => {
    const [rates, setRates] = useState([]);
    const apiKey = 'YOUR_API_KEY';

    
    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const response = await fetch(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}`);
                const data = await response.json();
                const exchangeRates = Object.entries(data.rates).filter(([currency]) => currency !== 'USD');
                setRates(exchangeRates);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchExchangeRates();
    }, []); 

    return (
        <div>
            <h2>Currency Exchange Rates</h2>
            <table>
                <thead>
                    <tr>
                        <th>Currency</th>
                        <th>We Buy</th>
                        <th>Exchange Rate</th>
                        <th>We Sell</th>
                    </tr>
                </thead>
                <tbody>
                    {rates.map(([currency, exchangeRate]) => {
                        const rate = parseFloat(exchangeRate);
                        const weBuyRate = (rate * 0.98).toFixed(4);  
                        const weSellRate = (rate * 1.02).toFixed(4);

                        return (
                            <tr key={currency}>
                                <td>{currency}</td>
                                <td>{weBuyRate}</td>
                                <td>{rate.toFixed(4)}</td>
                                <td>{weSellRate}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Content;
