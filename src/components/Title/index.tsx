import React from 'react'
import * as S from './styles'

type TitleProps = {
    children: React.ReactNode
    title: string
}

const Title = ({children, title}: TitleProps) => {
  return (
    <S.Container>
      {children}
      {title}
    </S.Container>
  )
}

export default Title
