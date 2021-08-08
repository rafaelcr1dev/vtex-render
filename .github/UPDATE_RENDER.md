# Update Render

1. Add the "upstream" to your cloned repository ("origin"):

```sh
git remote add upstream git@github.com:corebiz-global/Vtex-Render-V3.git
```

2. Fetch the commits (and branches) from the "upstream":

```sh
git fetch upstream
```

3. Switch to the "master" branch of your fork ("origin"):

```sh
git checkout master
```

4. Stash the changes of your "master" branch:

```sh
git stash
```

5. Merge the changes from the "master" branch of the "upstream" into your the "master" branch of your "origin":

```sh
git merge upstream/master
```

6. Resolve merge conflicts if any and commit your merge

```sh
git commit -am "Merged from upstream"
```

7. Push the changes to your fork

```sh
git push
```

8. Get back your stashed changes (if any)

```sh
git stash pop
```

You're done! Congratulations!
