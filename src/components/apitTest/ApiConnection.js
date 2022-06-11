
import React, {useState, useEffect} from 'react'
import appApi from '../../Apis/appApi';


const requestToken = () => (
  new Promise ((resolve, reject) => {
    try {
      const tokenData = appApi.get('token/')
      resolve(tokenData)
    } catch (err) {
      reject(err)
    }
  })
)

const ApiConnectionTest = () => {

  const [token, setToken] = useState("")

  useEffect(()=> {
    const  data = requestToken()
    data.then((response) => {
      setToken(String(response))
    })
    .catch(response=>{
      console.log(response)
    })
  }, [])

  return (
    <div>{token}</div>
  )
}

export default ApiConnectionTest;