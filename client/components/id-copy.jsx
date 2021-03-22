import React, { useRef } from 'react'

export const IdCopyBtn = ({ id }) => {
  const userIdRef = useRef(null)

  const copyMyId = () => {
    userIdRef.current.select()
    document.execCommand('copy')
  }

  return id ? (
    <div className='position-absolute bottom-0 flex-column d-flex'>
      <button className='btn btn-light' onClick={copyMyId}>
        Copy my id
      </button>
      <div className='flex-row'>
        <span>My ID: </span>
        <input type='text' value={id} ref={userIdRef} readOnly />
      </div>
    </div>
  ) : null
}
