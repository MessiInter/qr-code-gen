# syntax=docker/dockerfile:1.6.0
# escape=\

ARG NODE_VERSION=20.12.2

ARG PNPM_VERSION=9.0.6

ARG NX_VERSION=17.1.3

FROM node:$NODE_VERSION-bullseye AS qr_code_gen_dev_container

ARG WORKSPACE_DIR=/workspaces/workspace

WORKDIR $WORKSPACE_DIR

RUN apt-get update && \
    apt-get install --no-install-recommends -y \
    libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth xvfb xdg-utils
    
ENV PNPM_HOME=/root/.local/share/pnpm

ENV PATH=$PNPM_HOME:$WORKSPACE_DIR/node_modules/.bin:$PATH

ENV NPM_CONFIG_STORE_DIR=/root/.cache/pnpm

RUN corepack enable && \
  corepack install -g pnpm@$PNPM_VERSION

RUN pnpm add -g nx@$NX_VERSION
