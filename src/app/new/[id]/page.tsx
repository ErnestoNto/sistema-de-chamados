'use client'
import React from 'react'
import { Content } from '../../signIn'
import Header from '@/components/Header'
import Title from '@/components/Title'
import {FiEdit2} from 'react-icons/fi'
import * as S from '../../settings/styles'

import { useAuth } from '@/Contexts/auth'
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '@/service/firebaseConection'
import {useRouter} from 'next/navigation'

type CostumersProps = {
  name: any,
  id: string
}

const collectionRef = collection(db, 'costumers') 

const NewId = ({params}:  { params: { id: string } }) => {
  const { user } = useAuth()
  const uid = user && user.uid

  const paramsId = params.id
  const {push} = useRouter()

  const [costumers, setCostumers] = React.useState<CostumersProps[] | []>([])
  const [loadingCostumers, setLoadingCostumers] = React.useState(true)

  const [costumerSelected, setCostumerSelected] = React.useState(0)
  const [complement, setComplement] = React.useState('')
  const [status, setStatus] = React.useState('Aberto')
  const [subject, setSubject] = React.useState('Suporte')

  const loadId = React.useCallback(async function(lista: CostumersProps[]) {
    const docRef = doc(db, 'task', paramsId)
    
    await getDoc(docRef)
    .then(snapshot => {
        setStatus(snapshot.data()!.status)
        setComplement(snapshot.data()!.complement)
        setSubject(snapshot.data()!.subject)

        const index = lista.findIndex(item => item.id === snapshot.data()!.clientId)
        console.log(index);
        
        setCostumerSelected(index)
    })
  }, [paramsId])

  React.useEffect(() => {
    const loadCostumers = async () => {
      const q = query(collectionRef, where('userUid', '==', uid))
      await getDocs(q)
      .then((res) => {
        let lista = [] satisfies CostumersProps | []

        res.forEach(item => {
          const itemToAdd = {
            name: item.data().name,
            id: item.id
          } satisfies CostumersProps
  
          //@ts-ignore
          lista.push(itemToAdd)

        })
        setCostumers(lista)
        loadId(lista)
        setLoadingCostumers(false)
      })
    }

    loadCostumers()
  }, [uid, loadId])

  

  //@ts-ignore
  const handleChangeStatus = (e) => {
    setStatus(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // costumer: costumers[costumerSelected].name, 
    //   subject,
    //   status,
    //   complement
    
    const taskRef = doc(db, 'task', paramsId)
    await updateDoc(taskRef, {
      costumer: costumers[costumerSelected].name, 
      subject,
      status,
      complement,
    })
    .then(() => {
      setComplement('')
      setSubject('Suporte')
      setStatus('Aberto')
      setCostumerSelected(0)
      push('/dashboard')
    })
  } 

  return (
    <>
      <Header />

      <Content >
        <Title title='Atualizar Chamado'>
          <FiEdit2 size={25}/>
        </Title>

        <S.Container>
          <S.Form onSubmit={handleSubmit}>
            <label>
              Nome da empressa
            </label>
            {loadingCostumers ? (
              <select>
                <option disabled >Carregando nome das empresas</option>
              </select>
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
        </S.Container>
      </Content>
    </>
  )
}

export default NewId
