import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { VisibilityOutlined, ArrowDropDown, ArrowDropUp, PushPin  } from '@mui/icons-material'; 
import { Link } from 'react-router-dom';
import { lightBlue } from '@mui/material/colors';

const CryptoTable = ({ cryptoData, selectedCoin, page, rowsPerPage, order,sortColumn, handleSorting, handlePin }) => {
	

	const DropDownIcon = () => {
		return (
			<ArrowDropDown className='sort-icon'/>
		)
	}

	const DropUpIcon = () => {
		return (
			<ArrowDropUp className='sort-icon'/>
		)
	}

	const _selectedClassName = (id) => {
		if (id) {
			const _selected =  selectedCoin.find(coin => coin.id === id)
			return _selected ? 'selected-pin' : 'unpin-coin'
		}
	}
	
	return (
		<div className='crypto-table-continer'>
			<h3>Crypo Currencies Lists in Markets</h3>
			<Table className='crypto-table'>
				<TableHead className='crypto-table-head'>
					<TableRow className='crypto-table-row'>
						<TableCell onClick={() => handleSorting("market_cap_rank")}># {sortColumn === "market_cap_rank" && order === "asc" ? <DropDownIcon/> : <DropUpIcon/>}</TableCell>
						<TableCell onClick={() => handleSorting("name")}>Name {sortColumn === "name" && order === "asc" ? <DropDownIcon/> : <DropUpIcon/>}</TableCell>
						<TableCell onClick={() => handleSorting("current_price")}>Price (USD) {sortColumn === "current_price" && order === "asc" ? <DropDownIcon/> : <DropUpIcon/>}</TableCell>
						<TableCell onClick={() => handleSorting("total_volume")}>Total Volume {sortColumn === "symbol" && order === "asc" ? <DropDownIcon/> : <DropUpIcon/>}</TableCell>
						<TableCell onClick={() => handleSorting("market_cap")}>Market Cap (USD) {sortColumn === "market_cap" && order === "asc" ? <DropDownIcon/> : <DropUpIcon/>}</TableCell>
						<TableCell onClick={() => handleSorting("fully_diluted_valuation")}>FDV {sortColumn === "fully_diluted_valuation" && order === "asc" ? <DropDownIcon/> : <DropUpIcon/>}</TableCell>
						<TableCell>Action</TableCell>
					</TableRow>
				</TableHead>
				<TableBody className='crypto-table-body'>
					{cryptoData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((crypto) => (
						<TableRow className='crypto-table-row' key={crypto.id}>
							<TableCell>{crypto.market_cap_rank}</TableCell>
							<TableCell>
								
								<div className='coin-title'>
									<img width={30} height={30} src={crypto.image} alt={crypto.name}/>
									<h5>{crypto.name}
										<span className='crypto-symbol'>{crypto.symbol}</span>
									</h5>
								</div>
							</TableCell>
							<TableCell>{currency.format(crypto.current_price)}</TableCell>
							<TableCell>{currency.format(crypto.total_volume)}</TableCell>
							<TableCell>{currency.format(crypto.market_cap)}</TableCell>
							<TableCell>{currency.format(crypto.fully_diluted_valuation)}</TableCell>
							<TableCell className='action-icon'>
								<Link to={`/crypto/${crypto.id}`}><VisibilityOutlined color={lightBlue[500]}/></Link>
								<span className={_selectedClassName(crypto.id)} onClick={() => handlePin(crypto.id)}><PushPin color={lightBlue[500]}/></span>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
		
	);
};

export default CryptoTable;

export const currency = Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD'
});