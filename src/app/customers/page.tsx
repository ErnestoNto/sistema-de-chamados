"use client";
import React from "react";
import { Content } from "../signIn";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { FiUser } from "react-icons/fi";
import * as S from "../settings/styles";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/service/firebaseConection";
import { useAuth } from "@/Contexts/auth";

const Customers = () => {
  const [name, setName] = React.useState('')
  const [cnpj, setCnpj] = React.useState('')
  const [adress, setAdress] = React.useState('')

  const [loading, setLoading] = React.useState(false)

  const { user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    if(name !== '' && cnpj !== '' && adress !== ''){
      const collectionRef = collection(db, 'costumers')

      await addDoc(collectionRef, {
        userUid: user.uid,
        name,
        cnpj,
        adress
      })
      .then(() => {
        setName('')
        setCnpj('')
        setAdress('')
        alert('Salvo com sucesso :3')
        setLoading(false)
      })

    }else{
      alert('Preencha todos os campos')
    }

  }

  return (
    <>
      <Header />
      <Content>
        <Title title="Clientes">
          <FiUser size={25}/>
        </Title>
        <S.Container>
          <S.Form onSubmit={handleSubmit}>
            <label>
              Nome Fantasia:
            </label>
            <input 
              type='text'
              placeholder='Nome da empresa'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>
              CNPJ:
            </label>
            <input 
              type='text'
              placeholder='Seu CNPJ'
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
             />
            <label>
              Endereço:
            </label>
            <input 
              type='text'
              placeholder='Nome da empresa'
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
            />

            <button type='submit'>
              {loading ? ( 
              <>
                Carregando
                <span className='loader'></span>
              </>
              ) : 'Salvar'}
            </button>
          </S.Form>
        </S.Container>
      </Content>
    </>
  );
};

export default Customers;
