import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Alerta from './Alerta'
import useProyect from '../hook/useProyect'

const FormProyecto = () => {
    const [data, setData] = useState({
        nombre: '',
        descripcion: '',
        fechaEntrega: '',
        cliente: '',
        id: null
    })

    const {mostrarAlerta, alerta, submitProyect, proyecto} = useProyect()

    const params = useParams()
    
    const handleSubmit = async e => {
        e.preventDefault()
        if(Object.values(data).includes('')){
            mostrarAlerta({
                msg: "Todos los camposson obligatorios",
                error: true
            })
            return
        }
        await submitProyect(data)
        setData({
            nombre: '',
            descripcion: '',
            fechaEntrega: '',
            cliente: '',
            id: null
        })
    }

    useEffect(()=>{
        if(params.id){
            setData({
                nombre: proyecto.nombre,
                descripcion: proyecto.descripcion,
                fechaEntrega: proyecto.fechaEntrega?.split('T')[0],
                cliente: proyecto.cliente,
                id:proyecto._id
            })
        }
    }, [params])

    return (
        <div className='flex-col w-full'>
            {
                alerta.msg != ''
                ? <div className='xl:w-1/2 lg:w-full'>
                    <Alerta alerta={alerta}/>
                </div>
                :null
            }
            
            <form 
                className='bg-white py-10 px-5 xl:w-1/2 rounded-lg shadow lg:w-full'
                onSubmit={handleSubmit}
            >
                <div className='mb-5'>
                    <label 
                        htmlFor="nombre" 
                        className='text-gray-700 uppercase font-bold text-sm'
                    >
                        Nombre proyecto
                    </label>
                    <input 
                        type="text" 
                        id='nombre' 
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        placeholder='nombre proyecto'
                        value={data.nombre}
                        onChange={e => setData({...data, nombre: e.target.value})}
                    />
                </div>
                <div className='mb-5'>
                    <label 
                        htmlFor="descripcion" 
                        className='text-gray-700 uppercase font-bold text-sm'
                    >
                        Descripción
                    </label>
                    <textarea 
                        id='descripcion' 
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        placeholder='descripcion del proyecto'
                        value={data.descripcion}
                        onChange={e => setData({...data, descripcion: e.target.value})}
                    />
                </div>
                <div className='mb-5'>
                    <label 
                        htmlFor="fecha-entrega" 
                        className='text-gray-700 uppercase font-bold text-sm'
                    >
                        Fecha de entrega
                    </label>
                    <input 
                        type="date" 
                        id='fecha-entrega' 
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        value={data.fechaEntrega}
                        onChange={e => setData({...data, fechaEntrega: e.target.value})}
                    />
                </div>
                <div className='mb-5'>
                    <label 
                        htmlFor="cliente" 
                        className='text-gray-700 uppercase font-bold text-sm'
                    >
                        Nombre del cliente
                    </label>
                    <input 
                        type="text" 
                        id='cliente' 
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        placeholder='nombre del cliente'
                        value={data.cliente}
                        onChange={e => setData({...data, cliente: e.target.value})}
                    />
                </div>
                <input 
                    type='submit'
                    className='rounded cursor-pointer bg-pink-600 w-full p-3 uppercase font-bold text-white hover:bg-pink-800 transition-colors'
                    value={data.id ? "Actualizar Proyecto" : "Crear Proyecto"}
                />
            </form>
        </div>
  )
}

export default FormProyecto
