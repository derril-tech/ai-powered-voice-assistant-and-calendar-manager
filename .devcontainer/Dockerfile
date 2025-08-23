FROM mcr.microsoft.com/devcontainers/javascript-node:18

# Install Python and pip
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    && rm -rf /var/lib/apt/lists/*

# Install pnpm
RUN npm install -g pnpm

# Install Python dependencies
RUN pip3 install --upgrade pip
RUN pip3 install black flake8

# Set up Python virtual environment
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Install PostgreSQL client
RUN apt-get update && apt-get install -y \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /workspace

# Copy package files for better caching
COPY package.json pnpm-workspace.yaml ./
COPY apps/frontend/package.json ./apps/frontend/
COPY apps/backend/requirements.txt ./apps/backend/

# Install dependencies
RUN pnpm install

# Install Python dependencies
RUN pip3 install -r apps/backend/requirements.txt

# Set default shell
SHELL ["/bin/bash", "-c"]
