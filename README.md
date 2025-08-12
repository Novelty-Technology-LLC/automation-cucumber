**Cypress** a JavaScript-based testing automation solution used for modern web automation.Cypress a JavaScript-based testing automation solution used for modern web automation.

**Cucumber** is a Behavior Driven Development tool used to develop test cases for the behavior of software's functionality. It allows users to write test cases that are easily understandable by non-technical stakeholders, using plain language to describe software behaviors in Gherkin syntax.The main focus of the Cucumber Testing is on the end-user experience, as the success of the software ultimately depends on the end-user experience.

**Gherkin** is a set of grammar rules that makes plain text structured enough for Cucumber to understand.

**Step definitions** connect Gherkin steps to programming code. A step definition carries out the action that should be performed by the step. So step definitions hard-wire the specification to the implementation.

**Behavior-Driven Development (BDD)** is a collaborative approach to software development that focuses on defining the behavior of an application through conversation and concrete examples.It focus on defining software behaviors in simple language, enhancing clarity across teams.

 ## Key Features of Cypress:

- Time travel for real-time debugging of web apps.

- Cypress network control.
- API testing capabilities.
- Innovative component testing capabilities.
- A beta version of Cypress Studio as a record and playback solution.
- Mocking and stubbing capabilities.
- Cypress is a great growing tool. It is fast to ramp up with and provides a good execution environment that is baked in. It is fully JavaScript/MochaJS oriented with specific new APIs to ease the scripting.

## System Prerequisites:
Cypress is a desktop application that is installed on your computer. The desktop application supports the following operating systems:

macOS 10.9 and above (64-bit only)
Linux Ubuntu 12.04 and above, Fedora 21 and Debian 8 (64-bit only)
Windows 7 and above

## Clone the project from github

After clone you need to download npm

```
npm install
```

So once everything is done, we need to open the cypress and we need command for it.
```
npx cypress open
```

Use the --tags option in the Cucumber command to execute only one feature file by specifying the unique hook (tag) name defined at the top of that feature file.

```
npx cypress run --env TAGS="@User"
```

Rename the env.example to .env and update accordingly.

### Note: 

Change the env file according to env.example file template with your credentials.




