import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../../config/clienteAxios'

const NuevoPassword = () => {

    const {token} = useParams()

    const [clave, setClave] = useState('')
    const [clave2, setClave2] = useState('')
    const [alerta, setAlerta] = useState({
        msg:'',
        error: false
    })

    const [showForm, setShowForm] = useState(false)
    const [cambioListo, setCambioListo] = useState(false)


    const handlerSubmit = async e => {
        e.preventDefault()

        if(clave != clave2){
            setAlerta({
                msg: "Las claves deben ser iguales",
                error: true
            })
            return
        }
        if(clave.length < 6){
            setAlerta({
                msg: "La nueva clave debe tener mnínimo 6 caracteres",
                error: true
            })
            return
        }
        try {
            const {data} = await clienteAxios.post(`/usuarios/change-password/${token}`, {password: clave})
            setAlerta({
                msg: data.msg,
                error: false
            })
            setCambioListo(true)
            setShowForm(false)
            setClave('')
            setClave2('')
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    useEffect(()=>{
        const confirmarToken = async() => {
            try {
                await clienteAxios(`/usuarios/change-password/${token}`)
                setShowForm(true)
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }
        confirmarToken()
    }, [])

  return (
    <>
        
        <h1 className='text-pink-600 font-white text-6xl capitalize font-bold'>
            Restablece tu clave y no pierdasa acceso a tus
            <span className='text-slate-700'> proyectos</span>
        </h1>
        {
            alerta.msg != ''
            ? <Alerta alerta={alerta} />
            : null
        }
        {
            showForm
            ? <form 
                className='my-10 bg-white shadow rounded-lg px-10 py-5'
                onSubmit={handlerSubmit}
            >
                <div className='my-5'>
                    <label 
                        className='uppercase text-gray-600 block text-xl font-bold'
                        htmlFor='password'
                    >Nueva Clave</label>
                    <input
                        id='password'
                        type='password'
                        placeholder='tu nueva clave'
                        className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                        value={clave}
                        onChange={value => setClave(value.target.value)}
                    />
                </div>
                <div className='my-5'>
                    <label 
                        className='uppercase text-gray-600 block text-xl font-bold'
                        htmlFor='password2'
                    >Repetir Clave</label>
                    <input
                        id='password2'
                        type='password'
                        placeholder='repetir tu clave'
                        className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                        value={clave2}
                        onChange={value => setClave2(value.target.value)}
                    />
                </div>
                <input
                    type='submit'
                    value="Guardas nueva clave"
                    className='bg-pink-600 w-full py-3 text-white uppercase font-bold rounded-lg hover:bg-pink-800 hover:cursor-pointer transition-colors mb-5'
                />
            </form> 
            :null
        }
        {
            cambioListo === true
            ? <div className='mt-15 md:mt-5 shadow-lg p-5 rounded-xl bg-white'>
                <Link
                    className='block text-center my-5 text-slate-500 uppercase text-md font-bold uppercase'
                    to={"/"}
                >
                    Inicia Sesión
                </Link>
            </div>
            : null
        }
    </>
  )
}

export default NuevoPassword
