import dotenv from 'dotenv'
import { Resend } from 'resend'
import express from 'express'
import cors from 'cors'

dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY)
const app = express()

app.use(express.json())
app.use(cors({ origin: 'https://the3floor.com' }))

const sanitizeInput = (input) => {
    return input.replace(/</g, '&lt;').replace(/>/g, '&gt;').trim()
}

app.post('/', async (req, res) => {
    try {
        const name = sanitizeInput(req.body.name)
        const phone = sanitizeInput(req.body.phone)
        const company = sanitizeInput(req.body.company)
        const text = sanitizeInput(req.body.text ?? '-')

        const message = `A new client has submitted information:<br /><br />
            <br />- Name: ${name}
            <br />- Company: ${company}
            <br />- Phone: ${phone}
            <br />- Text: ${text}`

        // Send email
        const data = await resend.emails.send({
            from: 'The3floor.com <hi@the3floor.com>',
            to: ['jacopostecchini@gmail.com', 'nikvicin@gmail.com'],
            subject: 'New form submission!',
            html: `<strong>${message}</strong>`,
        })

        res.status(200).json(data)
    } catch (error) {
        console.error(error)
        res.status(400).json({ message: 'Failed to send email', error })
    }
})

app.listen(3000, () => {
    if (!process.env.RESEND_API_KEY) {
        throw 'Abort: You need to define RESEND_API_KEY in the .env file.'
    }

    console.log('Listening on http://localhost:3000')
})
