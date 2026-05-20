/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import Root from './components/Root'
import * as React from 'react'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('root')
createRoot(container!).render(<Root />)
