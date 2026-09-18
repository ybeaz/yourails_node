import type { GetHtmlPageTextCaseType, GetHtmlPageTextParamsType } from './getHtmlPageText'

export const getHtmlPageTextCases: GetHtmlPageTextCaseType[] = [
  {
    index: 2,
    description: 'basic test getHtmlFromHtmlPage',
    params: {
      url: 'https://en.wikipedia.org/wiki/Arkady_and_Boris_Strugatsky',
      cssSelectorsArr: [
        'main > header > h1',
        'AFTER_INCLUDE:section[data-mw-section-id="0"]BEFORE:section[aria-labelledby="See_also"]',
      ],
    },
    options: {
      isWaitingForLoad: true,
      isFlattenShadowDom: true,
    },
    expected: {
      html: '',
      text: '',
    },
  },
  {
    index: 1,
    description: 'basic test getHtmlFromHtmlPage',
    params: {
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while',
      cssSelectorsArr: [
        '#content > div.layout__header.reference-layout__header > h1',
        '#content > div.layout__header.reference-layout__header > section',
        'AFTER:section[aria-labelledby="syntax"]BEFORE:section[aria-labelledby="specifications"]',
      ],
    },
    options: {
      isWaitingForLoad: true,
      isFlattenShadowDom: true,
    },
    expected: {
      html: '',
      text: "\nWHILE\nThe\nwhile\nstatement creates a loop that executes a specified statement as long as the test condition evaluates to true. The condition is evaluated before executing the statement.\nDESCRIPTION\n\nLike other looping statements, you can use control flow statements inside\nstatement\n:\n\nbreak\n   stops\n   statement\n   execution and goes to the first statement after the loop.\ncontinue\n   stops\n   statement\n   execution and re-evaluates\n   condition\n   .\n\nEXAMPLES\n\nUSING WHILE\n\nThe following\nwhile\nloop iterates as long as\nn\nis less than three.\n\njs\nlet n = 0; let x = 0; while (n < 3) { n++; x += n; }\nEach iteration, the loop increments\nn\nand adds it to\nx\n. Therefore,\nx\nand\nn\ntake on the following values:\n\nAfter the first pass:\n   n\n   = 1 and\n   x\n   = 1\nAfter the second pass:\n   n\n   = 2 and\n   x\n   = 3\nAfter the third pass:\n   n\n   = 3 and\n   x\n   = 6\n\nAfter completing the third pass, the condition\nn\n< 3 is no longer true, so the loop terminates.\n\nUSING AN ASSIGNMENT AS A CONDITION\n\nIn some cases, it can make sense to use an assignment as a condition. This comes with readability tradeoffs, so there are certain stylistic recommendations that would make the pattern more obvious for everyone.\nConsider the following example, which iterates over a document's comments, logging them to the console.\njs\nconst iterator = document.createNodeIterator(document, NodeFilter.SHOW_COMMENT); let currentNode; while (currentNode = iterator.nextNode()) { console.log(currentNode.textContent.trim()); }\nThat's not completely a good-practice example, due to the following line specifically:\njs\nwhile (currentNode = iterator.nextNode()) {\nThe effect of that line is fine — in that, each time a comment node is found:\n 1. iterator.nextNode()\n    returns that comment node, which gets assigned to\n    currentNode\n    .\n 2. The value of\n    currentNode = iterator.nextNode()\n    is therefore truthy.\n 3. So the\n    console.log()\n    call executes and the loop continues.\n\n…and then, when there are no more comment nodes in the document:\n 1. iterator.nextNode()\n    returns\n    null\n    .\n 2. The value of\n    currentNode = iterator.nextNode()\n    is therefore also\n    null\n    , which is falsy.\n 3. So the loop ends.\n\nThe problem with this line is: conditions typically use comparison operators such as\n===\n, but the\n=\nin that line isn't a comparison operator — instead, it's an assignment operator. So that\n=\nlooks like it's a typo for\n===\n— even though it's not actually a typo.\n\nTherefore, in cases like that one, some code-linting tools such as ESLint's\nno-cond-assign\nrule — in order to help you catch a possible typo so that you can fix it — will report a warning such as the following:\n> Expected a conditional expression and instead saw an assignment.\n\nMany style guides recommend more explicitly indicating the intention for the condition to be an assignment. You can do that minimally by putting additional parentheses as a grouping operator around the assignment:\njs\nconst iterator = document.createNodeIterator(document, NodeFilter.SHOW_COMMENT); let currentNode; while ((currentNode = iterator.nextNode())) { console.log(currentNode.textContent.trim()); }\nIn fact, this is the style enforced by ESLint's\nno-cond-assign\n's default configuration, as well as Prettier, so you'll likely see this pattern a lot in the wild.\n\nSome people may further recommend adding a comparison operator to turn the condition into an explicit comparison:\njs\nwhile ((currentNode = iterator.nextNode()) !== null) {\nThere are other ways to write this pattern, such as:\njs\nwhile ((currentNode = iterator.nextNode()) && currentNode) {\nOr, forgoing the idea of using a\nwhile\nloop altogether:\n\njs\nconst iterator = document.createNodeIterator(document, NodeFilter.SHOW_COMMENT); for ( let currentNode = iterator.nextNode(); currentNode; currentNode = iterator.nextNode() ) { console.log(currentNode.textContent.trim()); }\nIf the reader is sufficiently familiar with the assignment as condition pattern, all these variations should have equivalent readability. Otherwise, the last form is probably the most readable, albeit the most verbose.",
    },
  },
  {
    index: 0,
    description: 'basic test getHtmlFromHtmlPage',
    params: {
      url: 'https://example.com',
      cssSelectorsArr: [],
    },
    options: { isWaitingForLoad: false, isFlattenShadowDom: false },
    expected: {
      html: '',
      text: 'EXAMPLE DOMAIN\n\nThis domain is for use in documentation examples without needing permission. Avoid use in operations.\nLearn more',
    },
  },
]
