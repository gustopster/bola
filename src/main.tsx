import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import AppsBola from './AppsBola'
import './Global.css'
const root = document.getElementById('root')
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <AppsBola />
    </React.StrictMode>
  )
}