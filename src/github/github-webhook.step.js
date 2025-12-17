import {z} from "zod"

const githubIssueSchema = z.object({
  action: z.enum(['opened', 'edited', 'deleted', 'closed', 'reopened']),
  issue: z.object({
    id: z.number(),
    title: z.string(),
    number: z.number(),
    html_url: z.string(),
    state: z.enum(['open', 'closed']),
    body: z.string().nullable(),
    labels: z.array(z.any()).optional(),
    assignees: z.array(z.any()).optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
    closed_at: z.string().nullable().optional(),
  }),
  repository: z.object({
    name: z.string(),
    full_name: z.string(),
  }),
  sender: z.object({
    login: z.string(),
    id: z.number(),
  }),
});

export const config = {
  name: 'github-webhook',
  type: 'api',
  description: 'Receives GitHub issue and comment webhooks, routes to appropriate Notion handlers',
  path: '/github/webhooks',
  method: 'POST',
  emits : ["generate-notification-content"],
};

export const handler = async (req, { emit, logger }) => {
  try {
    const event = req.headers["x-github-event"];
    const action = req.body.action;
    logger.info("event : ", event)
    logger.info("body : ", req.body)

    const parsed = githubIssueSchema.safeParse(req.body);
    if (!parsed.success) {
      logger.error("Invalid issue payload", parsed.error);
      return;
    }

    const issue = req.body.issue;

    await emit({
      topic: "generate-notification-content",
      data: {
        action,
        number: issue.number,
        title: issue.title,
        state: issue.state,
        body: issue.body,
        html_url: issue.html_url,
        labels: issue.labels,
        assignees: issue.assignees,
        created_at: issue.created_at,
        updated_at: issue.updated_at,
        closed_at: issue.closed_at,

        repo_name: req.body.repository.full_name,
        actor: req.body.user.login,
      },
    });

    return ({ok : true})
    
  } catch (err) {
    logger.error("Some error occurred", err);
  }
};
