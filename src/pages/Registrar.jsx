import { useState } from 'react'
import {Link} from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../../config/clienteAxios'

const Registrar = () => {
    const [data, setData] = useState({
        email:'',
        nombre:'',
        password:''
    })
    const [clave2, setClave2] = useState('')
    const [alerta, setAlerta] = useState({
        msg:'',
        error: false
    })

    const handleSubmit = async  e => {
        e.preventDefault();
        if(Object.values(data).includes('') || clave2 === ''){
            setAlerta({
                error: true ,
                msg: "Todos los campos son obligatorios"
            })
            return
        }

        if(data.password != clave2){
            setAlerta({
                error: true ,
                msg: "Las claves no son iguales"
            })
            return
        }

        if(data.password.length <6 ){
            setAlerta({
                error: true ,
                msg: "La clave es muy corta, debe ser minimo de 6 caracteres"
            })
            return
        }

        setAlerta({
            msg:'',
            error:false
        })
        try {
            const {data: serverMsg} = await clienteAxios.post(`/usuarios`, data)
            setAlerta({msg:serverMsg?.msg})
            setData({
                email:'',
                nombre:'',
                password:''
            })
            setClave2('')
        } catch (error) {
            setAlerta({msg:error.response.data.msg, error: true})
        }
    };
  return (
    <>
        <h1 className='text-pink-600 font-white text-6xl capitalize font-bold'>
            Crea tu cuenta y administra tus 
                <span className='text-slate-700'> proyectos</span>
        </h1>
        {
            alerta?.msg != ''
            ? <Alerta alerta={alerta}/>
            : null
        }
        <form 
            onSubmit={handleSubmit}
            className='my-10 bg-white shadow rounded-lg px-10 py-5'
        >
            <div className='my-5'>
                <label 
                    className='uppercase text-gray-600 block text-xl font-bold'
                    htmlFor='name'
                >Nombre</label>
                <input
                    id='name'
                    type='text'
                    value={data.nombre}
                    onChange={e => setData({...data, nombre: e.target.value})}
                    placeholder='Tu nombre'
                    className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                />
            </div>
            <div className='my-5'>
                <label 
                    className='uppercase text-gray-600 block text-xl font-bold'
                    htmlFor='email'
                >Email</label>
                <input
                    id='email'
                    type='email'
                    value={data.email}
                    onChange={e => setData({...data, email: e.target.value})}
                    placeholder='correo@correo.com'
                    className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                />
            </div>
            <div className='my-5'>
                <label 
                    className='uppercase text-gray-600 block text-xl font-bold'
                    htmlFor='password'
                >Clave</label>
                <input
                    id='password'
                    type='password'
                    value={data.password}
                    onChange={e => setData({...data, password: e.target.value})}
                    placeholder='tu clave'
                    className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
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
                    value={clave2}
                    onChange={e => setClave2(e.target.value)}
                    placeholder='repetir tu clave'
                    className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                />
            </div>
            <input
                type='submit'
                value="Crear cuenta"
                className='bg-pink-600 w-full py-3 text-white uppercase font-bold rounded-lg hover:bg-pink-800 hover:cursor-pointer transition-colors mb-5'
            />
      </form>
      <nav className='lg:flex lg:justify-between'>
        <Link
            className='block text-center my-5 text-slate-500 uppercase text-sm'
            to={"/"}
        >
            Ya tienes una cuenta? Inicia Sesión
        </Link>
        <Link
            className='block text-center my-5 text-slate-500 uppercase text-sm'
            to={"/olvide-password"}
        >
            Olvidaste tu clave?
        </Link>
      </nav>
    </>
  )
}

export default Registrar
