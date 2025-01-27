import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Context } from "../store/appContext.js";


const AddContact = () => {

    const { store, actions } = useContext(Context)
    let navigate = useNavigate();
    const { id } = useParams(); 

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
  

    

    function saveContact(e) {
        e.preventDefault()
        if (name.trim() == "" || phone.trim() == "" || email.trim() == "" || address.trim() == "") {
            alert("Empty fields")
            return null
        }
        const payload = {
            name: name,
            phone: phone,
            email: email,
            address: address
        };
        if (!id) {
            actions.createContact(payload)
        } else {
            actions.editContact(id, payload)
        }
        alert("Se guardaron los datos del contacto");
        navigate("/");
        setName("");
        setPhone("");
        setEmail(""),
        setAddress("");

    }
//cargar contacto si hay uno creado para poder editarlo
    useEffect(() => {
        if (id && store.listContacts.length > 0) {
            const currentContact = store.listContacts.find(contact => contact.id == id)
            setName(currentContact.name)
            setPhone(currentContact.phone)
            setEmail(currentContact.email)
            setAddress(currentContact.address)
        }
    }, [id, store.listContacts])

    return (
            <div className="container">
                {/* si hay id pasará a editar contacto, mientras que si no hay se añadirá un nuevo contacto */}
                <h1 className="custom-heading">{!id ? "Crear nuevo contacto" : `Editar contacto ${name}`}</h1>

                <form className="container custom-form" onSubmit={saveContact}>


                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput1" className="form-label">Nombre y apellidos</label>
                        <input type="text" className="form-control" id="formGroupExampleInput1" placeholder="Introducir nombre y apellidos" onChange={(e) => setName(e.target.value)} value={name} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput2" className="form-label">Correo electrónico</label>
                        <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Introducir correo electrónico" onChange={(e) => setEmail(e.target.value)} value={email} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput3" className="form-label">Número de teléfono</label>
                        <input type="text" className="form-control" id="formGroupExampleInput3" placeholder="Introducir número de teléfono" onChange={(e) => setPhone(e.target.value)} value={phone} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput4" className="form-label">Dirección</label>
                        <input type="text" className="form-control" id="formGroupExampleInput4" placeholder="Introducir dirección" onChange={(e) => setAddress(e.target.value)} value={address} required />
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-light custom-border mt-3">Guardar</button>
                        <Link to="/">
                            <button type="button" className="btn btn-secondary custom-border mt-3 custom-font">Cancelar</button>
                        </Link>
                    </div>
                </form>
            </div>

    );


};
export default AddContact;