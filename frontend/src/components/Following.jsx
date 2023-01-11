import React, { useState } from 'react';
import { useEffect } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai'
import Axios from 'axios'



const Following = ({ category, ctg_following, currentUser, setLength, length }) => {
    const [array, setArray] = useState(ctg_following)
    const [fill, setFill] = useState(false)

    const handleCat = (category) => {
        if (array.indexOf(category.name) !== -1) {
            setArray(array.filter(cat => cat !== category.name))
            setLength(length - 1)
            Axios.post('http://localhost:8000/unfollow/', { ...category, user: currentUser }).then(function (response) {
                console.log("removed")
                console.log(response)
            }).catch(function (error) {
                console.log(error)
            });
        } else {
            setArray([...array, category.name])
            setLength(length + 1)
            Axios.post('http://localhost:8000/follow/', { ...category, user: currentUser }).then(function (response) {
                console.log("added")
                console.log(response)
            }).catch(function (error) {
                console.log(error)
            });
        }
        console.log(category)
    }

    useEffect(() => {
        if (array.indexOf(category.name) !== -1) {
            setFill(true)
        } else {
            setFill(false)
        }
        console.log(array)
    }, [array, category.name])

    return (
        <div onClick={() => handleCat(category)} className='hover justify-content-center' key={category.name} style={{ padding: "1em", border: "solid" }}>
            {category.name}
            {<AiFillCheckCircle className='ml-2' style={fill ? { fill: 'green' } : { fill: 'lightgrey' }} />}
        </div>
    );
}

export default Following;