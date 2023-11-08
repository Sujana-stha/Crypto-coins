import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../contexts/AppContext';
import CryptoTable from './CryptoTable';
import { Breadcrumbs, Button, Container, Grid, TablePagination, Typography } from '@mui/material';
import Spinner from '../Spinner';

import Header from '../Header';
import getCryptoData from '../../services/CryptoApi';


function CryptoLists() {
	const { loading, error, cryptoData, dispatch } = useContext(AppContext);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [filteredData, setFilteredData] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [order, setOrder] =  useState("asc");
	const [sortColumn, setSortColumn] =  useState("name");
	const [apiPage, setApiPage] = useState();

	useEffect(() => {
		if (cryptoData) {
			setFilteredData(cryptoData.data);
			setApiPage(cryptoData.config && cryptoData.config.params && cryptoData.config.params.page)
		}
		
		
	}, [cryptoData]);


	const handleChangePage = (event, newPage) => {
		
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const handleSearch = (e) => {
		const query =  e.target.value
		setSearchQuery(query);
	
		if(query.length >= 3) {
			const searchQuery = query.toLowerCase();
			const filtered = cryptoData.data.filter(crypto => crypto.name.toLowerCase().includes(searchQuery) || crypto.symbol.toLowerCase().includes(searchQuery));
			setFilteredData(filtered);
		} else {
			setFilteredData(cryptoData.data);
		}
		
	};

	const handleSortByColumn = (column) => {
		if(column) {
			const _order =  order === "asc" ? "desc" : "asc";
			setOrder(_order);
			setSortColumn(column);
			const sortedData = cryptoData.data.sort((a,b) => {
				if (column === "name") {
					return order === "asc" ? a[column].localeCompare(b[column]) : b[column].localeCompare(a[column]);
				} else if (column === 'market_cap_rank' || column === 'current_price' || column === 'market_cap') {
					return order === 'asc' ? a[column] - b[column] : b[column] - a[column];
				} else return 0;
			});

			console.log("sortedDAta", sortedData);
			if(sortedData) {
				setFilteredData(sortedData);
			}
		}
	}

	const handleNextApiPageLoad = (e) => {
		e.preventDefault();
		const _nextPage = apiPage && apiPage + 1;

		getCryptoData(_nextPage)
		.then(response => {
            dispatch({ type: 'FETCH_SUCCESS', payload: response });
        })
        .catch(error => {
            dispatch({ type: 'FETCH_FAILURE', payload: error });
        });
	}

	const handlePrevApiPageLoad = (e) => {
		e.preventDefault();

		const _nextPage = apiPage && apiPage > 1 ? apiPage - 1 : 1;

		getCryptoData(_nextPage)
		.then(response => {
            dispatch({ type: 'FETCH_SUCCESS', payload: response });
        })
        .catch(error => {
            dispatch({ type: 'FETCH_FAILURE', payload: error });
        });
	}
	
	if (loading) {
		return <div><Spinner/></div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}
	if (!filteredData || cryptoData.data === undefined) {
		return <div>Crypto Currencies lists does not exists!</div>
	}
	console.log("crypt", cryptoData);
	console.log("page", page);
	return (
		<div className='crypto-lists-container'>
			<Container>
				
				<Header
					addSearch = {true}
					searchQuery={searchQuery}
					handleSearch={(e) => handleSearch(e)}
				/>
				<Breadcrumbs className='page-breadcrumbs'>
					<Typography key="3" color="text.primary">Home</Typography>
					<Typography key="3" color="text.primary">Currencies</Typography>
				</Breadcrumbs>
				<Grid item xs={12}>
					<CryptoTable cryptoData={filteredData} 
						page={page}
						rowsPerPage={rowsPerPage}
						order = {order}
						handleSorting = {(column) => handleSortByColumn(column)}
						sortColumn = {sortColumn}
					/>
				</Grid>
				

				<div className='table-pagination'>
					<div className='prev-button'>
						{apiPage && apiPage > 1 && <Button variant="contained" size="small" onClick={(e) => handlePrevApiPageLoad(e)}>Prev Load</Button> }
					</div>
					
					
					<TablePagination
						className='content-pagination'
						rowsPerPageOptions={[10, 25, 50, 100]}
						component="div"
						count={filteredData.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
					<div className='next-button'>
						<Button variant="contained" size="small" onClick={(e) => handleNextApiPageLoad(e)}>Next Load</Button>
					</div>
					
				</div>
				

			</Container>
		</div>
	);
}

export default CryptoLists;