import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../styles/index.css";



// import Home from "./views/Home.jsx";
import Contacts from "./views/Contacts.js";
import AddContact from "./views/AddContact.js";
import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar.js";


//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<Navbar/>
				<Routes>
					{/* <Route path="/" element={<Home />} /> */}
					<Route path="/" element={<Contacts />} />
					<Route path="/crearContacto" element={<AddContact />} />
					<Route path="/editarContacto/:id" element={<AddContact />} />
					<Route
						path="*"
						element={<div className="page-not-found">
								<h1>Ups! No se ha podido encontrar la página!</h1>
								</div>}/>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);