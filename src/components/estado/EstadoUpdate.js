import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {editarEstado, getEstadoPorId} from '../../services/estadoEquipoService'
import Swal from 'sweetalert2';


export const EstadoUpdate = () => {

    const [valoresForm, setValoresForm] = useState({});
    const {name ='', estado  = true} = valoresForm;
    const [estados, setEstados] = useState({});
    const { estadoId = '' } = useParams();
    console.log(estadoId)

    const getEstado = async () =>{
        try {
            const {data} = await getEstadoPorId(estadoId);
            setEstados(data);     
        } catch (error) {
            console.log(error)
        }

    }

    
    useEffect(() =>{
        getEstado();

    },[estadoId]);


    useEffect(() =>{
        if(estados){
            setValoresForm({
                name: estados.name,
                estado: estados.estado,
            }, [estados])
        }

    }, [estados]);

    const handleOnChange = ({target}) => {
        const {name, value} = target;
        setValoresForm({...valoresForm, [name]: value})
    }

    const handleOnSubmit = async (e) =>{
        e.preventDefault();
        const estados = {
            name, estado
        }

        console.log(estados)
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: '....Cargando'

            })
            Swal.showLoading();

            const {data} = await editarEstado(estadoId, estados);
            console.log(data)
            Swal.close();

            
        } catch (error) {
            console.log(error)
            console.log('Asegurrese de ingresar un nombre')
            Swal.close();
            
        }

    }

  return (
    <div className='container'>
        <div className="card card-body">
            <h5>Editar inventario</h5>
            <form onSubmit={(e) => handleOnSubmit(e)} id='formul'>
                <div className='row'>
                    <div className='col'>
                        <div className="mb-3">
                            <label  className="form-label">Nombre</label>
                            <input type="text" className="form-control" name='name' value={name}
                            onChange = {(e) =>handleOnChange(e)} required />
                        </div>

                    </div>

                    <div className='col'>
                        <div className="mb-3">
                            <label htmlFor="message-text" className="col-form-label">Estado:</label>
                            <select 
                                required
                                className="form-select" 
                                aria-label="Default select example"
                                value={estado}
                                onChange={(e) =>handleOnChange(e)}
                                name='estado'                         >
                                <option value={true}>Activo</option>
                                <option value={false}>Inactivo</option>
                                </select>
                                        
                                    
                        </div>

                    </div>

                </div>

                <button type="submit" className="btn btn-primary" 
                >Editar</button>
                
            </form>           
        </div>  
</div>
  )
}
