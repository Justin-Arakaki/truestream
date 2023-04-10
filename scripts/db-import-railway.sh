#!/bin/sh

set -e

# shellcheck source=/dev/null
test -f .env && . .env

PGPASSWORD=JyANfAjb40z02nZhylVm psql -h containers-us-west-190.railway.app -U postgres -p 6626 -d railway -f database/schema.sql -f database/data.sql -f database/services-table.sql
