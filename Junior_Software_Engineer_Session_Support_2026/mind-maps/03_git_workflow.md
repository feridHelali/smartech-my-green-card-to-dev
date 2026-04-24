# Mind Map: Git Workflow & Version Control

## Git Object Model

```mermaid
graph TD
    subgraph "Working Directory"
        WD[Modified Files]
    end
    subgraph "Index / Staging Area"
        IDX[Staged Snapshot]
    end
    subgraph "Local Repository .git"
        COMMIT[Commit Object]
        TREE[Tree Object]
        BLOB[Blob Objects]
        HEAD[HEAD pointer]
        BRANCH[Branch refs]
    end
    subgraph "Remote"
        REMOTE[origin/main]
    end

    WD -->|git add| IDX
    IDX -->|git commit| COMMIT
    COMMIT --> TREE --> BLOB
    COMMIT --> HEAD
    BRANCH --> COMMIT
    COMMIT -->|git push| REMOTE
    REMOTE -->|git pull| COMMIT
```

## Branching Strategy (Git Flow)

```mermaid
gitGraph
   commit id: "Initial commit"
   branch develop
   checkout develop
   commit id: "Setup project"
   branch feature/auth
   checkout feature/auth
   commit id: "Add login"
   commit id: "Add JWT"
   checkout develop
   merge feature/auth id: "Merge auth"
   branch feature/dashboard
   checkout feature/dashboard
   commit id: "Add dashboard"
   checkout develop
   merge feature/dashboard
   checkout main
   merge develop id: "Release v1.0" tag: "v1.0.0"
   branch hotfix/login-bug
   checkout hotfix/login-bug
   commit id: "Fix null email"
   checkout main
   merge hotfix/login-bug tag: "v1.0.1"
   checkout develop
   merge hotfix/login-bug
```

## Git Commit Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Untracked: new file
    Untracked --> Staged: git add
    Staged --> Committed: git commit
    Committed --> Modified: edit file
    Modified --> Staged: git add
    Staged --> Modified: git restore --staged
    Modified --> Untracked: git restore
    Committed --> [*]: git log shows it
```

## Pull Request / Code Review Flow

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant Git as GitHub/GitLab
    participant CI as CI/CD
    participant Rev as Reviewer

    Dev->>Git: git push origin feature/xxx
    Dev->>Git: Create Pull Request
    Git->>CI: Trigger pipeline
    CI->>CI: Run lint + tests + build
    CI-->>Git: ✓ Checks passed
    Git->>Rev: Request review
    Rev->>Git: Add comments
    Dev->>Dev: Fix comments
    Dev->>Git: git push (update PR)
    Rev->>Git: Approve ✓
    Git->>Git: Merge to main
    Git->>CI: Deploy pipeline
```

## Git Commands Mindmap

```mermaid
mindmap
  root((git))
    Setup
      init
      clone
      config
      remote
    Snapshot
      add
      commit
      status
      diff
      log
    Branch
      branch
      switch
      checkout
      merge
      rebase
    Remote Sync
      fetch
      pull
      push
    Undo
      restore
      revert
      reset
      stash
    Inspect
      log
      blame
      show
      grep
    Tags
      tag
      push --tags
```

## Conflict Resolution Workflow

```mermaid
flowchart TD
    A[git merge feature] --> B{Conflict?}
    B -->|No| C[Auto-merge commit]
    B -->|Yes| D[<<<< yours ==== theirs >>>> in file]
    D --> E[Open file, decide what to keep]
    E --> F[Remove conflict markers]
    F --> G[git add resolved-file]
    G --> H[git commit]
    H --> I[Merge complete]
    C --> I
```
