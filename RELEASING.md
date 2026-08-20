# Releasing autify-sdk-js

Two workflows automate this end to end. **Your only manual step is merging the
`Release X.Y.Z` PR** — that merge is the approval gate that ships the release.

> Source runbook: _How to release autify-sdk-js and other CI/CD integrations_ (Notion).

## Cutting a release

### 1. Trigger `Prepare release` (you start it)

GitHub → **Actions** → **Prepare release** → **Run workflow**, then pick:

- **bump**: `patch` / `minor` / `major`, **or**
- **version**: an explicit version like `1.2.3` (overrides `bump`).

[`release.yml`](.github/workflows/release.yml) checks out `main`, runs
`npm run build` + `npm test`, bumps `package.json` + `package-lock.json`, and
opens a **`Release X.Y.Z`** PR.

> `build-test.yml` does **not** run on the bot-opened PR (GitHub skips workflows
> on PRs created by `GITHUB_TOKEN`), which is why the prepare job runs build +
> test itself before opening the PR.
>
> If required status checks are ever enabled on `main`, the bot-opened PR would
> become unmergeable (those checks never run on it). Open the Release PR from a
> human account instead — see [Preparing the PR by hand](#preparing-the-pr-by-hand-instead-of-the-workflow).

### 2. Review & rebase-merge the PR (the approval gate)

Confirm the diff is only the version bump, then **Rebase merge** (the only merge
method enabled on this repo — `main` requires linear history). That's it — the
rest is automatic.

### 3. Publish happens automatically

The merge lands the version bump on `main`, which triggers
[`release-publish.yml`](.github/workflows/release-publish.yml). It:

1. Tags `vX.Y.Z` and creates the GitHub Release with generated notes.
2. Dispatches [`npm-publish.yml`](.github/workflows/npm-publish.yml) **pinned to
   the `vX.Y.Z` tag**, which publishes that exact commit to npm using **OIDC
   trusted publishing** (no token stored in the repo).

`npm-publish.yml` runs on `workflow_dispatch` only — `release-publish.yml` owns
publishing, so creating a GitHub Release by hand no longer publishes. It's
dispatched (rather than triggered by the release event) because a Release created
with `GITHUB_TOKEN` wouldn't re-trigger workflows anyway; `workflow_dispatch` is
exempt from that rule, so no PAT or GitHub App is needed.

Watch it: <https://github.com/autifyhq/autify-sdk-js/actions/workflows/npm-publish.yml>

## Preparing the PR by hand (instead of the workflow)

You only ever need to prepare and merge the `Release X.Y.Z` PR — `release-publish.yml`
handles tag + release + npm publish on merge, whether the PR was opened by the
workflow or by you. To open it from your terminal:

```sh
git switch main && git pull
npm version patch --no-git-tag-version          # or minor / major / an explicit version
V=$(node -p "require('./package.json').version")
git switch -c "release/v$V"
git commit -am "Release $V"
git push -u origin HEAD
gh pr create --base main --title "Release $V" --fill
# …then review & rebase-merge the PR. Publishing is automatic from there.
```

> Do **not** create the GitHub Release yourself when using this flow —
> `release-publish.yml` creates it on merge. Creating it by hand first would
> double up (the tag/release would already exist).

## Notes

- **Merge method:** rebase only (`main` enforces linear history; squash & merge-commit are disabled).
- **Release PRs** intentionally keep the plain `Release X.Y.Z` title (no Jira prefix) to match history.
- **Version tags** are `vX.Y.Z`; `package.json` holds `X.Y.Z` (no leading `v`).
- **`release-publish.yml` triggers on any push to `main` that touches `package.json`**, but no-ops
  unless the current version has no `vX.Y.Z` tag yet — so ordinary dependency bumps don't publish.
- **If publish fails after the tag + Release exist:** re-running `release-publish.yml` no-ops (the
  tag exists), so re-dispatch the publish yourself, pinned to the tag:
  `gh workflow run npm-publish.yml --ref vX.Y.Z`.
- **Pre-release housekeeping** — merging the weekly non-major npm-update PR and checking the Renovate
  Dependency Dashboard isn't rate-limited — lives in the Notion runbook named at the top.
