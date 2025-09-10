module.exports = {
  // 세미콜론 자동 추가
  semi: true,

  // ES5에서 지원하는 곳에만 trailing comma 추가 (객체, 배열 등)
  trailingComma: "es5",

  // 더블쿼터 사용 (JavaScript/TypeScript)
  singleQuote: false,

  // JSX에서도 더블쿼터 사용
  jsxSingleQuote: false,

  // 한 줄 최대 80자 (이후 자동 줄바꿈)
  printWidth: 80,

  // 들여쓰기 2칸
  tabWidth: 2,

  // 탭 대신 스페이스 사용
  useTabs: false,

  // 객체 브래킷 안에 공백 추가 { name: "John" }
  bracketSpacing: true,

  // JSX 닫는 브래킷을 다음 줄에 배치
  bracketSameLine: false,

  // 화살표 함수에서 가능한 경우 괄호 생략 (x => x*2)
  arrowParens: "avoid",

  // 줄바꿈 문자는 LF 사용 (Unix/Linux 스타일)
  endOfLine: "lf",

  // 객체 프로퍼티는 필요한 경우만 따옴표 사용
  quoteProps: "as-needed",
};
