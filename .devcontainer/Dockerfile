# syntax=docker/dockerfile:1.6.0
# escape=\

FROM node:20.10.0-bullseye AS qr_code_gen_dev_container

ARG WORKSPACE_DIR=/workspaces/workspace

WORKDIR $WORKSPACE_DIR

RUN apt-get update && \
    apt-get install --no-install-recommends -y \
    libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth xvfb

RUN corepack enable && \
    corepack prepare --activate pnpm@8.14.0

ENV PNPM_HOME=/root/.local/share/pnpm

ENV NPM_CONFIG_STORE_DIR=/root/.cache/pnpm

ENV PATH=$PNPM_HOME:$WORKSPACE_DIR/node_modules/.bin:$PATH

RUN pnpm add -g nx@17.1.3
