import {useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import io from 'socket.io-client';
import useProyect from '../hook/useProyect'
import useAdmin from '../hook/useAdmin'

import Spinner from '../components/Spinner'
import ModalFormularioTarea from '../components/ModalFormularioTarea'
import Tarea from '../components/Tarea'
import ModalEliminarTarea from '../components/ModalEliminarTarea'
import Alerta from '../components/Alerta'
import Colaborador from '../components/Colaborador'
import ModalEliminarColaborador from '../components/ModalEliminarColaborador'

let socket;

const Proyecto = () => {
    const {id} = useParams()
    const {
        obtenerProyecto, 
        proyecto, 
        cargando, 
        handleModal, 
        alerta, 
        submitTareasProyecto,
        deleteTareasProyecto,
        editTareasProyecto,
        cambiarStatusTarea
    } = useProyect()

    const isAdmin = useAdmin()

    const {nombre} = proyecto

    useEffect(()=> {
        obtenerProyecto(id)
    }, [])

    useEffect(()=> {
        socket = io(import.meta.env.VITE_BACKEND_URL)
        socket.emit('abrir proy', id)
    }, [])

    useEffect(()=> {
        socket.on('tarea agregada', (tareaNueva) => {
            if(tareaNueva.proyecto === proyecto._id){
                submitTareasProyecto(tareaNueva);
            }
        })

        socket.on('tarea eliminada', (tareaEliminada) => {
            if(tareaEliminada.proyecto === proyecto._id){
                deleteTareasProyecto(tareaEliminada);
            }
        })

        socket.on('tarea editada', (tareaEditada) => {
            if(tareaEditada.proyecto._id === proyecto._id){
                editTareasProyecto(tareaEditada);
            }
        })
        
        socket.on('estatus tarea editado', (tareaEditada) => {
            if(tareaEditada.proyecto._id === proyecto._id){
                cambiarStatusTarea(tareaEditada);
            }
        })
    })


  return (
    cargando 
        ?  <Spinner />
        :(
        <>
            <div className='flex justify-between'> 
                <h1 className="font-black text-4xl">{nombre}</h1>
                { isAdmin
                    ?(
                        <div className='flex items-center gap-2 text-gray-500 hover:text-black'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                                <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                            </svg>
                            <Link 
                                to={`/proyectos/editar/${id}`}
                                className='uppercase font-bold'
                            >Editar</Link>
                        </div>
                    )
                    :null
                }
            </div>
            { isAdmin
                ?(
                    <button 
                        type="button"
                        className="items-center justify-center flex gap-2 text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-pink-400 text-white text-center mt-5"
                        onClick={()=>handleModal('formTarea')}
                    >
                        Agregar Tarea
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                        </svg>
                    </button>
                )
                :null
            }
            
            <p className="font-bold text-xl mt-10">
                Tareas del proyecto
            </p>
            
            <div className="bg-white shadow mt-10 rounded-lg p-3">
                {
                    proyecto.tareas?.length 
                    ?(
                        proyecto.tareas?.map(tarea => (
                            <Tarea data={tarea} key={tarea._id}/>
                        ))
                    )
                    : <p className="text-center my-5 p-5">NO hay tareas en este proyecto</p>
                }
            </div>
            { isAdmin
                ?(
                    <>
                        <div className="flex items-center justify-between mt-10">
                            <p className="font-bold text-xl">
                                Colaboradores
                            </p>
                            <Link
                                to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
                                className='text-gray-500 hover:text-black uppercase font-bold'
                            >Añadir</Link>
                        </div>
                        
                        <div className="bg-white shadow mt-10 rounded-lg p-3">
                            {
                                proyecto.colaboradores?.length 
                                ?(
                                    proyecto.colaboradores?.map(user => (
                                        <Colaborador data={user} key={user._id}/>
                                    ))
                                )
                                : <p className="text-center my-5 p-5">NO hay colaboradores en este proyecto</p>
                            }
                        </div>
                    </>
                )
                :null
            }
            
            <ModalFormularioTarea />
            <ModalEliminarTarea />
            <ModalEliminarColaborador />
        </>
    )
    
  )
}

export default Proyecto
