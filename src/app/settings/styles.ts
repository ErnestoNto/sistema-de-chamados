import {styled} from 'styled-components'

export const Container = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #d4d4d8;
    
    .photo-input{
        width: 280px;
        height: 280px;
        cursor: pointer;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        svg{
            position: absolute;
            opacity: .8;
            transition: all ease-in-out .3s;
            z-index: 99;

            &:hover{
                opacity: 1;
                transform: scale(1.2);
            }
        }    

        input{
            display: none;
        }

        img{
            width: 250px;
            height: 250px;
            border-radius: 50%;
            object-fit: cover;
        }
    }
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 12px 8px;

    label{
        font-size: 1.3rem;
    }

    input{
        font-size: 1.3rem;
        padding: 12px;
        max-width: 600px;
        outline: 0;
    }

    button{
        font-size: 1.3rem;
        padding: 12px;
        max-width: 600px;
        background-color: #6622cc;
        color: #fafafa;
        border: 0; 
        outline: 0;
        cursor: pointer;
        opacity: .8;
        transition: all ease-in-out .3s;

        &:hover{
            opacity: 1;
        }
    }

    select{
        width: 300px;
        padding: 8px 0;
        outline: none;
    }

    textarea{
        width: 400px;
        height: 300px;
        padding: .7rem;
        outline: 0;
        border-radius: 4px;
        resize: none;
    }

    .status-container{
        display: flex;
        align-items: center;

        input{
            width: 20px;
            height: 20px;
            margin-left: .3rem;
        }

        label{
            margin-left: .6rem;
            font-size: 1.1rem;
        }
    }
`

export const LogoutButton = styled.button`
    margin-left: 10px;
    padding: 10px 20px;
    font-size: 1.2rem;
    border: 2px solid #d4d4d8;
    cursor: pointer;
    background-color: transparent;
    transition: all ease-in-out .4s; 

    &:hover{
        transform: scale(1.05);
    }
`