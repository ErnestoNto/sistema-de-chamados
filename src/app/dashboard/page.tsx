'use client'
import { useAuth } from '@/Contexts/auth'
import Header from '@/components/Header'
import React from 'react'
import { Content } from '../signIn'
import Title from '@/components/Title'
import * as S from './styles'

import {FiPhone, FiSearch, FiEdit, FiEdit2} from 'react-icons/fi'
import Link from 'next/link'
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { db } from '@/service/firebaseConection'
import { format } from 'date-fns'
import Modal from '@/components/Modal'

export type TaskProps = {
  created: Date
  createdFormat: string
  name: string
  status: string
  type: string
  complement: string
  id: string
}

const collectionRef = collection(db, 'task')

// complement
// : 
// {stringValue: 'Comer a CEO da empresa'}
// costumer
// : 
// {stringValue: 'SantosFarm'}
// created
// : 
// {timestampValue: '2023-08-28T21:56:56.082Z'}
// status
// : 
// {stringValue: 'Aberto'}
// subject
// : 
// {stringValue: 'Assitencia Tecnica'}
// userUid
// : 
// {stringValue: 'S3aly1MFggN7Dp7W2vGIssHsbiF2'}

const Dashboard = () => {
  const {user} = useAuth()
  const uid = user && user.uid

  const [tasks, setTasks] = React.useState<TaskProps[] | []>([]) 
  const [loading, setLoading] = React.useState(false) 

  const [isModalOpen, setIsModalOpen] = React.useState(false) 
  const [content, setContent] = React.useState({}) 


  React.useEffect(() => {
    const getTasks = async () => {
      setLoading(true)

      const q = query(collectionRef, orderBy('created', 'desc'), limit(5), where('userUid', '==', uid))

      await getDocs(q)
      .then((res) => {
        let data: TaskProps[] | [] = []

        res.forEach(item => (
          //@ts-ignore
          data.push({
            created: item.data().created,
            createdFormat: format(item.data().created.toDate(), 'dd/MM/yyyy'),
            name: item.data().costumer,
            status: item.data().status,
            type: item.data().subject,
            complement: item.data().complement,
            id: item.id
          })
        ))
        
        setTasks(data)
      setLoading(false)
      })
    }

    getTasks()
  }, [])

  const handleOpenModal = (data: TaskProps) => {
    setIsModalOpen(!isModalOpen)
    setContent(data)
  }

  return (
    <>
      <Header />
      <Content>
        <Title title='Chamados'>
          <FiPhone size={25} />
        </Title>

        {tasks.length === 0 ? (
          <>
            Nenhum chamado encontrado 

            <S.ContainerNew>
          <Link href='/new'>Novo chamado</Link>
        </S.ContainerNew>
          </>
        ) : (
          <>
            <S.ContainerNew>
          <Link href='/new'>Novo chamado</Link>
        </S.ContainerNew>

        <S.Table>
          <thead>
            <tr className='thead'>
              <th>Nome</th>
              <th>Status</th>
              <th>Tipo</th>
              <th>*</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <span>Carregando</span>
            ): (
              tasks.map((item, index) => (
                <tr key={index} className='tbody'>
                <td data-label='Nome'>{item.name}</td>
                <td data-label='Status'>{item.status}</td>
                <td data-label='Criado'>{item.createdFormat}</td>
                <td data-label='Tipo'>{item.type}</td>
                <td data-label='*'>
                  <div className='controls'>
                      <button 
                        onClick={() => handleOpenModal(item)}
                      >
                        <FiSearch size={20} color='#fafafa'/>
                      </button>
                    <Link href={`/new/${item.id}`}>
                      <FiEdit2 size={20} color='#fafafa'/>
                    </Link>
                  </div>
                </td>
              </tr>
              ))
            )}
          </tbody>
        </S.Table>
          </>
        )}

        {isModalOpen && <Modal content={content} handleClose={() => setIsModalOpen(!isModalOpen)} />}
      </Content>
    </>
  )
}

export default Dashboard
