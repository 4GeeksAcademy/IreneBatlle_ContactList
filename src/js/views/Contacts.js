import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from 'react-router-dom'
import { Context } from "../store/appContext.js";
import CardContact from "../component/CardContact.js";
import "../../styles/index.css"; 

const Contacts = () => {

    const { store, actions } = useContext(Context)
    console.log(store.listContacts)

    // useEffect(() => {
        
    // }, [])

    return (

<div className="mx-auto text-center">
    <div className="d-flex flex-column align-items-center">
        <Link to="/AddContact">
        <button className="btn mt-3 custom-border">Añadir contacto</button>
        </Link>
    </div>
    <ul className="list-group mt-3">
        {store.listContacts && store.listContacts.length > 0 && store.listContacts.map((contact, index) => {
            return (
                <CardContact contact={contact} key={index} />
            );
        })}
    </ul>
</div>
    )
};
export default Contacts;