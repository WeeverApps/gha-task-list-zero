# Task List Zero GitHub Action

This action checks to see if a PR's task lists are all checked, and passes status checks if so.

# How to add

```
    - name: Task List Zero
      uses: WeeverApps/gha-task-list-zero@v1.0
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```