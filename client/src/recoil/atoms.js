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

export const requestState = atom({
    key: 'requestState',
    default: ''
})

export const requestBagState = atom({
    key: 'requestBagState',
    default: []
})

export const counterOfferState = atom({
    key: 'counterOfferState',
    default: ''
})

export const counterOfferBagState = atom({
    key: 'counterOfferBagState',
    default: null
        // counter_id: '',
        // bag_id: '',
        // item_name: '',
        // quantity: '',
        // measurement_units: ''
})

export const counterOfferUserState = atom({
    key: 'counterOfferUserState',
    default: []
})

export const dealState = atom({
    key: 'dealState',
    default: {
        request_finalized: false,
        counter_finalized: false
    }
})

export const userBasketState = atom({
    key: 'userBasketState',
    default: []
})