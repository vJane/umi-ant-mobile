import { Toast } from 'antd-mobile'

export const config = () => ({
  onError: err => {
    err.preventDefault()
    Toast.offline(err.message)
  }
})
