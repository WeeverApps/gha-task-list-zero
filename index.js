module.exports = robot => {
  robot.on(
    [
      "pull_request.opened",
      "pull_request.edited",
      "pull_request.synchronize",
      "pull_request.reopened"
    ],
    context => {
      const title = context.payload.pull_request.title;
      const body = context.payload.pull_request.body;
      const isUnChecked = /-\s\[\s\]/g.test(body);
      const status = isUnChecked ? "failure" : "success";

      robot.log(
        `Updating PR "${title}" (${context.payload.pull_request
          .html_url}): ${status}`
      );

      robot.log(`isUnchecked: ${isUnChecked}`);

      context.octokit.repos.createStatus(
        context.repo({
          sha: context.payload.pull_request.head.sha,
          state: status,
          description: isUnChecked
            ? "The task list is not completed yet"
            : "The task list is completed",
          context: "Task List Zero"
        })
      );
    }
  );
};
