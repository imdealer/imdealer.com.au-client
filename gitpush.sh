#!/bin/bash
set -x
date=$(date '+%Y%m%d%H%M%S')
git add .
git commit -m "$date"
git push