import { atom } from 'recoil'

export const signupState = atom({
    key: 'signupState',
    default: {
        'email': '',
        'username': '',
        'password': '',
        'passwordConfirm': '',
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
    default: JSON.parse(localStorage.getItem('user'))
})


export const usersState = atom({
    key: 'usersState',
    default: []
})

export const itemState = atom({
    key: 'itemState',
    default: []
})

export const newItemState = atom({
    key: 'newItemState',
    default: {
        'user': '',
        'itemName': '',
        'imageUrl': '',
        'descriptions': '',
        'harvestDate': '',
        'quantity': '',
        'measurementUnits': ''
    }
})