import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../../config/clienteAxios'
import useAuth from '../hook/useAuth'

const Login = () => {

    const { setAuth } = useAuth();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({
        msg:'',
        error: false
    })

    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault();
        if([email, password].includes('')){
            setAlerta({
                msg: "Los campos son obligatorios",
                error: true
            })
            return
        }
        try {
            const {data} = await clienteAxios.post('/usuarios/login', {email, password})

            setAlerta({
                msg:'',
                error: false
            })
            localStorage.setItem('token', data.token)
            setAuth(data)
            navigate('/proyectos')
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
        

    }

  return (
    <>
        <h1 className='text-pink-600 font-white text-6xl capitalize font-bold'>
            Inicia sesión y administra tus 
                <span className='text-slate-700'> proyectos</span>
        </h1>
        {
            alerta.msg != ''
            ? <Alerta alerta={alerta}/>
            :null
        }
        <form 
            className='my-10 bg-white shadow rounded-lg px-10 py-5'
            onSubmit={handleSubmit}
        >
            <div className='my-5'>
                <label 
                    className='uppercase text-gray-600 block text-xl font-bold'
                    htmlFor='email'
                >Email</label>
                <input
                    id='email'
                    type='email'
                    placeholder='correo@correo.com'
                    className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                    value={email}
                    onChange={value => setEmail(value.target.value)}
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
                    placeholder='tu clave'
                    className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                    value={password}
                    onChange={value => setPassword(value.target.value)}
                />
            </div>
            <input
                type='submit'
                value="Iniciar sesión"
                className='bg-pink-600 w-full py-3 text-white uppercase font-bold rounded-lg hover:bg-pink-800 hover:cursor-pointer transition-colors mb-5'
            />
      </form>
      <nav className='lg:flex lg:justify-between'>
        <Link
            className='block text-center my-5 text-slate-500 uppercase text-sm'
            to={"/registrar"}
        >
            No tienes una cuenta? Regístrate
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

export default Login
