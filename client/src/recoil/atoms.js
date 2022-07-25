import { atom } from 'recoil'

export const signupState = atom({
    key: 'signupState',
    default: {
        'email': '',
        'username': '',
        'passwordDigest': '',
        'avatarUrl': '',
        'personalImage': '',
        'cropsGrown': '',
        'inSearchOfCrops': '',
        'streetAddress': '',
        'cityAddress': '',
        'stateAddress': '',
        'zipcode': ''
    }
})

export const currentUserState = atom({
    key: 'currentUserState',
    default: null
})


export const usersState = atom({
    key: 'usersState',
    default: []
})