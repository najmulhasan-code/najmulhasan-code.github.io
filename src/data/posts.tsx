import { ReactNode } from 'react';

/**
 * =============================================================================
 * POSTS DATA FILE
 * =============================================================================
 *
 * This file contains all blog posts for the Writing section.
 * Posts are stored as an array of objects with JSX content.
 *
 * =============================================================================
 * HOW TO ADD A NEW POST
 * =============================================================================
 *
 * 1. Copy the template below and add it to the `posts` array
 * 2. Fill in the metadata (slug, title, date, etc.)
 * 3. Write your content using JSX elements
 * 4. Set published: true when ready to publish
 *
 * TEMPLATE:
 * ---------
 * {
 *   slug: 'your-post-url-slug',           // URL: /writing/your-post-url-slug
 *   title: 'Your Post Title',             // Displayed as the main heading
 *   date: '2025-12-19',                   // Format: YYYY-MM-DD
 *   description: 'A brief summary...',    // Shows in previews (1-2 sentences)
 *   tags: ['Tag1', 'Tag2'],               // Categories for the post
 *   readingTime: 5,                       // Estimated minutes to read
 *   published: true,                      // false = draft, true = live
 *   content: (
 *     <>
 *       <p>Your first paragraph...</p>
 *       <h2>Section Heading</h2>
 *       <p>More content...</p>
 *     </>
 *   ),
 * },
 *
 * =============================================================================
 * JSX ELEMENTS YOU CAN USE
 * =============================================================================
 *
 * Text:
 *   <p>Paragraph text</p>
 *   <h2>Section heading</h2>
 *   <h3>Subsection heading</h3>
 *
 * Lists:
 *   <ul><li>Bullet point</li></ul>
 *   <ol><li>Numbered item</li></ol>
 *
 * Code:
 *   <code>inline code</code>
 *   <pre><code>code block</code></pre>
 *   <pre><code>{`multiline code block`}</code></pre>
 *
 * Links:
 *   <a href="https://example.com" target="_blank" rel="noopener noreferrer">Link text</a>
 *
 * Images:
 *   <p>
 *     <img
 *       src="/images/folder/image.png"
 *       alt="Description"
 *       loading="lazy"
 *       style={{ width: '100%', borderRadius: '8px' }}
 *     />
 *   </p>
 *
 * Other:
 *   <hr /> for horizontal line
 *   &apos; for apostrophes
 *   &quot; for quotes
 *
 * =============================================================================
 */

/**
 * Post interface defining the structure of each blog post
 */
export interface Post {
  /** URL-friendly identifier (e.g., 'my-first-post' -> /writing/my-first-post) */
  slug: string;

  /** Post title displayed as the main heading */
  title: string;

  /** Publication date in YYYY-MM-DD format */
  date: string;

  /** Optional: Date when post was last updated */
  updatedDate?: string;

  /** Brief summary shown in previews (1-2 sentences) */
  description: string;

  /** Categories/topics for the post */
  tags: string[];

  /** Estimated reading time in minutes */
  readingTime: number;

  /** Set to false to save as draft, true to publish */
  published: boolean;

  /** JSX content of the post */
  content: ReactNode;
}

/**
 * Formats a date string (YYYY-MM-DD) to a readable format (e.g., "December 19, 2025")
 * Uses UTC to avoid timezone issues
 */
export function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * =============================================================================
 * POSTS ARRAY
 * =============================================================================
 *
 * Add new posts to this array. Most recent posts should be at the top.
 * Posts are automatically sorted by date, but keeping newest first helps readability.
 */
