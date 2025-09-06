/* eslint-disable no-console */

import { exec } from "child_process";
import inquirer from "inquirer";

const keywords = [
  {
    name: "✨ feat - 새로운 기능 추가",
    value: "✨ feat",
  },
  {
    name: "🐛 fix - 버그 수정",
    value: "🐛 fix",
  },
  {
    name: "📝 docs - 문서 수정 및 추가",
    value: "📝 docs",
  },
  {
    name: "🔍 modify - 코드 간단히 수정",
    value: "🔍 modify",
  },
  {
    name: "💄 style - 코드 의미에 영향을 주지 않는 변경사항(코드 포맷팅, 세미콜론 누락 등)",
    value: "💄 style",
  },
  {
    name: "🔨 refactor - 코드 리팩토링(사용하지 않거나 중복된 코드를 정리)",
    value: "🔨 refactor",
  },
  {
    name: "📦 chore - 빌드 부분 혹은 패키지 매니저 수정 사항(예:.gitignore 수정)",
    value: "📦 chore",
  },
];

const appTypes = [
  {
    name: "🌐 Web Application - 사용자 웹 프론트엔드",
    value: "web",
  },
  {
    name: "⚙️  Admin Application - 관리자 백오피스",
    value: "admin",
  },
  {
    name: "🔧 Common/Shared - 공통 패키지 및 전체 프로젝트",
    value: null,
  },
];

async function runCommitScript() {
  // 스테이징된 파일만 확인
  exec("git status --porcelain", async (error, stdout) => {
    // 에러가 있으면 커밋 불가
    if (error) {
      console.error("Git 상태 확인 실패:", error.message);
      return;
    }

    // 스테이징된 파일 확인 (A, M, D, R 등의 상태가 첫 번째 컬럼에 있는 파일들)
    const stagedFiles = stdout
      .split('\n')
      .filter(line => line.trim() && /^[AMDR]/.test(line));

    if (stagedFiles.length === 0) {
      console.log("커밋할 변경사항이 없습니다. 먼저 파일을 스테이징하세요 (git add .)");
      return;
    }

    console.log(`스테이징된 파일들: ${stagedFiles.length}개`);
    stagedFiles.forEach(file => console.log(`  ${file}`));

    // 앱 타입 선택 프롬프트
    const { selectedAppType } = await inquirer.prompt({
      type: "list",
      name: "selectedAppType",
      message: "커밋할 앱을 선택하세요:",
      choices: appTypes,
    });

    // 키워드 선택 프롬프트
    const { selectedKeyword } = await inquirer.prompt({
      type: "list",
      name: "selectedKeyword",
      message: "커밋 키워드를 선택하세요:",
      choices: keywords,
    });

    // 커밋 메시지 입력 프롬프트
    const { commitMessage } = await inquirer.prompt({
      type: "input",
      name: "commitMessage",
      message: "커밋 메시지를 입력하세요:",
      validate: (input: string) => {
        // 메시지 입력해야 커밋 가능
        if (!input.trim()) return "커밋 메시지를 입력해주세요.";
        return true;
      },
    });

    // 커밋 메시지에 앱별 prefix 추가
    let fullCommitMessage: string;
    if (selectedAppType) {
      fullCommitMessage = `${selectedKeyword}(${selectedAppType}): ${commitMessage}`;
    } else {
      fullCommitMessage = `${selectedKeyword}: ${commitMessage}`;
    }

    console.log(`\n📝 생성된 커밋 메시지: ${fullCommitMessage}\n`);

    exec(`git commit -m "${fullCommitMessage}"`, (error, stdout, stderr) => {
      // 에러가 있으면 커밋 실패
      if (error || stderr) {
        console.error("커밋 실패:", error?.message || stderr);
        return;
      }
      if (stdout) {
        console.log("커밋 성공:", stdout.trim());
      }
    });
  });
}

runCommitScript();
