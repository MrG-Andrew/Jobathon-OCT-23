import { Radio } from 'antd'
import React from 'react'

export default function StatusSelect({handleStatus, keyValue}) {
  return (
    <>
   <Radio.Group defaultValue='Not Started' onChange={(e)=>handleStatus(keyValue,e.target.value)}>
        <Radio key={1} value='Not Started' >Not Started</Radio>
        <Radio key={2} value='In Progress' >In Progress</Radio>
        <Radio key={3} value='Finished' >Finished</Radio>
    </Radio.Group>
    </>
  )
}
