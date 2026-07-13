# Security Policy

## Supported Versions

Currently, only the latest major version of HealthRisk AI is supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of HealthRisk AI seriously. If you discover a security vulnerability within this project, please send an e-mail to the maintainer at `admin@healthrisk.ai` (or via a private GitHub vulnerability report). All security vulnerabilities will be promptly addressed.

Please **DO NOT** report security vulnerabilities via public GitHub issues.

## Environment Variables and Secrets

Never commit files containing sensitive information. Always use the `.env` file for local development.

The `.gitignore` file is configured to exclude:
* `.env`
* `.env.local`
* Any compiled datasets containing sensitive PII (Protected Health Information).

If you accidentally commit a secret, consider it compromised. Revoke the key/secret immediately and rotate it. You should also purge it from the Git history.
