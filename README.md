# Phocas Desk layout exercise

## Development
The API is a spring boot Java app. It uses a local version of dynamoDB for its storage.
The state will be cleared if you stop the API and delete the `backend/database` folder.

### Hidden files in ZIP
Within the zip file, some files start with a `.` These are the `.github`, `.gitignore` and `.devcontainer` folders. Please make sure these get included in the repo. Without the `.devcontainer` folder, codespaces will not configure correctly.
Some operating systems will hide these files by default. If using codespaces, find it is easiest to drag the zip file into the codespaces and unzip from the terminal with `unzip desk-exercise.zip`

### Github Codespaces
For this exercise, it is most straightforward to use github codespaces. This removes any setup requirements from your machine. GitHub provides a free monthly quota for this tool as well.

After you have added this code to a github repository, click the `<> Code` button.
In that popup, click `Create codespace on main`

This will take a while to build the dev container.
Once that has been created in the terminal of the github codespace run

*You may need to create a new terminal with the `+` button to the right of the terminal panel and enter*

```
pnpm i
pnpm start
```

As this starts, a toaster popup at the bottom right should appear, allowing you to open the app in a new tab.


### devcontainer
If you do not wish to use Codespaces, opening the exercise in vscode should prompt with a [devcontainer](https://containers.dev/) toaster message. Excepting this will auto-configure a docker container for development

### manual setup
If you would rather run this directly on your machine, you will need the following software installed.
`node`<br>
`pnpm`<br>
`java 21+`<br>
`mvn`<br>


## Getting started
to setup the application, run
`pnpm i`

`pnpm start`

There is also

`pnpm test`

to run all the unit tests

and

`pnpm check:fix`

to run the linter

When the api is running, you can rebuild the generated types with

`pnpm codegen`

You will need to run this command every time you change the GraphQL queries in the app.

## Tasks
Please **only do 3** of the following tasks.
- [ ] implement `calculateDeskLayout` in `calculateDeskLayout.ts` (REQUIRED)
- [ ] fix bug with `TeamsPage.tsx` where editing the team name fails
- [ ] Implement a new feature on the Teams page that allows the removal of people from a team
- [ ] implement delete on teams page
- [ ] implement visual representation of desk layout instead of list (rectangles for desks or similar)
- [ ] add backend persistence to the Desk Layout so it is not recalculated per page load
- [ ] add data validation checks to API

## Review process
Please create a Github repo that is shared with ...

The first commit should be this code without any modifications so we can use the commit history to see your changes.
