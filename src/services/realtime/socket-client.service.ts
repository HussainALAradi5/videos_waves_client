import { io, type Socket } from 'socket.io-client'
import { socketConfig } from '@/config/realtime/socket.config'
import { getFreshAccessToken } from '@/services/users/auth/token-refresh.service'

let socket: Socket | null = null

/**
 * One shared socket per tab. The handshake asks for a fresh access token on every (re)connect, so
 * a reconnect after the token expired still authenticates.
 */
export const socketClient = {
  connect: (): Socket => {
    socket ??= io(socketConfig.url, {
      path: socketConfig.path,
      transports: ['websocket'],
      reconnectionDelay: socketConfig.reconnectionDelayMs,
      reconnectionDelayMax: socketConfig.reconnectionDelayMaxMs,
      auth: (send) => void getFreshAccessToken().then((token) => send({ token }))
    })
    return socket
  },
  disconnect: (): void => {
    socket?.disconnect()
    socket = null
  },
  get: (): Socket | null => socket
}
