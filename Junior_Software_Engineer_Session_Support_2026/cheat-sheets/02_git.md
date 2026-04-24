# Git Cheat Sheet

## Three Trees
```
Working Directory  →  Index (Staging)  →  Repository (.git)
     git add ──────────────────────────►
                       git commit ──────────────────────────►
     git checkout ◄───────────────────────────────────────────
```

## Daily Workflow
```bash
git status                   # what changed?
git diff                     # unstaged changes
git diff --staged            # staged changes (vs last commit)
git add <file>               # stage specific file
git add -p                   # stage chunks interactively
git commit -m "message"      # commit with message
git log --oneline --graph    # pretty history
```

## Branching
```bash
git branch                   # list local branches
git branch feature/login     # create branch
git checkout -b feature/login # create + switch
git switch feature/login      # switch (modern)
git merge feature/login       # merge into current
git rebase main               # rebase current onto main
git branch -d feature/login   # delete merged branch
```

## Remote
```bash
git remote -v                 # list remotes
git clone <url>               # clone repo
git fetch origin              # download without merge
git pull origin main          # fetch + merge
git push origin feature/login # push branch
git push -u origin main       # push + set upstream
```

## Undo
```bash
git restore <file>           # discard working dir changes
git restore --staged <file>  # unstage
git revert <hash>            # new commit that undoes a commit (safe)
git reset --soft HEAD~1      # undo commit, keep staged
git reset --mixed HEAD~1     # undo commit, unstage
git reset --hard HEAD~1      # undo commit, discard changes ⚠️
```

## Stash
```bash
git stash                    # save WIP
git stash pop                # restore latest stash
git stash list               # all stashes
git stash drop stash@{0}     # discard stash
```

## Conflict Resolution
```bash
git merge feature            # conflict markers appear in files
# edit files: keep <<<< yours ==== theirs >>>>
git add <resolved-file>
git commit
```

## Tags
```bash
git tag v1.0.0               # lightweight tag
git tag -a v1.0.0 -m "msg"  # annotated tag
git push origin --tags       # push tags
```

## Commit Message Convention
```
<type>(<scope>): <subject>

feat(auth): add JWT refresh token endpoint
fix(ui): correct navbar z-index on mobile
docs(readme): update setup instructions
refactor(api): extract user service
test(auth): add password reset tests
```

## .gitignore Patterns
```
node_modules/    # directory
*.log            # file extension
.env             # specific file
!.env.example    # exception
dist/            # build output
```

## Git Flow (simplified)
```
main ──────────────────────────────────────────► (production)
       └─ develop ──────────────────────────► (integration)
                  └─ feature/xxx ──► merge to develop
                  └─ hotfix/xxx  ──► merge to main + develop
```
