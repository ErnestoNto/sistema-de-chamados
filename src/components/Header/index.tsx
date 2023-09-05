"use client";
import React from "react";
import * as S from "./styles";
import { useAuth } from "@/Contexts/auth";
import Image from "next/image";
import avatar from "../../assets/avatar.png";
import Link from "next/link";

const Header = () => {
  const auth = useAuth()

  const user = auth && auth.user 
  const loadingUser = auth && auth.loadingUser 

  return (
    <S.Container>
      <div>
        {!loadingUser && (
          <Image
            src={user.avatarUrl === null ? avatar : user.avatarUrl}
            alt="Foto de perfil"
            width={90}
            height={90}
            
          />
        )}
      </div>

      <nav>
        <Link href="/dashboard" prefetch={false}>
          Chamados
        </Link>
        <Link href="/customers" prefetch={false}>
          Clientes
        </Link>
        <Link href="/settings" prefetch={false}>
          Configurações
        </Link>
      </nav>
    </S.Container>
  );
};

export default Header;
