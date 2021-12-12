#!/usr/bin/env bash

set -euo pipefail

declare -r FIGFONT_EXT="flf"
declare INPUT_DIRECTORY
declare OUTPUT_DIRECTORY

# ==============================================================================
# Logging
# ==============================================================================

function log() {
  echo -e "$(TZ=Etc/GMT-0 printf '%(%Y-%m-%d %H:%M:%S)T\n' -1)\t${1}"
}

function usage() {
  cat <<EOF
Generate the TypeScript types for InternalFont, which is a union of all internal
Figlet font file names.

Usage:
  ${BASH_SOURCE[0]} --input DIRECTORY --output DIRECTORY

Options:
  --help          Show this message.
  --input-dir     The directory containing the Figlet font files.
  --output-dir    The directory to output the generated type file into.
EOF
}

# ==============================================================================
# Arguments
# ==============================================================================

function parse_arguments() {
  while [[ $# -gt 0 ]]; do
    case "$1" in
    --help)
      usage
      exit 0
      ;;
    --input-dir)
      INPUT_DIRECTORY="${2}"
      readonly INPUT_DIRECTORY
      shift 2
      ;;
    --output-dir)
      OUTPUT_DIRECTORY="${2}"
      readonly OUTPUT_DIRECTORY
      shift 2
      ;;
    *)
      log "ERROR: Unknown option: ${1}"
      usage
      exit 1
      ;;
    esac
  done
}

function validate_arguments() {
  if [[ ! -v INPUT_DIRECTORY ]]; then
    log "ERROR: Must specify the input directory containing the Figlet font files"
    usage
    exit 1
  fi

  if [[ ! -v OUTPUT_DIRECTORY ]]; then
    log "ERROR: Must specify the output directory to write the generated file into"
    usage
    exit 1
  fi
}

# ==============================================================================
# Generator
# ==============================================================================

function generate_internal_font_type() {
  local fonts

  log "Searching ${INPUT_DIRECTORY} for all Figlet font files"

  fonts=$(find "${INPUT_DIRECTORY}" -type f -name "*.${FIGFONT_EXT}" -print0 |
    sort -z |
    xargs -0 -I path basename -a -s .flf path |
    xargs printf '  | "%b"\n')

  log "Found $(echo "${fonts}" | wc -l | tr -d '[:space:]') font files"

  cat >"${OUTPUT_DIRECTORY}/internal-fonts.ts" <<EOF
export type InternalFont =
${fonts}
EOF
}

# ==============================================================================
# Main
# ==============================================================================

function main() {
  parse_arguments "$@"
  validate_arguments

  log "Generating InternalFont type..."

  generate_internal_font_type

  log "Completed type generation - output file to ${OUTPUT_DIRECTORY}"
}

main "$@"
