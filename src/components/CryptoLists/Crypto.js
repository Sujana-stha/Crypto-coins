// CryptoDetailPage.js
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import { Container, LinearProgress, Paper, Tabs, Tab, Box, Breadcrumbs, Typography, Link, Grid } from '@mui/material';
import Header from '../Header';
import { currency } from './CryptoTable';

function CustomTabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					{children}
				</Box>
			)}
		</div>
	);
}

function ListItems(props) {
	const { title, price, value, children, className } = props;

	return (
		<div className={'list-items ' + (className ? className : "")}>
			<span className='title'>{title}</span>
			{value && <span className='price'>{value}</span>}
			{price && <span className='price'>{currency.format(price)}</span>}
			{children}
		</div>
	)
}

const CryptoDetailPage = () => {
	const [value, setValue] = useState(0)

	const { cryptoData } = useContext(AppContext);
	const { id } = useParams(); // Get the cryptocurrency ID from the URL

	const handleTabChange = (event, newValue) => {
		setValue(newValue);
	}

	const dateFormat = (date) => {
		const options = {
			month: "short",
			year: "numeric",
			day: "numeric"
		}
		const _date = new Date(date).toLocaleString("en-US", options);
		return _date;
	}
	const selectedCrypto = cryptoData && cryptoData.data && cryptoData.data.find((crypto) => crypto.id === id);

	if (!selectedCrypto) {
		return <div>Cryptocurrency not found.</div>;
	}

	return (
		<Container>
			<Header />
			<Breadcrumbs className='page-breadcrumbs'>
				<Link underline="hover" key="1" color="inherit" href="/">Currencies</Link>
				<Typography key="3" color="text.primary">
					{selectedCrypto.name}
				</Typography>,
			</Breadcrumbs>
			<div className='crypto-detail-page'>
				<Paper className='crypto-title'>
					<div className='header-title'>
						<img width={60} height={60} src={selectedCrypto.image} alt={selectedCrypto.name} />
						<div className='header-title-text'>
							<h3>{selectedCrypto.name}
								<span>{selectedCrypto.symbol.toUpperCase()}</span>
							</h3>
							<span className='rank-tag'>Rank #{selectedCrypto.market_cap_rank}</span>
						</div>
					</div>
					<div className='current-price'>
						<small>Current Price</small>
						<h2>{currency.format(selectedCrypto.current_price)}</h2>
					</div>
				</Paper>

				<Paper className='crypto-overview'>
					<div className='price-range-slider'>
						<h3>Price Range (24h)</h3>
						<LinearProgress className='price-progress' variant='determinate' value={((selectedCrypto.current_price - selectedCrypto.low_24h) / (selectedCrypto.high_24h - selectedCrypto.low_24h)) * 100} />
						<div className='price-low-high'>
							<div>{currency.format(selectedCrypto.low_24h)}</div>
							<div></div>
							<div>{currency.format(selectedCrypto.high_24h)}</div>
						</div>

					</div>
					<Tabs className='additional-info-tab' value={value} onChange={handleTabChange}>
						<Tab value={0} label="Overview"></Tab>
						<Tab value={1} label="Price Statistics"></Tab>

					</Tabs>
					<CustomTabPanel value={value} index={0}>
						<div className='overview-container'>
							<Grid item xs={12} className='overview-lists'>
								<ListItems title="Current Price (USD)" price={selectedCrypto.current_price}/>
								<ListItems title="Market Cap (USD)" price={selectedCrypto.market_cap}/>
								<ListItems title="24 Hour Trading Vol" price={selectedCrypto.current_price}/>
								<ListItems title="Fully Diluted Valuation" price={selectedCrypto.fully_diluted_valuation}/>
								
							</Grid>
							<Grid item xs={12} className='overview-lists'>
								<ListItems title="Circulation Supply (USD)" price={selectedCrypto.circulating_supply}/>
								<ListItems title="Total Supply (USD)" price={selectedCrypto.total_supply}/>
								<ListItems title="Maximum supply (USD)" price={selectedCrypto.max_supply}/>

							</Grid>
						</div>
						

					</CustomTabPanel>

					<CustomTabPanel value={value} index={1}>
						<div className='statitics-container'>
							<h2>{selectedCrypto.symbol.toUpperCase()} Price Statistics</h2>
							<div className='statistics-data-lists'>
								<div className='stats-data'>
									
									<ListItems title={`${selectedCrypto.name} price`} price={selectedCrypto.current_price}/>
									<ListItems title="High 24H" price={selectedCrypto.high_24h}/>
									<ListItems title="Low 24H" price={selectedCrypto.low_24h}/>
									<ListItems title="Trading volume" price={selectedCrypto.total_volume}/>
									<ListItems title="Price Change (24h)" price={selectedCrypto.price_change_24h}/>
									<ListItems title="Price Change percentage (24h)" value={`${selectedCrypto.price_change_percentage_24h}%`}/>
									<ListItems title="Last updated" value={dateFormat(selectedCrypto.last_updated)}></ListItems>

								</div>
								<div className='stats-data'>
									<ListItems title="Market cap rank" value={`# ${selectedCrypto.market_cap_rank}`}/>
									<ListItems title="Market cap" price={selectedCrypto.market_cap}/>
									<ListItems title="Market cap change (24h)" price={selectedCrypto.market_cap_change_24h}/>
									<ListItems title="Market cap percentage" value={`${selectedCrypto.market_cap_change_percentage_24h}%`}/>
									<ListItems className="larger-items" title="All-time High" >
										<span className='price'>
											{currency.format(selectedCrypto.ath)}
											<small>{dateFormat(selectedCrypto.ath_date)}</small>
										</span>
									</ListItems>
									<ListItems title="All-time high change percentage" value={`${selectedCrypto.ath_change_percentage}%`}/>
									<ListItems className="larger-items" title="All-time Low" >
										<span className='price'>
											{currency.format(selectedCrypto.atl)}
											<small>{dateFormat(selectedCrypto.atl_date)}</small>
										</span>
									</ListItems>
									<ListItems title="All-time high change percentage" value={`${selectedCrypto.atl_change_percentage}%`}/>
								</div>
							</div>
							
						</div>
					</CustomTabPanel>
				</Paper>

			</div>

		</Container>
	);
};

export default CryptoDetailPage;

