import React from 'react'
import AddPostComponent from '../components/post-form/PostForm'
import Container from '../components/container/Container'

function AddPost() {
  return (
    <div className='w-full py-8'>
        <Container>
            <AddPostComponent/>
        </Container>
    </div>
  )
}

export default AddPost