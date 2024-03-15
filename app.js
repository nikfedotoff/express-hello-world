import dotenv from 'dotenv'
import { Resend } from 'resend'
import express from 'express'

dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY)
const app = express()

app.post('/', async (req, res) => {
    try {
        const { name, phone, company, text } = req.body

        const message = `A new client has submitted information:
			- Name: ${name}
			- Company: ${company}
			- Phone: ${phone}
			- Text: ${text}`

        const data = await resend.emails.send({
            from: 'The3floor.com <onboarding@resend.dev>',
            to: ['nikfedotoff@mail.ru'],
            subject: 'New form submission!',
            html: `<strong>${message}</strong>`,
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
