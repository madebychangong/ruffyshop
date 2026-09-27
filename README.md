# 우기상점 업로드 안내

몽키 D. 루피(밀짚모자) 테마 + 애플 리퀴드 글라스 스타일의 디아블로4 시세표 + 장바구니 상담 주문서입니다.
배경 이미지 위에 반투명 유리 패널이 떠 있는 구조라, 배경 사진 한 장만 바꾸면 분위기가 통째로 바뀝니다.
골드문/제리샵/더블랙과 기능이 같고(가격표 편집, 톡방 주소 저장, 장바구니, 상담 시작), 디자인만 다릅니다. 채널톡과 흐르는 공지 줄은 넣지 않았습니다.

이 폴더 안의 파일을 GitHub 저장소 최상단에 올리면 됩니다. 폴더째 넣지 말고 `index.html`, `functions` 폴더, `logo.svg`, `batang.jpg`, `README.md`가 바로 보이게 올리세요.

## 파일

- `index.html`: 손님용 화면 + 숨김 관리자 편집 모드 (디자인/문구 전부 이 파일 안)
- `logo.svg`: 밀짚모자 로고 (상단바 동그라미 + 미니 현상수배 포스터 사진칸에 사용)
- `batang.jpg`: 페이지 전체 배경 (루피 캐릭터). WANTED 포스터 사진칸에도 같은 파일을 씀
- `bg.svg`: 예비 배경(바다 그림). 캐릭터 배경을 빼고 싶을 때 `--bg-image` 를 `url("bg.svg")` 로 바꾸면 됨
- `가격표.txt`: 최초 가격표 원본 (실제 기본값은 `index.html`의 `rawPriceText` 안에 들어있음)
- `functions/`: Cloudflare Pages Functions (로그인, 가격표 저장/불러오기)

## 배경 이미지 바꾸기 (누끼 없는 이미지도 OK)

1. 새 이미지를 이 폴더에 넣기 (예: `bg.jpg`)
2. `index.html` 맨 위 `<style>` 안의 `--bg-image: url("batang.jpg");` 에서 파일명만 바꾸기
3. 글씨가 잘 안 보이면 바로 아래 두 줄 숫자만 조절
   - `--bg-dim`: 사진을 어둡게 덮는 정도 (0 = 사진 그대로, 0.8 = 아주 어둡게)
   - `--bg-blur`: 사진 흐림 정도 (0px = 선명, 8px = 많이 흐림)

밝은 사진일수록 `--bg-dim` 을 높여야 메뉴 글씨가 보입니다.
어두운 사진(예: batang.jpg)은 0.5 정도, 밝은 스튜디오 사진은 0.65 이상이 필요합니다.
해상도가 낮은 사진(1000px 미만)은 PC 화면에서 흐릿하게 늘어나니 되도록 1920px 이상을 쓰세요.
3. WANTED 포스터 사진도 바꾸려면 `<div class="poster-photo"><img src="batang.jpg"` 의 파일명을 수정 (`.poster-photo img` 의 `object-position` 으로 얼굴 위치 조절)

배경은 화면 전체에 `cover`로 깔리고 스크롤해도 고정됩니다. 유리 패널이 배경을 흐리게 비추므로 배경이 복잡해도 글자는 읽힙니다.
세로로 긴 캐릭터 이미지는 PC 화면에서 위아래가 잘릴 수 있으니, 가로형(예: 1920×1080)이나 정사각형 이미지가 가장 무난합니다.

## Cloudflare Pages 설정

- Framework preset: `None`
- Build command: `exit 0`
- Build output directory: `/`
- Root directory: 비워두기

## 관리자 기능 설정

Cloudflare Pages 프로젝트에서 다음 값을 설정해야 저장 기능이 동작합니다.

1. Settings > Variables and Secrets
   - `ADMIN_PASSWORD`: 관리자 비밀번호
   - `SESSION_SECRET`: 길고 랜덤한 문자열

2. Settings > Bindings
   - KV namespace binding
   - Variable name: `WOOKI_KV`
   - KV namespace: 새로 만든 우기상점용 KV

## 관리자 열기

- `STRAW HAT PRICE BOARD` 배지나 로고/상호 영역을 1.5초 길게 누르기
- 또는 키보드 `Ctrl + Alt + A`
- 또는 주소 뒤에 `?admin=1` 붙이기

관리자 화면에서 가격표 원문과 1:1 카톡방 주소를 저장할 수 있습니다.
카톡방 주소를 비워두면 해당 버튼은 화면에서 숨겨집니다.

## 처음 배포할 때 바꿔야 하는 것

`index.html` 안 `<script>` 시작 부분의 "우기상점 기본 설정" 블록:

- `kakaoOneUrl`: 1:1 오픈카톡 주소 (관리자 화면에서 저장해도 됨). 주소가 있으면 상단 버튼과 주문서 안 "카톡방으로 이동" 버튼이 나타납니다.
