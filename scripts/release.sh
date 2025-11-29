#!/bin/bash

# =============================================================================
# Simply Table - Production Release Script
# =============================================================================
# This script handles semantic versioning, documentation updates, and npm publishing
# with comprehensive error handling and rollback capabilities.
#
# Usage: ./scripts/release.sh [patch|minor|major]
# Example: ./scripts/release.sh patch
# =============================================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# Configuration
REQUIRED_BRANCH="main"
DOCS_VERSION_FILE="docs/src/pages/HomePage.tsx"
PACKAGE_JSON="package.json"
DOCS_PACKAGE_JSON="docs/package.json"

# =============================================================================
# Utility Functions
# =============================================================================

print_header() {
    echo -e "\n${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BOLD}${CYAN}  $1${NC}"
    echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_step() {
    echo -e "${CYAN}▶${NC} $1"
}

confirm() {
    local prompt="$1"
    local default="${2:-n}"
    
    if [ "$default" = "y" ]; then
        prompt="$prompt [Y/n]: "
    else
        prompt="$prompt [y/N]: "
    fi
    
    read -p "$(echo -e ${YELLOW}${prompt}${NC})" response
    response=${response:-$default}
    
    if [[ "$response" =~ ^[Yy]$ ]]; then
        return 0
    else
        return 1
    fi
}

# =============================================================================
# Validation Functions
# =============================================================================

validate_version_type() {
    local version_type="$1"
    if [[ ! "$version_type" =~ ^(patch|minor|major)$ ]]; then
        print_error "Invalid version type: $version_type"
        echo -e "\n${BOLD}Usage:${NC} $0 [patch|minor|major]"
        echo -e "\n${BOLD}Examples:${NC}"
        echo -e "  $0 patch  ${CYAN}# 0.1.6 → 0.1.7${NC}"
        echo -e "  $0 minor  ${CYAN}# 0.1.6 → 0.2.0${NC}"
        echo -e "  $0 major  ${CYAN}# 0.1.6 → 1.0.0${NC}"
        exit 1
    fi
}

check_git_status() {
    print_step "Checking git status..."
    
    if [ -n "$(git status --porcelain)" ]; then
        print_error "Working directory is not clean"
        echo -e "\n${YELLOW}Uncommitted changes:${NC}"
        git status --short
        echo ""
        if ! confirm "Continue anyway?"; then
            print_info "Release cancelled"
            exit 1
        fi
    else
        print_success "Working directory is clean"
    fi
}

check_branch() {
    print_step "Checking current branch..."
    
    local current_branch=$(git branch --show-current)
    if [ "$current_branch" != "$REQUIRED_BRANCH" ]; then
        print_error "Not on $REQUIRED_BRANCH branch (currently on: $current_branch)"
        if ! confirm "Continue anyway?"; then
            print_info "Release cancelled"
            exit 1
        fi
    else
        print_success "On $REQUIRED_BRANCH branch"
    fi
}

check_npm_auth() {
    print_step "Checking npm authentication..."
    
    if ! npm whoami &> /dev/null; then
        print_error "Not logged in to npm"
        print_info "Please run: npm login"
        exit 1
    else
        local npm_user=$(npm whoami)
        print_success "Logged in as: $npm_user"
    fi
}

check_dependencies() {
    print_step "Checking dependencies..."
    
    if [ ! -d "node_modules" ]; then
        print_warning "node_modules not found, installing dependencies..."
        npm install
    fi
    print_success "Dependencies are installed"
}

# =============================================================================
# Build and Test Functions
# =============================================================================

run_linter() {
    print_step "Running linter..."
    
    if npm run lint; then
        print_success "Linter passed"
    else
        print_error "Linter failed"
        if ! confirm "Continue anyway?"; then
            print_info "Release cancelled"
            exit 1
        fi
    fi
}

run_tests() {
    print_step "Running tests..."
    
    if npm test; then
        print_success "Tests passed"
    else
        print_error "Tests failed"
        if ! confirm "Continue anyway?"; then
            print_info "Release cancelled"
            exit 1
        fi
    fi
}

build_library() {
    print_step "Building library..."
    
    if npm run build; then
        print_success "Build completed successfully"
    else
        print_error "Build failed"
        exit 1
    fi
}

# =============================================================================
# Version Management Functions
# =============================================================================

get_current_version() {
    node -p "require('./package.json').version"
}

calculate_new_version() {
    local version_type="$1"
    local current_version=$(get_current_version)
    
    # Use npm version --dry-run to calculate new version
    npm version "$version_type" --no-git-tag-version --dry-run 2>&1 | grep -oP 'v\K[0-9]+\.[0-9]+\.[0-9]+'
}

update_package_version() {
    local version_type="$1"
    
    print_step "Updating package.json version..."
    
    # Update version in package.json
    npm version "$version_type" --no-git-tag-version
    
    local new_version=$(get_current_version)
    print_success "Updated to version $new_version"
    
    echo "$new_version"
}

update_docs_version() {
    local new_version="$1"
    
    print_step "Updating documentation version..."
    
    if [ -f "$DOCS_VERSION_FILE" ]; then
        # Update the version badge in HomePage.tsx
        # This looks for patterns like: v0.1.6 or version: "0.1.6"
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            sed -i '' "s/v[0-9]\+\.[0-9]\+\.[0-9]\+/v$new_version/g" "$DOCS_VERSION_FILE"
        else
            # Linux
            sed -i "s/v[0-9]\+\.[0-9]\+\.[0-9]\+/v$new_version/g" "$DOCS_VERSION_FILE"
        fi
        print_success "Updated documentation to version $new_version"
    else
        print_warning "Documentation version file not found: $DOCS_VERSION_FILE"
    fi
}

# =============================================================================
# Git Operations
# =============================================================================

commit_changes() {
    local new_version="$1"
    local version_type="$2"
    
    print_step "Committing changes..."
    
    git add "$PACKAGE_JSON" "$DOCS_VERSION_FILE" 2>/dev/null || true
    
    # Conventional commit message
    local commit_message="chore(release): bump version to $new_version

- $version_type version bump
- updated package.json
- updated documentation version"
    
    git commit -m "$commit_message"
    print_success "Changes committed"
}

create_git_tag() {
    local new_version="$1"
    
    print_step "Creating git tag..."
    
    git tag -a "v$new_version" -m "Release v$new_version"
    print_success "Created tag: v$new_version"
}

push_changes() {
    local new_version="$1"
    
    print_step "Pushing changes to remote..."
    
    if git push origin "$REQUIRED_BRANCH" && git push origin "v$new_version"; then
        print_success "Pushed changes and tags to remote"
    else
        print_error "Failed to push changes"
        print_warning "You may need to push manually:"
        echo -e "  ${CYAN}git push origin $REQUIRED_BRANCH${NC}"
        echo -e "  ${CYAN}git push origin v$new_version${NC}"
        if ! confirm "Continue with npm publish?"; then
            exit 1
        fi
    fi
}

# =============================================================================
# NPM Publishing
# =============================================================================

publish_to_npm() {
    print_step "Publishing to npm..."
    
    if npm publish --access public; then
        print_success "Published to npm successfully"
    else
        print_error "Failed to publish to npm"
        print_warning "The version has been committed and tagged"
        print_warning "You may need to publish manually: npm publish"
        exit 1
    fi
}

# =============================================================================
# Rollback Functions
# =============================================================================

rollback() {
    local new_version="$1"
    
    print_header "ROLLING BACK CHANGES"
    
    print_step "Removing git tag..."
    git tag -d "v$new_version" 2>/dev/null || true
    
    print_step "Resetting git changes..."
    git reset --hard HEAD~1 2>/dev/null || true
    
    print_warning "Rollback completed"
    print_info "Please verify your repository state"
}

# =============================================================================
# Main Script
# =============================================================================

main() {
    local version_type="$1"
    
    # Print banner
    echo -e "\n${BOLD}${CYAN}"
    echo "╔═══════════════════════════════════════════════════════════════╗"
    echo "║                                                               ║"
    echo "║              Simply Table - Release Script                    ║"
    echo "║                                                               ║"
    echo "╚═══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}\n"
    
    # Validate input
    if [ -z "$version_type" ]; then
        print_error "Version type is required"
        echo -e "\n${BOLD}Usage:${NC} $0 [patch|minor|major]"
        exit 1
    fi
    
    validate_version_type "$version_type"
    
    # Pre-flight checks
    print_header "PRE-FLIGHT CHECKS"
    check_git_status
    check_branch
    check_npm_auth
    check_dependencies
    
    # Calculate new version
    local current_version=$(get_current_version)
    local new_version=$(calculate_new_version "$version_type")
    
    echo -e "\n${BOLD}Version Change:${NC}"
    echo -e "  Current: ${YELLOW}$current_version${NC}"
    echo -e "  New:     ${GREEN}$new_version${NC}"
    echo -e "  Type:    ${CYAN}$version_type${NC}\n"
    
    if ! confirm "Proceed with release?"; then
        print_info "Release cancelled"
        exit 0
    fi
    
    # Build and test
    print_header "BUILD AND TEST"
    run_linter
    run_tests
    build_library
    
    # Update versions
    print_header "VERSION UPDATE"
    new_version=$(update_package_version "$version_type")
    update_docs_version "$new_version"
    
    # Git operations
    print_header "GIT OPERATIONS"
    commit_changes "$new_version" "$version_type"
    create_git_tag "$new_version"
    
    # Final confirmation
    echo -e "\n${BOLD}${YELLOW}⚠ FINAL CONFIRMATION ⚠${NC}"
    echo -e "About to:"
    echo -e "  1. Push changes to remote"
    echo -e "  2. Publish v$new_version to npm"
    echo ""
    
    if ! confirm "Are you absolutely sure?"; then
        print_warning "Release cancelled after version update"
        print_info "Changes have been committed locally but not pushed"
        print_info "To rollback: git reset --hard HEAD~1 && git tag -d v$new_version"
        exit 0
    fi
    
    # Push and publish
    print_header "PUBLISHING"
    push_changes "$new_version"
    publish_to_npm
    
    # Success!
    print_header "RELEASE COMPLETE"
    echo -e "${BOLD}${GREEN}✓ Successfully released v$new_version${NC}\n"
    echo -e "${BOLD}Next steps:${NC}"
    echo -e "  • View on npm: ${CYAN}https://www.npmjs.com/package/simply-table${NC}"
    echo -e "  • View on GitHub: ${CYAN}https://github.com/NativSibony/simply-table/releases/tag/v$new_version${NC}"
    echo -e "  • Create GitHub release notes (optional)"
    echo ""
}

# =============================================================================
# Error Handling
# =============================================================================

trap 'print_error "Script failed at line $LINENO"' ERR

# =============================================================================
# Script Entry Point
# =============================================================================

main "$@"