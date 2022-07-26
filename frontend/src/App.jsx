import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [formData,setFormData] = useState({
      description: '',
      file: {}
    })
    const [loading,setLoading] = useState(false)
    const url = "http://localhost:4000"

  const inputHandler = (e) =>{
    setFormData({...formData,description: e.target.value})
  }

  const showSuccessToastMessage = () => {
    toast.success('File uploaded successfully!',{
      position: toast.POSITION.TOP_RIGHT
    })
  }

  const showErrorToastMessage = (message) => {
    toast.error(message,{
      position: toast.POSITION.TOP_RIGHT
    })
  }

  const onFileChange = (e) =>{
    console.log(e.target.files[0])
    setFormData({...formData,file: e.target.files[0]})
  }

  const handleSubmit = (e) =>{
    setLoading(true)
    e.preventDefault();
    let submitData = new FormData();

    submitData.append('description',formData?.description)
    submitData.append('file',formData?.file)

    axios.post(url+"/save",submitData)
    .then(resp=>{
      showSuccessToastMessage()
      setLoading(false)
    })
    .catch(err=>{
      showSuccessToastMessage(err?.message)
      setLoading(false)
    })
  }

  return (
    <div className="App">
        <ToastContainer />
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className='input-group'>
                <label>Description</label>
                <input 
                  name='description'
                  type='text'
                  id='description'
                  onChange={inputHandler}
                />
            </div>
            <div className='input-group'>
                <label>File</label>
                <input 
                  name='file'
                  type='file'
                  id='file'
                  onChange={onFileChange}
                  required
                />
            </div>
            <button className='submit-btn' type='submit'>
                <span>{loading ? 'Uploading .... ' : 'Upload'}</span>
            </button>
        </form>
    </div>
  )
}

export default App
