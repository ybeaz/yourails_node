import type { GetGemsCaseType, GetGemsParamsType } from './getGems'

export const getGemsCases: GetGemsCaseType[] = [
  {
    index: 0,
    description: 'basic test getGems',
    params: {} as GetGemsParamsType,
    options: {},
    expected: {
      uuidv4: '',
      nanoid: '',
      alphaNum: '',
      password: '',
      passwordHuman: '',
      dateTime: '',
      timestamp: 0,
    },
  },
]
