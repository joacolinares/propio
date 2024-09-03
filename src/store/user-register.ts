import { create } from 'zustand'
import { E164Number } from 'libphonenumber-js/core';

export interface UserRegisterState {
	email: string
	fullName: string
	username: string
	phoneNumber: E164Number | null
	country: string
	gender: string
	dateOfBirth: string
	bio: string
	facebook: string
	instagram: string
	youtube: string
	tiktok: string
	whatsapp: string
	wallet: string
	nameAccount: string
	imgAccount: string
}

interface UserRegisterActions {
	updateUser: (userRegister: UserRegisterState) => void
}

export const useUserRegisterStore = create<UserRegisterState & UserRegisterActions>((set) => ({
	email: '',
	fullName: '',
	username: '',
	phoneNumber: null,
	country: '',
	gender: '',
	dateOfBirth: '',
	bio: "",
	facebook: "",
	instagram: "",
	youtube: "",
	tiktok: "",
	whatsapp: "",
	wallet: "",	
	nameAccount: "",
	imgAccount: "",
	updateUser: (value) => set(state => ({ 
		...state,
		...value
	 })),
}))