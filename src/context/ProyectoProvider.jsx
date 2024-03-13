import { createContext, useEffect, useState } from "react";
import clienteAxios from "../../config/clienteAxios";
import { useNavigate } from 'react-router-dom'
import io from 'socket.io-client';
import useAuth from "../hook/useAuth";

const ProyectoContext = createContext()
let socket;

const ProyectoProvider = ({children}) => {

    const [proyectos, setProyectos] = useState([]);
    const [proyecto, setProyecto] = useState({});
    const [tarea, setTarea] = useState({});
    const [colaborador, setColaborador] = useState({});
    const [cargando, setCargando] = useState(false);
    const [alerta, setAlerta] = useState({
        msg:'',
        error: false
    })
    const [modal, setModal] = useState({
        formTarea: false,
        deleteTarea: false,
        deleteColaborador: false,
        search: false
    })

    const {auth} = useAuth()
    const navigate = useNavigate()

    const mostrarAlerta = alertaElem => {
        setAlerta(alertaElem)
        setTimeout(() => {
            setAlerta({
                msg:'',
                error: false
            })
        }, 5000);
    }

    const getConfig = () => {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        return config
    }

    const submitProyect = async(dataProyect) =>{
        try {
            const config = getConfig()
            if(dataProyect.id){
                const {data} = await clienteAxios.put(`/proyectos/${dataProyect.id}`, dataProyect, config)
                const updateProyectos = proyectos.map(proyecto => {
                    if(proyecto._id === data._id){
                        return data
                    }else{
                        return proyecto
                    }
                })
                setProyectos(updateProyectos)
                setAlerta({
                    msg:"Proyecto actualizadp con exito",
                    error: false
                })
            }else{
                const {data} = await clienteAxios.post('/proyectos', dataProyect, config)

                setProyectos([...proyectos, data])
                setAlerta({
                    msg:"Proyecto creado con exito",
                    error: false
                })
            }
           

            setTimeout(() => {
                setAlerta({
                    msg:'',
                    error: false
                })
                navigate('/proyectos')
            }, 3000)
            
        } catch (error) {
            console.log(error.response.data.msg)
        }
        //
    }

    const obtenerProyecto = async id => {
        setCargando(true)
        try {
            const config = getConfig()
            const {data} = await clienteAxios(`/proyectos/${id}`, config)
            setProyecto(data)
            setAlerta({
                msg:'',
                error: false
            })
        } catch (error) {
            navigate('/proyectos')
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlerta({
                    msg:'',
                    error: false
                })
            }, 3000)
        } finally{
            setCargando(false)
        }
    }
    
    const eliminarProyecto = async id => {
        try {
            const config = getConfig()
            const {data} = await clienteAxios.delete(`/proyectos/${id}`, config)
            const newList = proyectos.filter(proyecto => proyecto._id !== id)
            setProyectos(newList)
            setAlerta({
                msg:data.msg,
                error: false
            })

            setTimeout(() => {
                setAlerta({
                    msg:'',
                    error: false
                })
                navigate('/proyectos')
            }, 5000)

        } catch (error) {
            console.log(error.response.data.msg)
        } 
    }

    const handleModal = (type) => {
        setModal({...modal, [type]: !modal[type]})
        setTarea({})
        setColaborador({})
    }

    const submitTarea = async(dataTarea) =>{
        try {
            const config = getConfig()
            if(dataTarea.id){
                const {data} = await clienteAxios.put(`/tareas/${dataTarea.id}`, dataTarea, config)

                socket.emit('editar tarea', data)

            }else{
                const {data} = await clienteAxios.post('/tareas', dataTarea, config)

                socket.emit('nueva tarea', data)
            }
           
            setModal({...modal, formTarea: false})
            setAlerta({
                msg:'',
                error: false
            })
            setTarea({})
            
        } catch (error) {
            console.log(error.response.data.msg)
        }
        //
    }

    const loadContextTarea = (tarea, modalType) => {
        setTarea(tarea)
        setModal({...modal, [modalType]: true})
    }


    const eliminarTarea = async () => {
        try {
            const config = getConfig()
            const {data} = await clienteAxios.delete(`/tareas/${tarea._id}`, config)
            console.log('tarea eliminada: ',data)
            handleModal('deleteTarea')
            setAlerta({
                msg: data.msg,
                error: false
            })

            //socket io
            socket.emit('eliminar tarea', tarea)

            setTimeout(() => {
                setAlerta({
                    msg: '',
                    error: false
                })
            }, 3000);

        } catch (error) {
            console.log(error.response.data.msg)
        } 
    }

    const submitColaborador = async email => {
        setCargando(true)
        try {
            const config = getConfig()
            const {data} = await clienteAxios.post('/proyectos/colaboradores',{email}, config)

            setColaborador(data)
            // const addedColab = [...proyecto.colaboradores, data]
            // setProyecto({...proyecto, colaboradores: addedColab})
            
            setAlerta({
                msg:'',
                error: false
            })
            
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        } finally {
            setCargando(false)
        }
    }

    const addColaborador = async email => {
        setCargando(true)
        try {
            const config = getConfig()
            const {data} = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`,email, config)

            const addedColab = [...proyecto.colaboradores, data]
            setProyecto({...proyecto, colaboradores: addedColab})
            
            mostrarAlerta({
                msg:data.msg,
                error: false
            })
            setColaborador({})
            setTimeout(() => {
                setAlerta({
                    msg: '',
                    error: false
                })
                navigate(`/proyectos/${proyecto._id}`)
            }, 3000);
            
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        } finally {
            setCargando(false)
        }
    }

    const loadContextColaborador = (colaborador) => {
        setColaborador(colaborador)
        setModal({...modal, 'deleteColaborador': true})
    }

    const eliminarColaborador = async () => {
        try {
            const config = getConfig()
            const idValue = { id: colaborador._id}
            const {data} = await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto._id}`, idValue, config)
            const newList = proyecto.colaboradores.filter(user => user._id !== colaborador._id)
            setProyecto({...proyecto, colaboradores: newList})
            handleModal('deleteColaborador')
            setColaborador({})
            setAlerta({
                msg: data.msg,
                error: false
            })
            setTimeout(() => {
                setAlerta({
                    msg: '',
                    error: false
                })
            }, 3000);
        } catch (error) {
            console.log(error.response.data.msg)
        } 
    }

    const setStatusTarea = async(id) => {
        try {
            const config = getConfig()
            
            const {data} = await clienteAxios.put(`/tareas/actualizar/${id}`,{}, config)
            
            //socket.io
            socket.emit('cambiar estatus tarea', data)
            
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    const handleSearch = () => {
        setModal({...modal, search: !modal.search})
    }

    const cerrarSesionProy = () => {
        setProyecto({})
        setProyectos([])
        setAlerta({
            msg:'',
            error: false
        })
    }

    useEffect(() => {
        const obtenerProyectos =  async() => {
            try {
                const config = getConfig()
                const {data} = await clienteAxios('/proyectos', config)
                setProyectos(data)
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
        obtenerProyectos()
    },[auth])

    useEffect(()=> {
        socket = io(import.meta.env.VITE_BACKEND_URL)
    }, [])

    // socket io
    const submitTareasProyecto = (tarea) => {
        const addedTarea = [...proyecto.tareas, tarea]
        setProyecto({...proyecto, tareas: addedTarea})
    }

    const deleteTareasProyecto = (tarea) => {
        const newList = proyecto.tareas.filter(tareaItem => tareaItem._id !== tarea._id)
        setProyecto({...proyecto, tareas: newList})
    }

    const editTareasProyecto = (tareaEditada) => {
        const updateTareas = proyecto.tareas.map(tarea => {
            if(tarea._id === tareaEditada._id){
                return tareaEditada
            }else{
                return tarea
            }
        })
        setProyecto({...proyecto, tareas: updateTareas})
    }

    const cambiarStatusTarea = (tareaEditada) =>{
        // console.log('tarea: ',tareaEditada)
        const updateTareas = proyecto.tareas.map(tarea => {
            if(tarea._id === tareaEditada._id){
                return tareaEditada
            }else{
                return tarea
            }
        })
        setProyecto({...proyecto, tareas: updateTareas}) 
    }

    return (
            <ProyectoContext.Provider value={{
                proyectos,
                proyecto,
                alerta,
                cargando,
                modal,
                tarea,
                colaborador,
                mostrarAlerta,
                submitProyect,
                obtenerProyecto,
                eliminarProyecto,
                handleModal,
                submitTarea,
                loadContextTarea,
                eliminarTarea,
                submitColaborador,
                addColaborador,
                loadContextColaborador,
                eliminarColaborador,
                setStatusTarea,
                handleSearch,
                submitTareasProyecto,
                deleteTareasProyecto,
                editTareasProyecto,
                cambiarStatusTarea,
                cerrarSesionProy
            }}>
                {children}
            </ProyectoContext.Provider>
        )
}

export {
    ProyectoProvider,
}

export default ProyectoContext;
