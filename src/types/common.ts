export interface RequestWithValidate extends Request {
  validatedData?: Record<string, any>
}
