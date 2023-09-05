'use client'
import logoBat from "../assets/Batman-Logo-1939.png";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import * as S from './signIn'
import { useAuth } from "@/Contexts/auth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export type ZodProps = z.infer<typeof schema>

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<ZodProps>({
    resolver: zodResolver(schema),
    mode: 'onBlur'
  })

  const auth = useAuth()

  const loading = auth && auth.loading  
  const signIn = auth && auth.signIn  

  return (
    <>
      <S.Container>
        <S.FormContainer>
          <div>
            <Image src={logoBat} alt="Logo" />
          </div>
          <S.Form onSubmit={handleSubmit(signIn!)}>
            <h2>Entrar</h2>
            <input 
              type="email" 
              placeholder='Digite seu email'
              className={errors.email?.message && 'error-border'}
              {...register('email')}
            />
            <input 
              type="password" 
              placeholder='Digite sua senha'
              className={errors.password?.message && 'error-border'}
              {...register('password')}
            />
            <button>
              {loading ? 'Carregando' : 'Acessar'}
            </button>
          </S.Form>

          <span>Não possui uma conta? <Link href='/register'>Cadastre-se</Link></span>
        </S.FormContainer>
      </S.Container>
    </>
  );
}
