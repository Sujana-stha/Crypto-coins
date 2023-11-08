import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppProvider } from "./contexts/AppContext";
import CryptoLists from "./components/CryptoLists/CryptoList";
import CryptoDetailPage from "./components/CryptoLists/Crypto";

import "./styles/main.scss";

function App() {
	return (
		<AppProvider>
			<BrowserRouter>
				<div>
					<Routes>
						<Route exact path='/' Component={CryptoLists}/>
						<Route path="/crypto/:id" Component={CryptoDetailPage} />
					</Routes>
				</div>
			</BrowserRouter>
		</AppProvider>
 	);
}

export default App;
