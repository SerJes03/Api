import React, {useState, useEffect} from 'react'
import {getUsuarioPorId} from '../../services/usuarioServices'
import {getMarcaPorId} from '../../services/marcaService'
import { Link } from 'react-router-dom'



export const InventarioCard = (props) => {

    const {inventario} = props
    const [usuario, setUsuario] = useState([]);
    const [marca, setMarca] = useState([]);

    const listarUsuarios = async ()=>{
      try {
      
        const {data} = await getUsuarioPorId(inventario.usuario);
        console.log(data);
        setUsuario(data);
        
      } catch (error) {
        console.log(error);
        
      }
  
    }
    useEffect(()=>{
      listarUsuarios();
    },[])

    const listarMarcas = async ()=>{
      try {
      
        const {data} = await getMarcaPorId(inventario.marca);
        console.log(data);
        setMarca(data);
        
      } catch (error) {
        console.log(error);
        
      }
  
    }
  
    
    useEffect(()=>{
      listarMarcas();
    },[])
  
  
    
  return (
    <div className="col" >
                <div className="card">
                  <img src={inventario.foto_equipo} className="card-img-top" alt="Foto equipo" width="100px" height="150px"/>
                  <div className="card-body">
                    <h5 className="card-title">Características </h5>
                    <hr/>
                    <p className="card-text">{`Serial: ${inventario.serial}`}</p>
                    <p className="card-text">{`Modelo: ${inventario.modelo}`}</p>
                    <p className="card-text">{`Descripción: ${inventario.descripcion}`}</p>
                    <p className="card-text">{`Usuario: ${usuario.name}`}</p>
                    <p className="card-text">{`marca: ${marca.name}`}</p>
                    <p className="card-text">{`Fecha compra: ${inventario.fecha_compra}`}</p>
                    <p className="card-text">{`Fecha de creación: ${inventario.createdAt}`}</p>
                    <p className="card-text">{`Fecha de actualización: ${inventario.updatedAt}`}</p>
                     <Link to={`inventarios/edit/${inventario._id}`}> Editar</Link>
                     <br></br>
                     <Link to={`inventarios/delete/${inventario._id}`}> Borrar</Link>
                  </div>
                </div>
                

    </div>
  )
}
