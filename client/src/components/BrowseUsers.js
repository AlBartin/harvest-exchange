import React from 'react';
import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import UserCard from './UserCard'
import api from '../api/posts'


import { usersState } from '../recoil/atoms'

function BrowseUsers () {

    const users = useRecoilValue(usersState)

    console.log(users)
//     const [users, setUsers] = useRecoilState(usersState)

//     useEffect(() => {
//     const fetchUsers = async () => {
//         try {
//             const response = await api.get('/users')
//             setUsers(response.data)
//         } catch (error) {
//             if (error.response) {
//                 console.log(error.response.data)
//                 console.log(error.response.status)
//                 console.log(error.response.headers)
//             } else {
//                 console.log(`Error: ${error.message}`)
//             }
//         }
//     }
//     fetchUsers();
// },[])


    // useEffect (() => {
    // axios.get('/users')
    // .then (resp => {
    //     console.log(resp.data)
    //     setUsers(resp.data)})
    // .catch (errors => console.log(errors))
    // },[])

    const displayUsers = users.map((user) => <UserCard key={user.id} user={user}/> )

    return (
        <div className="all-users-container">
          { displayUsers }
        </div>
    )

}

export default BrowseUsers