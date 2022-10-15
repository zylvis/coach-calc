import {useContext} from 'react'
import { LoginContext } from '../store/LoginContext'

export const useLoginContext = () => {
  return useContext(LoginContext)
}