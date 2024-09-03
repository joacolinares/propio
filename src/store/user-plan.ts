import { create } from 'zustand'

export interface PlansMembership {
    plan: string
    price: string
    profitReferralsMembership: string
    profitReferralsEarnings: string
}

interface UserPlanActions {
	updatePlan: (userPlan: PlansMembership) => void
}

export const useUserPlanStore = create<PlansMembership & UserPlanActions>((set) => ({
    plan: '',
    price: '',
    profitReferralsMembership: '',
    profitReferralsEarnings: '',
    updatePlan: (value) => set(state => ({ 
		...state,
		...value
	 })),
}))