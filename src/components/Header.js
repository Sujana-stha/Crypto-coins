import React from "react";

import { SearchOutlined } from "@mui/icons-material";
import { Paper, InputBase, IconButton } from "@mui/material";

import { Link } from "react-router-dom";

const Header = ({ searchQuery, handleSearch, addSearch }) => {
	return (

		<div className="header-container">
			<h1><Link to="/">Crypto Currencies</Link></h1>
			{addSearch === true &&
				<Paper className='search-box' component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
					<InputBase
						sx={{ ml: 1, flex: 1 }}
						placeholder="Search Crypto Currencies"
						inputProps={{ 'aria-label': 'search crypto currencies' }}
						value={searchQuery}
						onChange={(e) => handleSearch(e)}
					/>
					<IconButton type="button" sx={{ p: '10px' }} aria-label="search">
						<SearchOutlined />
					</IconButton>
				</Paper>
			}
		</div>


	)
}

export default Header;