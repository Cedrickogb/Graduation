import Head from "next/head"
import { AuthContextProvider } from '../components/context/AuthContext'
import Navbar from "../components/navbar"
import Body from "../components/body"
import Footer from "../components/footer"

export default function Home({ allPostsData }) {
  return (
    <div>
      <Head>
        <title>Shi-fu-mi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AuthContextProvider>
        <Navbar/>
        <Body/>
        <Footer/>
      </AuthContextProvider>
    </div>
  )
}

