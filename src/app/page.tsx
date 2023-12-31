'use client'
import Image from 'next/image'
import styles from './page.module.css'
import Navbar from '@/components/Navbar'
// import { useAuthState } from '@/contexts/AuthContext'
import Link from 'next/link'

export default function Home() {
  // const { isLogin } = useAuthState();
  return (
    <div>
      <Navbar />
      <div className={styles.main}>
      {/* {isLogin && <div>Yeah!Now you are logged in</div>}
     {!isLogin && <div>Haven't login, Go to <Link href="/login">Login</Link></div>} */}
      </div>
    </div>
  )
}
