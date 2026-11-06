export interface LoginRequestDto {
  /** Username, email, or mobile number (any common format). */
  identifier: string
  password: string
}
