const express = require('express')
const app = express()

import { Resend } from 'resend'

const resend = new Resend('re_j9WqZXgq_NvZTZWLd5HeHHoYPg4zacXKV')

resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'nikfedotoff@mail.ru',
    subject: 'Hello World',
    html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
})
