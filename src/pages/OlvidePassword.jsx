import { useState } from 'react'
import {Link} from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../../config/clienteAxios'

const OlvidePassword = () => {

  const [email, setEmail] = useState('')
  const [alerta, setAlerta] =useState({
    msg:'',
    error: false
  })

  const handleSubmit = async e => {
    e.preventDefault()

    if(e === ''){
      setAlerta({
        msg:'El email es obligatorio',
        error: true
      })
      return
    }

    try {
      const {data} = await clienteAxios.post(`/usuarios/change-password`, {email})
      setAlerta({msg:data.msg})
      setEmail('')
    } catch (error) {
      setAlerta({msg:error.response.data.msg, error:true})
    }
  }

  return (
    <>
      <h1 className='text-pink-600 font-white text-6xl capitalize font-bold'>
        Recupera tu acceso y no pierdas tus 
            <span className='text-slate-700'> proyectos</span>
      </h1>
      {
        alerta.msg != ''
        ?<Alerta alerta={alerta}/>
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
                    onChange={e =>setEmail(e.target.value)}
                />
            </div>
            
            <input
                type='submit'
                value="Enviar instrucciones"
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
            to={"/registrar"}
        >
            No tienes una cuenta? Regístrate
        </Link>
      </nav>
    </>
  )
}

export default OlvidePassword
