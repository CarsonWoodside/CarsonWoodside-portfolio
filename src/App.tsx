import { CustomCursor } from './components/cursor/CustomCursor'
import { Background } from './components/background/Background'
import { AppRouter } from './routes/index'

function App() {
  return (
    <>
      <Background />
      <CustomCursor />
      <AppRouter />
    </>
  )
}

export default App