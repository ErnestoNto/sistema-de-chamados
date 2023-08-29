"use client";
import React from "react";
import { Content } from "../signIn";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { FiSettings, FiUpload } from "react-icons/fi";
import * as S from "./styles";

import avatar from "../../assets/avatar.png";
import Image from "next/image";
import { ContextProps, UserProps, useAuth } from "@/Contexts/auth";

import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../service/firebaseConection";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Settings = () => {
  const { user, loadingUser, logout, storageUser, updateUser } = useAuth();

  const [avatarUrl, setAvatarUrl] = React.useState<null | string>(user && user.avatarUrl)
  const [avatarImg, setAvatarImg] = React.useState<File | null>(null)

  const [name, setName] = React.useState<string>(user && user.name);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files![0];

    if (image.type === "image/png" || image.type === "image/jpg") {
      setAvatarUrl(URL.createObjectURL(image));
      setAvatarImg(image);
    } else {
      alert("Coloque uma imagem do tipo png ou jpg");
    }

    console.log(image);
  };

  const handleUpdatePhoto = async () => {
    const storageRef = ref(storage, `image/${user.uid}/${avatarImg!.name}`);

    await uploadBytes(storageRef, avatarImg!)
    .then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (dowloadUrl) => {

        const docRef = doc(db, "users", user.uid);

        await updateDoc(docRef, {
          name: name,
          avatarUrl: dowloadUrl,
        }).then(() => {
          let data = {
            ...user,
            name,
            avatarUrl: dowloadUrl,
          };

          storageUser(data);
          updateUser(data);
          alert("Atualizado com sucesso :3");
        });
      });
    })
    .catch(error => {
      console.log('Error ao atualizar');
      
    })
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name !== "" && avatarUrl === null) {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        name: name,
      }).then((res) => {
        let data: UserProps = {
          avatarUrl: user.avatarUrl,
          email: user.email,
          name: name,
          uid: user.uid,
        };

        storageUser(data);
        updateUser(data);
        alert("Atualizado com sucesso :3");
      })
    } else if (name !== "" && avatarUrl !== null) {
      handleUpdatePhoto();
    }
  };

  console.log(user);

  return (
    <>
      <Header />
      <Content>
        <Title title="Configurações">
          <FiSettings size={25} />
        </Title>

        <S.Container>
          {!loadingUser && (
            <S.Form onSubmit={handleUpdate}>
              <label className="photo-input">
                <FiUpload size={25} color="#ccc" />
                <input
                  type="file"
                  onChange={handleChangeFile}
                  accept="image/*"
                />
                {avatarUrl === null ? (
                  <Image
                    src={avatar}
                    alt="Foto de perfil"
                    width={250}
                    height={250}
                  />
                  ) : (
                  
                  <Image
                    src={avatarUrl}
                    alt="Foto de perfil"
                    width={250}
                    height={250}
                  />
                )}
              </label>

              <label>Nome</label>
              <input
                type="text"
                value={user.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />

              <label>Email</label>
              <input type="email" value={user!.email} disabled />

              <button type="submit">Salvar</button>
            </S.Form>
          )}
        </S.Container>
      </Content>
      <Content>
        <S.LogoutButton onClick={logout}>Sair</S.LogoutButton>
      </Content>
    </>
  );
};

export default Settings;
