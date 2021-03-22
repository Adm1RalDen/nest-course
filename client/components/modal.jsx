import {useState} from "react";

const Modal = (props) => {
  const [name, setName] = useState('')
  const [userId, setUserId] = useState('')
  
  const handleChangeInput = (event) => {
    const target = event.target
    if (target.name === 'userId') {
      setUserId(target.value)
    } else {
      setName(target.value)
    }
  }
  
  
  const handleClickToAdd = () => {
    props.addContact(
        name,
        userId
    )
  }
  
  return <div className="modal" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
              style={{display: props.visible ? 'block' : 'none'}}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Add new contact</h5>
          <button type="button" className="btn-close" onClick={props.close} aria-label="Close"/>
        </div>
        <div className="modal-body">
          <label htmlFor="name" className="form-label">User name</label>
          <input type="text" id='name' name='name' className="form-control mb-3" placeholder={'nickname'} value={name}
                 onChange={handleChangeInput}/>
          <label htmlFor="userId" className="form-label">User Id</label>
          <input type="text" id='userId' name='userId' className="form-control" placeholder={'user id'} value={userId}
                 onChange={handleChangeInput}/>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={props.close}>Close
          </button>
          <button type="button" className="btn btn-primary" onClick={handleClickToAdd}>Add User</button>
        </div>
      </div>
    </div>
  </div>
}
export default Modal