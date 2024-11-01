import { demoController } from 'controllers/test'
import express from 'express'
import { validate } from 'middleware'
import { tryCatch } from 'utils/helpers'
import * as yup from 'yup'

const router = express.Router()

const schema = yup.object({
  body: yup.object({
    name: yup.string().trim().min(8).max(40).required().label('Name'),
    abc: yup.string().trim().min(8).max(40).required().label('abc'),
  }),
  params: yup.object({
    id: yup.string().required('Id is Required'),
  }),
})

router.get(
  '/',
  tryCatch(async (_req, res, _next) => {
    res.json({ msg: 'get' })
  }),
)
router.post('/:id', validate(schema), demoController)

export default router
