import {styled} from 'styled-components'

export const Table = styled.table`
    width: 100%;
    height: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    padding: 12px 20px;
    background-color: #d4d4d8; 
    border: 1px solid #0f0f0f;
    
    .thead{
        th{
            border: 1px solid #0f0f0f;
            padding: 12px 20px;
            color: #0f0f0f;
            font-size: 1.5rem;
        }
    }
    
    td{
        padding: 12px 20px;
        border: 1px solid ;
        text-align: center;
    }

    .controls{
        display: flex;
        gap: 4px;

        button{
            padding: 4px;
            border: 0;
            border-radius: 4px;
            background-color: #ff0045;
            cursor: pointer;

            &:hover{
                opacity: .8;
            }
        }

        a{
            padding: 4px;
            border-radius: 4px;
            background-color: #6622cc;

            &:hover{
                opacity: .8;
            }
        }
    }

    

    @media screen and (max-width: 700px) {
        thead{
            display: none;
        }

        .tbody{
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .tbody:first-child{
            border-top: 2px solid #0f0f0f;
        }

        td{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        td::before{
            content: attr(data-label);
            color: #0f0f0f;
            font-size: 1.2rem;
            font-weight: 600;
        }
    }

`

export const ContainerNew = styled.section`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    background-color: #d4d4d8;
    padding: 10px;
    margin-bottom: 1rem;

    a{
        padding: 10px;
        text-decoration: none;
        border-radius: 4px;
        background-color: #33cc99;
        color: #fafafa;
        font-size: 1.5rem;

        &:hover{
            opacity: .8;
        }
    }
`