import Body from "../components/body"
import Head from "next/head"

export default function Home({ allPostsData }) {
  return (
    <div>
      <Head>
        <title>Shi-fu-mi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Body/>
      </div>
    </div>
  )
}

