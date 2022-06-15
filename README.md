# Honesto - Frontend Practical Exercise

Honesto is an application allowing peers to leave feedback for other team members. For this exercise, you are to
implement the required tasks below, along with any bonus tasks you also have time to complete.

Designs for all tasks are [available in Figma](https://www.figma.com/file/WZykxZoiJUbjnaYM66tLgn/Practical---FE-Exercise---Honesto-1.2), please follow these designs for all tasks.

Each task needs to be its own PR, with a thorough description and no unrelated changes, merged to main (no reviews are required). Git usage is very important. For this exercise, we won't enforce any style, but we want to get a clear overview of your work just by looking at your commit history.

The application has a few small changes from Figma to help in development of the following tasks:

- The login page allows you to quickly login as a different user to see the data from the perspective of that user.
- The time period for giving reviews is intentionally absent from the application, so for this exercise treat the feedback as a one time event rather than per time period. There is an optional task to extend this functionality to monthly reports.

## Task 1: Gather Feedback

A user can provide feedback on other team members (_"Share Feedback" in Figma_). For a selected team member, they will answer a series of questions.

- The questions to ask are already stored in the React context. Keep in mind that some are _skippable_.
- Create the user interface needed to ask and collect answers for each question for a selected team member.
- Update the app to save the results of the feedback. _The saved results do not need to persist through a page refresh but the app should allow full navigation without data loss._
- Your data model should support feedback from/to various users.

## Task 2: Display Feedback Given

After having given feedback, a user can review all the feedback they have given to other team members (_"My Feedback" in Figma_).

- Display all feedback given by the current user.
- Include the case of when no feedback has been given.

## Task 3: Display Received Feedback

Besides giving feedback, a user can also see feedback received from their team (_This does not exist in Figma other than the navigation item "Team Feedback", but you can model it after the layout of the previous task._).

- Display the feedback received by the current user from other team members.
- Include the case of when no feedback has been received.

## Bonus Tasks (optional)

Feel free to also implement any the following task if you are just getting warmed up:

- [ ] Add Accessibility (A11y) testing and update components to comply
- [ ] Create a dark theme for the project
- [x] Make the logged user widget, displayed in the upper-right corner the same as in designs
- [/] Make the app more responsive on various devices
- [ ] Update the app to have multiple feedback collections (per month) for each user
- [ ] Write some tests (jest, cypress, react testing library, etc)
- [x] Add documentation about your tasks to help other developers understand decisions you made

## Demo video

After you've wrapped up your project, please record a simple video, going through the main flows

- Going through the feedback form
- Giving multiple feedbacks
- Logging out and in with a different user and checking the previously given feedback

# Ismael Arias's notes

For my commits I use a interactive rebase you will see a couple of bullets in the PR's each of them are individuals commit ease
to go back just git a `git reflog`

#### Task 1: Gather Feedback

- For the first task I started by creating the html structure for the question component, and make them reusable,
  for manage the data I keep the same Context Api style from the others context provider.
- The data model in the feedback handle the from/to from the user, and some elements from the question and the answers
- Create a useQuestion custom hook for a easy way to handle the questios logic even that I add some methods to keep the
  component reactivity

#### Task 2: Display Feedback Given

- For manage the feedbacks I create the Feedback Context where all the feedback provided are store.
- For showing the answers in the feedback I reused the question components so they are flexible for getting and display data
- Also create a reusabel badge component for the new and the feedback count in the header

#### Task 3: Display Received Feedback

- I reused the MyFeedback component since I expend some hour in make the MyFeedback reusable the Team Feedback was really easy
  to build.
- The responsive was kind of worked in the MyFeedback and TeamFeedback but just for a couple of components
