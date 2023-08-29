import {styled} from 'styled-components'
// import { FieldErrors } from 'react-hook-form'
// import { ZodProps } from '@/app/page'


// type FormProps = {
//     errors: FieldErrors<ZodProps>
// }

export const Container = styled.main`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #121212;
`

export const FormContainer = styled.section`
    width: 80%;
    max-width: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 8px;
    background-color: #fafafa;
    border-radius: 8px;
    box-shadow: 0 0 5px #ccc;

    div{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top-right-radius: 8px;
        border-top-left-radius: 8px;
        background-color: #6622CC;
    }

    img{
        width: 100px;
        height: 100px;
        padding: 10px;
    }

    span{
        margin-bottom: 8px;

        a{
            color: #000;
            text-decoration: none;

            &:hover{
                text-decoration: underline;
            }
        }
    }
`

export const Form = styled.form`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 8px;
    padding: 8px;

    h2{
        font-size: 2rem;
    }

    input{
        width: 100%;
        padding: 12px;
        font-size: 1.1rem;
        outline: 0; 
        border: 1px solid #ccc;
        border-radius: 4px;

        &.error-border{
            border-color: #ff0045;
        }
    }

    button{
        width: 100%;
        padding: 12px;
        font-size: 1.4rem;
        border: 1px solid transparent;
        border-radius: 4px;
        background-color: #3918a9;
        color: #fafafa;
        cursor: pointer;
        transition: all ease-in-out .3s;

        &:hover{
        background-color: #fafafa;
        color: #000;
        border-color: #3918a9;
        }
    }
`

export const Content = styled.main`
    margin-left: 200px;
    padding-top: 1rem;

    @media screen and (max-width: 700px) {
        margin-left: 0;
    }
`