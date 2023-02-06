import '../components/main.scss'
import '../components/_grid.scss'
import '../components/_main_nav.scss'
import '../components/_resource_bar.scss'
import '../components/_welcome_message.scss'
import '../components/reset.scss'
import { Provider } from 'react-redux'
import configureStore from '../components/rootReducer'

const store = configureStore()

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  ) 
}
