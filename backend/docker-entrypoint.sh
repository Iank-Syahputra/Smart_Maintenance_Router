#!/bin/sh
set -e

npx prisma db push --schema=prisma/schema.prisma
node prisma/seed.js

exec "$@"
