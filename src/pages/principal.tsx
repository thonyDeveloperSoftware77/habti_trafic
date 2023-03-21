import Head from "next/head";
import { getCurrentUser } from "../../public/firebaseAuth";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavMenu from "../../components/NavMenu";
import HabitsProvider from "../../context/HabtisContext";
import Habitos from "../../components/Habitos";
export default function ProtectedPage() {
  const router = useRouter();

  const [user, setUser] = useState({ displayName: "", uid: "" });
  const auth = getCurrentUser();

  // Authenticate the user and redirect to NotFound page if user is not logged in
  auth.then((user) => {
    if (user) {
      setUser(user);
    } else {
      router.push('/notFound');
    }
  });
  if (user.displayName !== "") {
    return (
      <>
        <Head>
          <title>Protected Page</title>
          <meta name="description" content="Protected Page" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="Dashboard">
          <NavMenu></NavMenu>
          <div>
            <h1 className={styles.title}>Protected Page</h1>
            <p>Welcome {user.displayName}!</p>
            <p>Tus habitos</p>

            <div>
              <span>Ingresa el habito que quieres hacer</span>
              <input type="text" />
              <button>Añadir Habito</button>
            </div>

            <HabitsProvider userIdParam={user.uid}>
              <Habitos uid={user.uid}></Habitos>
            </HabitsProvider>
          </div>
        </div>

      </>
    );
  }

}
