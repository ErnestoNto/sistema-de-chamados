import {styled} from 'styled-components'

export const Container = styled.main`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, .8);

    section{
        position: relative;
        width: 400px;
        height: 400px;
        background-color: #fafafa;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px 20px;

        h2{
            margin-bottom: 1rem;
            width: 100%;
            text-align: center;
        }

        h3{
            margin-bottom: 1rem;
            width: 100%;
            text-align: center;
        }

        button{
            position: absolute;
            top: 10px;
            left: 10px;
            border: 0;
            background-color: transparent;
            cursor: pointer;
        }

        .row{
            margin-bottom: 1rem;
            font-size: 1.1rem;

            span{
                text-transform: italic;
            }
        }
    }
`