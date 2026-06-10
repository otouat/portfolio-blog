FROM node:24-slim
RUN apt-get update && apt-get install -y git
RUN corepack enable pnpm
WORKDIR /app
COPY pnpm-lock.yaml package.json pnpm-workspace.yaml ./
RUN pnpm approve-builds
RUN pnpm install
COPY . .

# Build the site (this compiles the search index file)
RUN pnpm run build

# Expose VitePress's default preview port
EXPOSE 4173

# Serve the static production build
CMD ["pnpm", "run", "preview", "--host"]
