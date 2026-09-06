import { join } from 'node:path'
import { GetWaitedForPropsInFileJsonCaseType } from './getWaitedForPropsInFileJson'

export const getWaitedForPropsInFileJsonCases: GetWaitedForPropsInFileJsonCaseType[] = [
  {
    description: 'Real case I',
    params: {
      entity: [], // Defined in src/SharedNode/getWaitedForPropsInFileJson/getWaitedForPropsInFileJson.run.ts
      objPropsPath: 'scenes',
      propsArr: ['pathsFilesAbsImages', 'pathFileAbsAudio'],
      timeoutMs: 2500,
      comment: 'happy path object',
    },
    options: {},
    expected: {
      isSuccess: true,
      message:
        '✅ getWaitedForPropsInFileJson [110]: happy path object\n' +
        'scenario: /Users/admin/Dev/yourails_node/src/SharedNode/getWaitedForPropsInFileJson/__mocks__/2026-07-21-07-00-44-p_3-Prometheus-what-is-the-pull-model/scenarioAllPresent.json\n' +
        'props are ready: pathsFilesAbsImages, pathFileAbsAudio',
    },
  },
  // {
  //   description: '✅ All props are present',
  //   params: {
  //     pathFileAbs: join(
  //       __dirname,
  //       '__mocks__',
  //       '2026-07-21-07-00-44-p_3-Prometheus-what-is-the-pull-model/scenarioAllPresent.json',
  //     ),
  //     objPropsPath: 'scenes',
  //     propsArr: ['pathsFilesAbsImages', 'pathFileAbsAudio'],
  //     timeoutMs: 2500,
  //     comment: 'happy path object',
  //   },
  //   options: {},
  //   expected: {
  //     isSuccess: true,
  //     message:
  //       '✅ getWaitedForPropsInFileJson [110]: happy path object\n' +
  //       'scenario: /Users/admin/Dev/yourails_node/src/SharedNode/getWaitedForPropsInFileJson/__mocks__/2026-07-21-07-00-44-p_3-Prometheus-what-is-the-pull-model/scenarioAllPresent.json\n' +
  //       'props are ready: pathsFilesAbsImages, pathFileAbsAudio',
  //   },
  // },
  // {
  //   description: '✅ propsArr is empty',
  //   params: {
  //     pathFileAbs: join(
  //       __dirname,
  //       '__mocks__',
  //       '2026-07-21-07-00-44-p_3-Prometheus-what-is-the-pull-model/scenarioAllPresent.json',
  //     ),
  //     objPropsPath: 'scenes',
  //     propsArr: [],
  //     timeoutMs: 2500,
  //     comment: 'happy path object',
  //   },
  //   options: {},
  //   expected: {
  //     isSuccess: true,
  //     message:
  //       '✅ getWaitedForPropsInFileJson [80]: happy path object,\n' +
  //       'no props specified: check propsArr\n' +
  //       'scenario: /Users/admin/Dev/yourails_node/src/SharedNode/getWaitedForPropsInFileJson/__mocks__/2026-07-21-07-00-44-p_3-Prometheus-what-is-the-pull-model/scenarioAllPresent.json',
  //   },
  // },
  // {
  //   description: '❌ Some props are missing',
  //   params: {
  //     pathFileAbs: join(
  //       __dirname,
  //       '__mocks__',
  //       '2026-07-21-07-00-44-p_3-Prometheus-what-is-the-pull-model/scenarioSomeMissing.json',
  //     ),
  //     objPropsPath: 'scenes',
  //     propsArr: ['pathsFilesAbsImages', 'pathFileAbsAudio'],
  //     timeoutMs: 2500,
  //     comment: 'this is the real case 2',
  //   },
  //   options: {},
  //   expected: {
  //     isSuccess: false,
  //     message:
  //       '❌ getWaitedForPropsInFileJson [120]: this is the real case 2\n' +
  //       'scenario: /Users/admin/Dev/yourails_node/src/SharedNode/getWaitedForPropsInFileJson/__mocks__/2026-07-21-07-00-44-p_3-Prometheus-what-is-the-pull-model/scenarioSomeMissing.json\n' +
  //       'props are never ready: pathsFilesAbsImages, pathFileAbsAudio',
  //   },
  // },
  // {
  //   description: '❌ Some props are corrupted',
  //   params: {
  //     pathFileAbs: join(
  //       __dirname,
  //       '__mocks__',
  //       '2026-07-21-07-00-44-p_3-Prometheus-what-is-the-pull-model/scenarioSomeCorrupted.json',
  //     ),
  //     objPropsPath: 'scenes',
  //     propsArr: ['pathsFilesAbsImages', 'pathFileAbsAudio'],
  //     timeoutMs: 2500,
  //     comment: 'this is the real case 2',
  //   },
  //   options: {},
  //   expected: {
  //     isSuccess: false,
  //     message:
  //       '❌ getWaitedForPropsInFileJson [120]: this is the real case 2,\n' +
  //       'scenario: /Users/admin/Dev/yourails_node/src/SharedNode/getWaitedForPropsInFileJson/__mocks__/2026-07-21-07-00-44-p_3-Prometheus-what-is-the-pull-model/scenarioSomeCorrupted.json\n' +
  //       'pathsAbs are not valid: /Users/admin/Dev/yourails_node/src/SharedNode/getWaitedForPropsInFileJson/__mocks__/2026-07-21-07-00-44-p_3-Prometheus-what-is-the-pull-model/s_1_2026-07-21-09-19-42_image_error.png',
  //   },
  // },

  // // ✅ Happy path — file exists, array entity, all props present immediately
  // {
  //   description: 'resolves immediately when file is ready and all props present in array entity',
  //   params: {
  //     pathFileAbs:
  //       '/Users/admin/Dev/yourails_node/src/SharedNode/getWaitedForPropsInFileJson/__mocks__/test.json',
  //     propsArr: ['pathsFilesAbsImages', 'pathFileAbsAudio'],
  //     comment: 'happy path array',
  //   },
  //   options: {},
  //   expected:
  //     '/Users/admin/Dev/yourails_node/src/SharedNode/getWaitedForPropsInFileJson/__mocks__/test.json',
  // },
  // // ✅ Happy path — file exists, object entity (non-array), all props present
  // {
  //   description: 'resolves immediately when file is ready and all props present in object entity',
  //   params: {
  //     pathFileAbs: join(__dirname, '__mocks__', 'test2.json'),
  //     propsArr: [],
  //     comment: 'happy path object',
  //   },
  //   options: {},
  //   expected: join(__dirname, '__mocks__', 'test2.json'),
  // },
  // // ✅ No propsArr — resolves as soon as file is ready
  // {
  //   description: 'resolves when file is ready and propsArr is not provided',
  //   params: {
  //     pathFileAbs:
  //       '/Users/admin/Dev/yourails_node/src/SharedNode/getWaitedForPropsInFileJson/__mocks__/test.json',
  //     comment: 'no propsArr',
  //   },
  //   options: {},
  //   expected:
  //     '/Users/admin/Dev/yourails_node/src/SharedNode/getWaitedForPropsInFileJson/__mocks__/test.json',
  // },
  // // ✅ Empty propsArr — resolves as soon as file is ready
  // {
  //   description: 'resolves when file is ready and propsArr is empty array',
  //   params: {
  //     pathFileAbs:
  //       '/Users/admin/Dev/yourails_node/src/SharedNode/getWaitedForPropsInFileJson/__mocks__/test.json',
  //     propsArr: [],
  //     comment: 'empty propsArr',
  //   },
  //   options: {},
  //   expected:
  //     '/Users/admin/Dev/yourails_node/src/SharedNode/getWaitedForPropsInFileJson/__mocks__/test.json',
  // },
  // // ✅ Props become available after a delay (polling kicks in)
  // {
  //   description: 'resolves after polling when props appear in file after a delay',
  //   params: {
  //     pathFileAbs:
  //       '/Users/admin/Dev/yourails_node/src/SharedNode/getWaitedForPropsInFileJson/__mocks__/test.json',
  //     propsArr: ['pathsFilesAbsImages'],
  //     timeoutMs: 5000,
  //     stableMs: 250,
  //     comment: 'delayed props',
  //   },
  //   options: {},
  //   expected:
  //     '/Users/admin/Dev/yourails_node/src/SharedNode/getWaitedForPropsInFileJson/__mocks__/test.json',
  // },
  // // ❌ Props never appear — throws after timeout
  // {
  //   description: 'throws when props never appear within timeoutMs',
  //   params: {
  //     pathFileAbs:
  //       '/Users/admin/Dev/yourails_node/src/SharedNode/getWaitedForPropsInFileJson/__mocks__/test.json',
  //     propsArr: ['missingProp'],
  //     timeoutMs: 1000,
  //     stableMs: 250,
  //     comment: 'timeout props',
  //   },
  //   options: {},
  //   expected: new Error('❌ getWaitedForPropsInFileJson: timeout props, never ready: missingProp'),
  // },
  // // ❌ File never becomes ready — throws from getWaitedForFile
  // {
  //   description: 'throws when file never becomes ready within timeoutMs',
  //   params: {
  //     pathFileAbs: '/tmp/nonexistent.json',
  //     propsArr: ['pathsFilesAbsImages'],
  //     timeoutMs: 1000,
  //     stableMs: 250,
  //     comment: 'file never ready',
  //   },
  //   options: {},
  //   expected: new Error(
  //     `❌ getWaitedForPropsInFileJson: ${'file never ready'}, never ready: ${['pathsFilesAbsImages'].join(', ')}`,
  //   ),
  // },
  // // ❌ Array entity — some items missing props
  // {
  //   description: 'throws when at least one array item is missing a required prop',
  //   params: {
  //     pathFileAbs: '/tmp/test-partial.json',
  //     propsArr: ['pathsFilesAbsImages', 'pathFileAbsAudio'],
  //     timeoutMs: 1000,
  //     stableMs: 250,
  //     comment: 'partial props in array',
  //   },
  //   options: {},
  //   expected: new Error(
  //     '❌ getWaitedForPropsInFileJson: partial props in array, never ready: pathsFilesAbsImages, pathFileAbsAudio',
  //   ),
  // },
  // // ✅ Custom timeoutMs and stableMs are respected
  // {
  //   description: 'resolves with custom timeoutMs and stableMs when props are present',
  //   params: {
  //     pathFileAbs:
  //       '/Users/admin/Dev/yourails_node/src/SharedNode/getWaitedForPropsInFileJson/__mocks__/test.json',
  //     propsArr: ['pathsFilesAbsImages'],
  //     timeoutMs: 3000,
  //     stableMs: 100,
  //     comment: 'custom timing',
  //   },
  //   options: {},
  //   expected:
  //     '/Users/admin/Dev/yourails_node/src/SharedNode/getWaitedForPropsInFileJson/__mocks__/test.json',
  // },
  // // ✅ funcParent passed in options
  // {
  //   description: 'resolves correctly when funcParent is provided in options',
  //   params: {
  //     pathFileAbs:
  //       '/Users/admin/Dev/yourails_node/src/SharedNode/getWaitedForPropsInFileJson/__mocks__/test.json',
  //     propsArr: ['pathsFilesAbsImages'],
  //     comment: 'with funcParent',
  //   },
  //   options: { funcParent: 'getCreatedVideo' },
  //   expected:
  //     '/Users/admin/Dev/yourails_node/src/SharedNode/getWaitedForPropsInFileJson/__mocks__/test.json',
  // },
]
