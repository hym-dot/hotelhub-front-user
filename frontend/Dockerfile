# 1단계: Build 단계 (Node.js 이미지 사용)
FROM node:20-alpine as builder

WORKDIR /app

# 패키지 파일 복사 및 설치
COPY package.json package-lock.json ./
RUN npm ci

# 소스 코드 복사 및 빌드
COPY . .
RUN npm run build

# 2단계: Run 단계 (Nginx 이미지 사용)
FROM nginx:1.25-alpine

# 기본 설정 제거
RUN rm /etc/nginx/conf.d/default.conf

# 작성하신 nginx.conf 복사 (현재 폴더에 있으므로 그대로 둠)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 1단계에서 만든 빌드 결과물(dist)만 쏙 가져오기
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
