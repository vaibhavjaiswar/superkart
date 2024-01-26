import jwt from 'jsonwebtoken'

export function generateToken(user: string | object | Buffer) {
  return jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: '1h' })
}

type ValidateTokenReturnType = {
  isTokenValid: boolean
  data: string | jwt.JwtPayload | null
  message: string
}

export function validateToken(token: string): ValidateTokenReturnType {
  try {
    const result = jwt.verify(token, process.env.JWT_SECRET as string)
    return { isTokenValid: true, data: result, message: 'Token is valid.' }
  } catch (error) {
    let msg = 'Token is invalid.'
    if (error instanceof jwt.TokenExpiredError) {
      console.error('JWT is expired')
      msg = 'Token is expired.'
    } else if (error instanceof jwt.JsonWebTokenError) {
      console.error('JWT error:', error.message)
    } else {
      console.error(error)
    }
    return { isTokenValid: false, data: null, message: msg }
  }
}