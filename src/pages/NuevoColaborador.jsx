import React, { useEffect } from 'react'
import FormularioColaborador from '../components/FormularioColaborador'
import useProyect from '../hook/useProyect'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import Alerta from '../components/Alerta'

const NuevoColaborador = () => {
    const {obtenerProyecto, proyecto, cargando, colaborador, addColaborador, alerta} = useProyect()

    const {id} = useParams()

    useEffect(()=> {
        obtenerProyecto(id)
    }, [])

    if (!proyecto?._id) return <Alerta alerta={alerta}/>
  return (
    <>
        <h1 className="text-4xl font-black">Añadir Colaborador al Proyecto: {proyecto.nombre}</h1>
        <div className="mt-10 flex justify-center ">
            <FormularioColaborador />
        </div>
        {
            cargando
            ? <Spinner />
            : colaborador._id
                ? (
                    <div className="flex justify-center mt-10">
                        <div className="bg-white py-10 px-5 rounded-lg shadow w-full lg:w-1/2">
                            <h2 className="text-center mb-10 text-2xl font-bold">
                                Resultado:
                            </h2>
                            <div className="flex justify-between items-center">
                                <p>{colaborador.nombre}</p>
                                <button 
                                    type='button'
                                    className='bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm'
                                    onClick={() => addColaborador({email: colaborador.email})}
                                >
                                    Agregar al proyecto
                                </button>
                            </div>
                        </div>
                    </div>
                )
                : null
        }
    </>
  )
}

export default NuevoColaborador
