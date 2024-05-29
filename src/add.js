import { useEffect, useState } from 'react'
import axios from 'axios'

function Add({ handleAddPost, refetch, setRefetch }) {

    const [posts, setPosts] = useState([])
    const [company, setCompany] = useState('')
    const [contact, setContact] = useState('')
    const [country, setCountry] = useState('')
    const [image, setImage] = useState('')


    const getPosts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/posts')
            setPosts(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getPosts()
    }, [])

    const addPost = async () => {
        try {
            const maxId = posts.length > 0 ? Math.max(...posts.map(post => post.id)) : 0;
            const newId = maxId + 1

            const formData = {
                id: newId.toString(),
                company,
                contact,
                country,
                image
            }

            await axios.post('http://localhost:3000/posts', formData)

            handleAddPost();
            setRefetch(!refetch);

            setCompany('')
            setContact('')
            setCountry('')
            setImage('')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <input type="text" placeholder='Enter Company' value={company} onChange={(e) => setCompany(e.target.value)} />
            <input type="text" placeholder='Enter Contact' value={contact} onChange={(e) => setContact(e.target.value)} />
            <input type="text" placeholder='Enter Country' value={country} onChange={(e) => setCountry(e.target.value)} />
            <input type="file" placeholder='Enter Image Url' value={image} onChange={(e) => setImage(e.target.value)} />
            <button onClick={addPost}>Add</button>
        </>
    )
}

export default Add
