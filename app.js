import dotenv from 'dotenv'
import { Resend } from 'resend'
import express from 'express'

dotenv.config()

const resend = new Resend('re_j9WqZXgq_NvZTZWLd5HeHHoYPg4zacXKV')
const app = express()

app.get('/', async (req, res) => {
    try {
        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['delivered@resend.dev'],
            subject: 'Hello World',
            html: '<strong>it works!</strong>',
        })

        res.status(200).json(data)
    } catch (error) {
        res.status(400).json(error)
    }
})

app.listen(3000, () => {
    if (!process.env.RESEND_API_KEY) {
        throw `Abort: You need to define RESEND_API_KEY in the .env file.`
    }

    console.log('Listening on http://localhost:3000')
})
