import { styled } from "styled-components";
import cover from '../../assets/cover.png'

export const Container = styled.header`
  height: 100vh;
  width: 200px;
  background-color: #6622cc;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;

  div {
    width: 100%;
    height: 100px;
    background-image: url('../../assets/cover.png');
    background-color: #6622cc;
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  nav {
    width: 100%;
    height: calc(100% - 100px);
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    a {
      font-size: 1.2rem;
      color: #fafafa;
      padding: 8px;
      border-bottom: 2px solid transparent;
      text-decoration: none;
      transition: all ease-in-out .3s;

      &:hover {
        background-color: #3918a9;
      }
    }
  }

  @media screen and (max-width: 700px) {
    width: 100%;
    height: auto;
    position: relative;

    div {
      display: none;
    }

    nav {
      height: 100%;
      padding: 0 12px;
      padding-top: 0;
      flex-direction: row;
      display: flex;
      align-items: center;
    }
  }
`;
