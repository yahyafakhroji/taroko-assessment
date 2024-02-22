FROM node:20.0.0-alpine3.17 AS deps

ENV NEXT_PUBLIC_API_URL %%NEXT_PUBLIC_API_URL%%

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

RUN npm install -g pnpm

# Copy over env vars into .env.production file in root of /app
COPY ./env.sh .
RUN sh ./env.sh

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# install dependencies
RUN pnpm install --frozen-lockfile

# 2. Rebuild the source code only when needed
FROM node:20.0.0-alpine3.17 AS builder

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps /usr/src/app/.env.production .
COPY . .

# disable next.js telemetry collection
ENV NEXT_TELEMETRY_DISABLED 1

RUN pnpm lint
RUN pnpm test
RUN pnpm build

# 3. Production image, copy all the files and run next
FROM node:20.0.0-alpine3.17 AS runner
WORKDIR /usr/src/app

RUN npm install pm2 -g

ENV NODE_ENV production

COPY --from=builder /usr/src/app/next.config.mjs ./
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/.next/standalone ./
COPY --from=builder /usr/src/app/.next/static ./.next/static
COPY --from=builder /usr/src/app/start.sh /usr/local/bin/start

RUN chmod u+x /usr/local/bin/start

ENV PORT 9000
ENV HOSTNAME "0.0.0.0"

EXPOSE  9000/tcp

CMD [ "/usr/local/bin/start" ]