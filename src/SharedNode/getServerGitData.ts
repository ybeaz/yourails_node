import { withTryCatchFinallyWrapper } from 'yourails_common'
import { consolerError } from './consolerError'

interface GetServerGitDataResType {
  commitHash: string
  commitMsg: string
  commitDate: string
}

const resultDefault: GetServerGitDataResType = { commitHash: '', commitMsg: '', commitDate: '' }

/**
 * @description Function to return Git server last commit data
 * @returns IGetServerGitData
 */
export const getServerGitData = (): GetServerGitDataResType => {
  if (typeof window !== 'undefined') return { commitHash: '', commitMsg: '', commitDate: '' }

  const { execSync } = require('child_process')
  try {
    const commitHash = execSync('git rev-parse HEAD').toString().trim()
    const commitMsg = execSync('git log --format=%B -n 1').toString().trim()
    const commitDate = execSync('git --no-pager log -1 --format="%ai"').toString().trim()

    return { commitHash, commitMsg, commitDate }
  } catch (error) {
    consolerError('getServerGitData [25]', error)
    return { commitHash: '', commitMsg: '', commitDate: '' }
  }
}
