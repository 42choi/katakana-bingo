# 웹 배포 가이드

## 🚀 가장 쉬운 방법: Netlify

### 1단계: 준비
현재 폴더의 모든 파일들:
- index.html
- styles.css
- game.js
- katakana-data.js
- README.md

### 2단계: Netlify 배포
1. [https://netlify.com](https://netlify.com) 접속
2. 회원가입 (무료)
3. "Sites" → "Add new site" → "Deploy manually"
4. 현재 폴더의 모든 파일을 드래그앤드롭
5. 🎉 즉시 URL 생성! (예: `https://amazing-name-123456.netlify.app`)

**소요시간: 5분**

---

## 🏆 GitHub Pages 배포 (권장)

### 1단계: Git 저장소 설정 (PowerShell에서 실행)
```powershell
# 현재 폴더에서 실행
git init
git add .
git commit -m "Initial commit: 카타카나 빙고 게임"
```

### 2단계: GitHub 저장소 생성
1. [GitHub.com](https://github.com) 로그인
2. "New Repository" 클릭
3. 저장소 이름: `katakana-bingo`
4. ✅ Public 설정
5. "Create repository" 클릭

### 3단계: 로컬과 GitHub 연결
```powershell
git remote add origin https://github.com/[본인계정명]/katakana-bingo.git
git branch -M main  
git push -u origin main
```

### 4단계: GitHub Pages 활성화
1. GitHub 저장소 → "Settings" 탭
2. 왼쪽 "Pages" 클릭
3. Source: "Deploy from a branch"
4. Branch: "main", 폴더: "/ (root)"
5. "Save" 클릭

### 5단계: 완료! 🎉
**접속 URL**: `https://[본인계정명].github.io/katakana-bingo/`

---

## 🌟 기타 배포 옵션들

### Vercel (자동 배포)
- GitHub 연동 시 코드 변경 시 자동 업데이트
- [https://vercel.com](https://vercel.com)

### Firebase Hosting
- Google의 무료 호스팅
- [https://firebase.google.com](https://firebase.google.com)

### Surge.sh (명령어 배포)
```bash
npm install -g surge
surge
```

---

## 📱 배포 후 확인사항

✅ **테스트 체크리스트:**
- [ ] PC에서 정상 작동
- [ ] 모바일에서 반응형 디자인 확인
- [ ] 빙고 로직 정상 작동
- [ ] 하나비 효과 정상 재생
- [ ] 음성 재생 (사용자 클릭 후)

## 🎯 추천 순서

1. **처음 사용자**: Netlify (가장 쉬움)
2. **Git 사용자**: GitHub Pages (무료, 안정적)
3. **개발자**: Vercel (고급 기능)

## 💡 Pro Tips

- **도메인 연결**: 본인 도메인이 있다면 연결 가능
- **SSL 자동**: 모든 서비스에서 HTTPS 자동 지원
- **업데이트**: 파일 수정 후 다시 업로드하면 즉시 반영
