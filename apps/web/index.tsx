/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import '../scss/index.scss'
import App from './app/page'
import * as React from 'react'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('root')
createRoot(container!).render(<App />)
