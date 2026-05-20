import { JwtPayload as DefaultPayload } from 'jwt-decode'

export default interface JwtPayload extends DefaultPayload {
    id: string
}
