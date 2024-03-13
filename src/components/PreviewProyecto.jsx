import React from 'react'
import {Link} from 'react-router-dom'

import useAuth from '../hook/useAuth'

const PreviewProyecto = ({data}) => {
    const { nombre, _id, cliente, creador} = data
    const {auth} = useAuth()
    const myProyect = auth._id === creador
  return (
    <div className='border-b p-5 flex justify-between flex-col md:flex-row'>
      <div className="flex items-center gap-2 flex-col sm:flex-row">
        <p
          className='flex-1'
        >
          {nombre}
          <span className='text-sm  text-gray-500 uppercase'>{' '}{cliente}</span>
        </p>
        {
          myProyect
          ? <p className='text-xs p-2 rounded-lg text-white bg-pink-500 font-bold uppercase'>Propio</p>
          : <p className='text-xs p-2 rounded-lg text-white bg-green-500 font-bold uppercase'>Colaborador</p>
        }
      </div>
      
      <Link
        to={`${_id}`}
        className='text-sm text-gray-600  hover:text-gray-800 uppercase font-bold'
      >Ver proyecto</Link>
    </div>
  )
}

export default PreviewProyecto
