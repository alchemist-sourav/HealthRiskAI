# Contributing to HealthRisk AI

First off, thank you for considering contributing to HealthRisk AI! It's people like you that make HealthRisk AI such a great platform.

## Where do I go from here?

If you've noticed a bug or have a feature request, make sure to check our [Issues](https://github.com/alchemist-sourav/HealthRiskAI/issues) first to see if it's already being worked on. If not, go ahead and open a new issue!

## Fork & create a branch

If this is something you think you can fix, then fork HealthRisk AI and create a branch with a descriptive name.

A good branch name would be (where issue #325 is the ticket you're working on):

```sh
git checkout -b 325-add-new-chart-type
```

## Get the test suite running

Make sure the application builds and the linting passes:

```sh
# Frontend
cd frontend
npm run lint
npm run build

# Backend
cd backend
pip install -r requirements.txt
pytest
```

## Implement your fix or feature

At this point, you're ready to make your changes. Feel free to ask for help; everyone is a beginner at first.

## Make a Pull Request

At this point, you should switch back to your master branch and make sure it's up to date with HealthRisk AI's master branch:

```sh
git remote add upstream git@github.com:alchemist-sourav/HealthRiskAI.git
git checkout main
git pull upstream main
```

Then update your feature branch from your local copy of main, and push it!

```sh
git checkout 325-add-new-chart-type
git rebase main
git push --set-upstream origin 325-add-new-chart-type
```

Finally, go to GitHub and make a Pull Request!
