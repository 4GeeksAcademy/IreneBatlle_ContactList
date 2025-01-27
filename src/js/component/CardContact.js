import React from "react";
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/index.css";
import { Context } from '../store/appContext';

export const CardContact = ({ contact }) => {
    const { store, actions } = useContext(Context);

    const deleteContact = () => {
        const isConfirmed = window.confirm(`¿Estás seguro de que quieres borrar el contacto de ${contact.name}?`);
        if (isConfirmed) {
            console.log(contact);
            actions.deleteContact(contact.id);
        }
    };

    return (
        <div id="cardContact">
            <div id="left">
                <div id="imageContainer">
                    <img src="https://picsum.photos/100/100" alt={contact.name} id="profileImage" />
                </div>
                <div id="name">{contact.name}</div>
            </div>
            <div id="middle">
                <div id="phone">{contact.phone}</div>
                <div id="email">{contact.email}</div>
                <div id="address">{contact.address}</div>
            </div>
            <div id="right">
                <div>
                    <Link to={`/editarContacto/${contact.id}`}>
                        <button id="editButton">
                            <i className="fa-solid fa-pencil"></i>
                        </button>
                    </Link>
                </div>

                <button id="deleteButton" onClick={deleteContact}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    );
};
