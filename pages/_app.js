import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContextProvider } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { ProtectedRoute } from '../components/ProtectedRoute'

const noAuthPages = ['/signup', '/login']
function MyApp({ Component, pageProps }) {
  const router = useRouter()

  return (
    <AuthContextProvider>
      {noAuthPages.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
      
    </AuthContextProvider>
  )
}

export default MyApp
