import { RequestWithValidate } from 'types/common'

const getValidatedData = (
  req: RequestWithValidate,
  { only }: { only?: 'query' | 'body' | 'params' } = {},
) => {
  if (only) {
    return req?.validatedData?.[only] || {}
  }

  return {
    ...req.validatedData?.query,
    ...req.validatedData?.params,
    ...req.validatedData?.body,
  }
}

export { getValidatedData }
