import React from 'react';
import { useRecoilValue } from 'recoil'
import UserCard from './UserCard'


import { usersState } from '../recoil/atoms'

function BrowseUsers () {

    const users = useRecoilValue(usersState)

    console.log(users)


    const displayUsers = users.map((user) => <UserCard key={user.id} user={user}/> )

    return (
        <div className="all-users-container">
          { displayUsers }
        </div>
    )

}

export default BrowseUsers