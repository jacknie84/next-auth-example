import type { NextPage } from 'next'
import { useSession, signOut, signIn } from 'next-auth/react'

const Home: NextPage = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        access_token {session.accessToken} <br />
        id_token {session.idToken} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}

export default Home
