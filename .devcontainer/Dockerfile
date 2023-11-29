# syntax=docker/dockerfile:1.6.0
# escape=\

FROM cypress/base:20.9.0 AS qr_code_gen_dev_container

ARG WORKSPACE_DIR=/workspaces/workspace

WORKDIR $WORKSPACE_DIR

RUN corepack enable && \
    corepack prepare --activate pnpm@8.11.0

ENV PNPM_HOME=/root/.local/share/pnpm

ENV PATH=$PNPM_HOME:$WORKSPACE_DIR/node_modules/.bin:$PATH

RUN pnpm add -g nx@17.1.3
