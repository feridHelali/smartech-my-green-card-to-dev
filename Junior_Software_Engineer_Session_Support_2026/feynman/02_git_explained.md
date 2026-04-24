# Feynman Explanation: Git & Version Control

---

## The Time Machine + Parallel Universes Analogy

Imagine you're writing a novel on your computer. At some point you think: "I love what I have now, but I want to experiment with a completely different ending."

**Without Git**, you'd copy the folder: `novel_v1`, `novel_v2`, `novel_final`, `novel_FINAL_FINAL`... a mess.

**With Git**, you get two superpowers:

1. **Time machine** — at any point you can "save" a snapshot (`git commit`). Later you can go back to any snapshot, even years later.

2. **Parallel universes** — you can create a "branch", experiment freely, and if you don't like it, discard the branch. If you do like it, merge it back into your main timeline.

---

## The Three Zones

```
Working Directory    →    Staging Area    →    Repository
(your files)             (what goes next)      (history)
```

Think of it like packing a suitcase for a trip:

- **Working Directory**: everything spread across your room (your files on disk)
- **Staging Area**: what you've chosen to pack in the suitcase (`git add`)
- **Repository**: the locked suitcase, stored safely, with a label saying what trip it was for (`git commit`)

`git add` chooses what goes in. `git commit` locks the suitcase and tags it.

---

## What a Commit Actually Is

A commit is a **snapshot**, not a diff. It records the complete state of your files at that moment, plus:
- A unique ID (SHA hash like `a3f8c2d...`)
- A pointer to the previous commit (parent)
- Your name, email, timestamp
- Your message

Git builds a **chain of snapshots** → that's the history.

---

## Branches: Just a Pointer

A branch is simply a sticky note pointing to a commit. When you commit, the sticky note moves forward to the new commit.

`main` → points to the latest commit on the main line  
`feature/login` → points to the latest commit on your feature  

`git checkout feature/login` just moves your focus (HEAD) to that branch.

---

## The Remote (GitHub): A Shared Folder

Your local repo is private. GitHub is a shared copy that anyone on your team can access.

- `git push` → upload your commits to GitHub
- `git pull` → download teammates' commits and apply them to your branch
- `git fetch` → download but don't apply yet (safe look without touching your work)

---

## Merge Conflicts: Two People Editing the Same Line

If Alice and Bob both edit line 42 of the same file, Git can't decide automatically which version is correct. It puts conflict markers in the file:

```
<<<<<<< Alice's version
const greeting = "Hello!"
=======
const greeting = "Bonjour!"
>>>>>>> Bob's version
```

A human must open the file, decide what to keep, remove the markers, and commit the resolution.

---

## The "Aha" Moment

Git isn't about saving files — it's about **collaborating on history**. Every commit is a decision preserved forever. Good commit messages are like diary entries explaining *why* you made a choice, which is invaluable six months later when you've forgotten.

---

## Test Yourself (Feynman Check)

- [ ] Explain what `git commit -m "message"` actually stores.
- [ ] Why do we create a branch before adding a feature instead of working on main?
- [ ] If you `git reset --hard HEAD~1`, what happens to your changes?
- [ ] What is the difference between merge and rebase, in your own words?
