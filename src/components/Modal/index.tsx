'use client'
import React from 'react'
import * as S from './styles'
import {FiX} from 'react-icons/fi'
import { TaskProps } from '@/app/dashboard/page'

type ModalProps = {
    handleClose: () => void
    content: TaskProps
}

const Modal = ({handleClose, content}: ModalProps) => {
  return (
    <S.Container>
      <section>
        <button>
            <FiX size={25} onClick={handleClose}/>
        </button>

        <main>
            <h2>Detalhes do chamado</h2>

            <div className='row'>
                <p>
                    Cliente: <span>{content.name}</span>
                </p>
            </div>
            <div className='row'>
                <p>
                    Assunto: <span>{content.type}</span>
                </p>
            </div>
            <div className='row'>
                <p>
                    Cadastrado em: <span>{content.createdFormat}</span>
                </p>
            </div>
            <div className='row'>
                <p>
                    Status: <span>{content.status}</span>
                </p>
            </div>

            {content.complement !== '' && (
                <>
                    <h3>Complemento</h3>
                    <p>
                        {content.complement}
                    </p>
                </>
            )}
        </main>
      </section>
    </S.Container>
  )
}

export default Modal
