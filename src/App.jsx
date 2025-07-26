import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Tools from './pages/Tools'
import CampaignCrafter from './pages/tools/CampaignCrafter'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/tools/campaign-crafter" element={<CampaignCrafter />} />
      </Routes>
    </Layout>
  )
}

export default App