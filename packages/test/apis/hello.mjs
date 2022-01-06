import { platform } from 'os'

export const hello = async name => `hello ${name}! from ${platform()}`