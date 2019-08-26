# Contributing
## Commit flow
### Follow up
Make sure your code follow up the master branch version
``` javascript
$ git checkout master

$ git pull
```
### Branch switching
``` javascript
$ git checkout -b "prefix/description"
```
1. prefix: dev
2. description: detail branch feature {5...30}

### Commit messages
``` javascript
$ git commit -m "prefix: description"
```
1. prefix: feature | improvement | fix
2. description: {10..100}

### Pushing commit
``` javascript
$ git push branchName
```

### Create Pull Request
Go to Git GUI to create new Pull Request

### Final
Wait for feedbacks and re-code or the commited source code will be merged to master branch