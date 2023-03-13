import Head from "next/head";
import { getCurrentUser } from "../../public/firebaseAuth";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProtectedPage() {
  const router = useRouter();

  const [ user, setUser ] = useState({displayName: ""});
  const auth = getCurrentUser();
  auth.then((user) => {
    if (user) {
      setUser(user);
    } else {
      router.push('/notFound');
    }
  });

  return (
    <>
      <Head>
        <title>Protected Page</title>
        <meta name="description" content="Protected Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Protected Page</h1>
        <p>Welcome {user.displayName}!</p>
      </main>
    </>
  );
}