export const posts: Post[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // POST: SAGE Multi-Agent Deliberation
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'sage-multi-agent-deliberation',
    title: 'SAGE: When One AI Isn\'t Enough',
    date: '2025-12-19',
    description: 'A multi-agent framework where AI agents research, debate, and synthesize answers together.',
    tags: ['LLMs', 'Multi-Agent', 'Python'],
    readingTime: 4,
    published: true,
    content: (
      <>
        <p>
          <img
            src="/images/SAGE/SAGE.png"
            alt="SAGE - Synchronized Agents for Generalized Expertise"
            loading="lazy"
            style={{ width: '100%', borderRadius: '8px', marginBottom: '1.5rem' }}
          />
        </p>

        <p>
          Ask a language model a question and you get one answer. One perspective. One viewpoint. That works fine for simple queries. But complex problems like architecture decisions, security reviews, or research questions benefit from multiple angles. A single model, no matter how capable, has blind spots.
        </p>

        <p>
          SAGE takes a different approach. Instead of relying on one model&apos;s response, it puts together a team of specialized agents. Each agent has a distinct role: one gathers facts, another pokes holes in arguments, a third proposes solutions. They work independently at first, then share findings and challenge each other before producing a final, synthesized answer. You can run it from your terminal or import it as a Python library into your own code.
        </p>

        <p>
          The idea is simple: multiple perspectives catch what one might miss.
        </p>

        <h2>The Three-Phase Workflow</h2>

        <p>
          Every question runs through three phases. In the first phase, research, each agent investigates on their own. The researcher might search the web for current best practices while the critic looks for common pitfalls. They don&apos;t see each other&apos;s work yet. This prevents groupthink and ensures diverse starting points.
        </p>

        <p>
          <img
            src="/images/SAGE/sage1.png"
            alt="Research Phase"
            loading="lazy"
            style={{ width: '100%', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '0.5rem' }}
          />
        </p>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', textAlign: 'center', marginBottom: '1.5rem' }}>
          Research phase: agents gather information independently
        </p>

        <p>
          The second phase is discussion. Agents now see what others found. The critic challenges the researcher&apos;s assumptions. The strategist builds on both perspectives. They can run code to validate technical claims or do additional searches to fill gaps. This is where the real value shows up. Agents catch each other&apos;s blind spots, question assumptions, and refine ideas together.
        </p>

        <p>
          <img
            src="/images/SAGE/sage2.png"
            alt="Discussion Phase"
            loading="lazy"
            style={{ width: '100%', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '0.5rem' }}
          />
        </p>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', textAlign: 'center', marginBottom: '1.5rem' }}>
          Discussion phase: agents share findings and debate
        </p>

        <p>
          Finally, synthesis. All perspectives merge into a final answer. Points of agreement get emphasized. Disagreements are flagged rather than hidden. The output addresses the original question while incorporating the diverse viewpoints that came up during discussion.
        </p>

        <p>
          <img
            src="/images/SAGE/sage3.png"
            alt="Synthesis Phase"
            loading="lazy"
            style={{ width: '100%', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '0.5rem' }}
          />
        </p>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', textAlign: 'center', marginBottom: '1.5rem' }}>
          Synthesis phase: perspectives merge into a final answer
        </p>

        <h2>Getting Started</h2>

        <p>
          SAGE runs in your terminal. It&apos;s available on PyPI, so installation takes one command:
        </p>

        <pre><code>pip install agentsage</code></pre>

        <p>
          After setting an API key for your preferred provider, you can run it directly from the terminal:
        </p>

        <pre><code>{`sage "What database should I use for a high-traffic e-commerce platform?"`}</code></pre>

        <p>
          By default, SAGE puts together three agents: a researcher, a critic, and a strategist. It then runs the three-phase workflow. The whole process takes longer than a single API call, but the output tends to be more thorough and balanced.
        </p>

        <p>
          You can customize the agent team for different use cases. A security review might use security analysts, compliance experts, and penetration testers. An architecture review might bring together system architects, DevOps engineers, and performance specialists. Just define roles and focus areas that fit your specific problem.
        </p>

        <pre><code>{`sage "Review this authentication flow" --agents security,compliance,reviewer`}</code></pre>

        <h2>Beyond the Terminal</h2>

        <p>
          For integration into larger systems, SAGE provides a Python API. The basic pattern involves creating a Sage instance, defining agents, and calling the solve method:
        </p>

        <pre><code>{`from sage import Sage, Agent

sage = Sage(model="gpt-4o")

agents = [
    Agent(role="researcher", focus="Gather relevant facts and data"),
    Agent(role="critic", focus="Identify flaws and counterarguments"),
    Agent(role="strategist", focus="Propose practical solutions"),
]

result = sage.solve(
    "How should we handle authentication in our microservices?",
    agents
)

print(result.summary)`}</code></pre>

        <p>
          The API supports callbacks for tracking progress in real-time, configuration options for controlling agent behavior, and structured access to individual agent contributions. Results can be exported as JSON for further processing.
        </p>

        <p>
          Custom agent teams open up interesting possibilities. A security team might include a security analyst focused on vulnerabilities, a compliance expert checking regulatory requirements, and someone thinking like an attacker. An architecture team could combine perspectives from system design, operations, and performance engineering. The agents are just roles with instructions, so you can define whatever combination fits your use case.
        </p>

        <h2>Model Flexibility</h2>

        <p>
          SAGE works with models from OpenAI, Anthropic, Google, and Ollama. The provider is auto-detected from the model name, so switching between providers is straightforward:
        </p>

        <pre><code>{`sage = Sage(model="gpt-4o")            # OpenAI
sage = Sage(model="claude-sonnet-4-5")  # Anthropic
sage = Sage(model="gemini-2.5-flash")   # Google
sage = Sage(model="llama3.2:latest")    # Ollama (local)`}</code></pre>

        <p>
          Running locally with Ollama means no API costs and full privacy. All processing stays on your machine. Cloud providers offer stronger reasoning capabilities but come with latency and cost considerations, especially since each agent makes separate API calls.
        </p>

        <h2>Agent Roles</h2>

        <p>
          SAGE includes nine predefined roles: researcher, critic, strategist, analyst, creative, technical, reviewer, security, and performance. Each has default focus instructions tuned for its purpose. The researcher gathers facts. The critic identifies flaws and counterarguments. The strategist proposes practical next steps. And so on.
        </p>

        <p>
          These defaults work for general use, but the real power comes from customization. Any role can be overridden with specific instructions, and entirely new roles can be created. A &quot;regulatory_expert&quot; might focus on compliance implications. A &quot;cost_analyst&quot; might evaluate financial trade-offs. The framework doesn&apos;t limit the types of perspectives you can bring together.
        </p>

        <h2>Trade-offs</h2>

        <p>
          The multi-agent approach has costs. Simple questions gain nothing from deliberation, just added latency and expense. The three-phase workflow makes multiple API calls per agent, which adds up. And there&apos;s no guarantee the agents will actually disagree productively. They sometimes converge too quickly on consensus.
        </p>

        <p>
          But for complex questions where thoroughness matters more than speed, the approach has merit. Architecture decisions, security reviews, and research questions benefit from structured debate. The output captures nuance that single-shot responses often miss.
        </p>

        <hr />

        <p>
          SAGE is open source under the MIT license. The code is available on GitHub, and the package can be installed from PyPI with <code>pip install agentsage</code>.
        </p>

        <p style={{ marginTop: '1.5rem' }}>
          <a href="https://github.com/najmulhasan-code/sage" target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </p>
      </>
    ),
  },
];

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Returns all published posts, sorted by date (newest first)
 */
export function getAllPosts(): Post[] {
  return posts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Returns a single post by its slug, or undefined if not found
 */
export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(post => post.slug === slug && post.published);
}

/**
 * Returns all unique tags from published posts, sorted alphabetically
 */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  posts.forEach(post => {
    if (post.published) {
      post.tags.forEach(tag => tags.add(tag));
    }
  });
  return Array.from(tags).sort();
}

/**
 * Returns all published posts that have a specific tag
 */
export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter(post => post.tags.includes(tag));
}
