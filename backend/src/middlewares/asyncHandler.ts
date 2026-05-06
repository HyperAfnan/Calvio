import type { Context } from 'hono'

export function asyncHandler(handler: (c: Context) => Promise<any> | any) {
  return async (c: Context) => {
    try {
      return await handler(c)
    } catch (err: any) {
      console.error('Unhandled handler error', err)
      return c.json({ success: false, message: err?.message || 'Internal Server Error' }, 500)
    }
  }
}
