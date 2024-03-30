import server from '@core/stores/server'
import { ofetch } from 'ofetch'

export const $api = ofetch.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    async onRequest({ options }) {
        const isServerOne = server.state.isServerOne

        options.headers = {
            ...options.headers,
            'Is-Server-One': isServerOne
        }
    }
})
