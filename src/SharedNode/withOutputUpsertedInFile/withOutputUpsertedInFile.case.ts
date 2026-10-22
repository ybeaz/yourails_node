import type { WithOutputUpsertedInFileParamsType } from './withOutputUpsertedInFile'

export const withOutputUpsertedInFileCases: any[] = [
  {
    index: 1,
    description: 'basic test withOutputUpsertedInFile',
    func: () => ({
      characters_label: 'hedgehogInFog_safe_3',
      genres: ['adventure'],
      styles: ['comic-book'],
      settings: ['fantasy-world'],
      mood: ['epic'],
      characters_number: 3,
      characters:
        '3 Original grimdark science-fantasy characters:\nheavily armored space-knight warriors carrying banners, relics, and futuristic weapons.\nGothic starship cathedrals, ruined alien battlefields, incense smoke, braziers, and stained glass.\nBattle-worn metal, dramatic cinematic lighting, black, gunmetal, crimson, parchment, and gold.\nEpic solemn military atmosphere. Original character and world designs, not based on any existing fictional franchise.',
    }),
    params: {
      pathFileAbsIn:
        '/Users/admin/Dev/yourails_node/src/sharedNode/withOutputUpsertedInFile/__mocks__/characters.json',
      pathFileAbsOut:
        '/Users/admin/Dev/yourails_node/src/sharedNode/withOutputUpsertedInFile/__output__/characters2.json',
      propName: 'characters_label',
      idName: 'charactersID',
    } as WithOutputUpsertedInFileParamsType<any>,
    options: {},
    expected: () => {},
  },
  {
    index: 0,
    description: 'basic test withOutputUpsertedInFile',
    func: () => ({
      characters_label: 'hedgehogInFog_safe',
      genres: ['adventure'],
      styles: ['comic-book'],
      settings: ['fantasy-world'],
      mood: ['epic'],
      characters_number: 3,
      characters:
        '2 Original grimdark science-fantasy characters:\nheavily armored space-knight warriors carrying banners, relics, and futuristic weapons.\nGothic starship cathedrals, ruined alien battlefields, incense smoke, braziers, and stained glass.\nBattle-worn metal, dramatic cinematic lighting, black, gunmetal, crimson, parchment, and gold.\nEpic solemn military atmosphere. Original character and world designs, not based on any existing fictional franchise.',
    }),
    params: {
      pathFileAbsIn:
        '/Users/admin/Dev/yourails_node/src/sharedNode/withOutputUpsertedInFile/__mocks__/characters.json',
      pathFileAbsOut:
        '/Users/admin/Dev/yourails_node/src/sharedNode/withOutputUpsertedInFile/__output__/characters2.json',
      propName: 'characters_label',
      idName: 'charactersID',
    } as WithOutputUpsertedInFileParamsType<any>,
    options: {},
    expected: () => {},
  },
]
