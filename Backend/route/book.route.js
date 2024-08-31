import express from 'express'
import { getBook } from '../controller/book.controller.js'

const router = express.Router()

router.get('/', getBook) //route book/

export default router
