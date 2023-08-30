'use client'
import React from 'react'
import { Content } from '../signIn'
import Header from '@/components/Header'
import Title from '@/components/Title'
import {FiEdit2} from 'react-icons/fi'
import * as S from '../settings/styles'

import { useAuth } from '@/Contexts/auth'
import { addDoc, collection, getDocs, query, setDoc, where } from 'firebase/firestore'
import { db } from '@/service/firebaseConection'
import Link from 'next/link'

type CostumersProps = {
  name: any,
  id: string
}

const collectionRef = collection(db, 'costumers') 

const New = () => {
  const { user } = useAuth()
  const uid = user && user.uid

  const [costumers, setCostumers] = React.useState<CostumersProps[] | []>([])
  const [loadingCostumers, setLoadingCostumers] = React.useState(true)

  const [costumerSelected, setCostumerSelected] = React.useState(0)
  const [complement, setComplement] = React.useState('')
  const [status, setStatus] = React.useState('Aberto')
  const [subject, setSubject] = React.useState('Suporte')

  React.useEffect(() => {
    const loadCostumers = async () => {
      const q = query(collectionRef, where('userUid', '==', uid))
      await getDocs(q)
      .then((res) => {
        let lista = [] satisfies CostumersProps | []

        res.forEach(item => {

          return lista.push({
            name: item.data().name,
            id: item.id
          })

        })
        setCostumers(lista)
        setLoadingCostumers(false)
      })
    }

    loadCostumers()
  }, [uid])


  const handleChangeStatus = (e) => {
    setStatus(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    costumer: costumers[costumerSelected].name, 
      subject,
      status,
      complement
    
    const taskRef = collection(db, 'task')
    await addDoc(taskRef, {
      costumer: costumers[costumerSelected].name, 
      subject,
      status,
      complement,
      created: new Date(),
      clientId: costumers[costumerSelected].id,
      userUid: uid
    })
    .then(() => {
      setComplement('')
      setSubject('Suporte')
      setStatus('Aberto')
      setCostumerSelected(0)
      alert('Salvo com sucesso :3')
    })
  } 


  return (
    <>
      <Header />

      <Content >
        <Title title='Novo Chamado'>
          <FiEdit2 size={25}/>
        </Title>

        <S.Container>
          {costumers.length === 0 ? (
            <section className='newClientContainer'>
              <h2>Você não cadastrou nenhum client :(</h2>
              <Link className='newClientLink' href='/customers'>
                Cadastrar cliente
              </Link>
            </section>
          ) : (
            <S.Form onSubmit={handleSubmit}>
            <label>
              Nome da empressa
            </label>
            {loadingCostumers ? (
              <input type='text' value='Carregando nome das empresas' />
            ) : (
              <select 
                value={costumerSelected}
                onChange={(e) => setCostumerSelected(Number(e.target.value))}
              >
              {costumers.map((item, index) => (
                <option key={index} value={index}>
                  {item.name}
                </option>
              ))}
            </select>
            )}

            <label>Assunto</label>
            <select 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="Suporte">Suporte</option>
              <option value="Assitencia Tecnica">Assitencia Tecnica</option>
              <option value="Financeira">Financeira</option>
            </select>

            <label>Status</label>
            <div className='status-container'>
              <label>Aberto</label>
              <input 
                type='radio' 
                name='radio' 
                checked={status === 'Aberto'}
                value='Aberto'
                onClick={handleChangeStatus}
              />

              <label>Em andamento</label>
              <input 
                type='radio' 
                name='radio' 
                checked={status === 'Em andamento'}
                value='Em andamento'
                onClick={handleChangeStatus}
              />
              <label>Concluido</label>
              <input 
                type='radio' 
                name='radio' 
                checked={status === 'Concluido'}
                value='Concluido'
                onClick={handleChangeStatus}
              />            </div>

            <label>Complemento</label>
            <textarea 
              placeholder='Digite o complemento (opcional)'
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
            />

            <button type='submit'>Salvar</button>

          </S.Form>
          )}
        </S.Container>
      </Content>
    </>
  )
}

export default New
