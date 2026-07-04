import { createStore } from 'zustand/vanilla'
import { persist } from 'zustand/middleware'

type user_store_state = { token: string; };

type user_store_actions = {
    setToken: (token: string) => void;
}

type user_store = user_store_state & user_store_actions

const user_store = createStore<user_store>()(
    persist(
        (set) => ({
            token: '',
            setToken: (token) => set({ token }),
        }),
        { name: 'user-storage' },
    ),
)

export default user_store