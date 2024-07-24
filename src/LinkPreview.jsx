import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { error } from 'ajv/dist/vocabularies/applicator/dependencies'
function LinkPreview({link}) {
    const [Data,setData] = useState({})
    
    const GetPreview = async()=>{
       axios.post(`http://localhost:7876/url-parser?url=${link}`).then((res)=>{
        setData(res?.data?.data)

       }).catch((error)=>{
        console.log(error)
       })
    }

    useEffect(()=>{
        GetPreview()
    },[link])
  return (
    <div>
        <img src={Data?.image} alt="" />
        <p>{Data?.title}</p>
        <p>{Data?.description}</p>
    </div>
  )
}

export default LinkPreview