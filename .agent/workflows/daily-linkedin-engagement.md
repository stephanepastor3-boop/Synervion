---
description: Daily workflow to scan LinkedIn for relevant content and propose responses to drive engagement.
---

# Daily LinkedIn Engagement Workflow (8AM IST)

This workflow guides the agent to find relevant LinkedIn conversations and participate in them to increase Synervion's visibility.

## 1. Discovery
Search for recent LinkedIn posts specifically related to Synervion's niche: Wellness, Health, Functional Mushrooms, Nutraceuticals.
**Strictly exclude:** Solar energy or unrelated categories.

**Action:**
Run `search_web` with queries like:
- `site:linkedin.com/posts/ "cordyceps"`
- `site:linkedin.com/posts/ "functional mushrooms"`
- `site:linkedin.com/posts/ "nutraceuticals"`
- `site:linkedin.com/posts/ "adaptogens"`
- `site:linkedin.com/posts/ "preventive health"`

*Tip:* Look for recent results in the search summary.

## 2. Content Analysis
Select a promising post URL from the search results that offers an opportunity to **increase brand awareness, drive traffic to Synervion.com, or convert**.

**Action:**
1.  **Read Content:** Use `read_url_content` on the LinkedIn Post URL.
    - *Note:* If the content is empty or behind an auth-wall, try another URL.
2.  **Extract Activity ID:** Look at the URL. It usually follows this format:
    `https://www.linkedin.com/posts/[slug]-activity-[ID]-...`
    The **Activity ID** is the numeric string (e.g., `7416395821937688576`).
    - Construct the URN: `urn:li:activity:[ID]`

## 3. Verify Access (Optional)
Check if the post allows public interaction.

**Action:**
Run the check script:
```bash
node scripts/check-social-actions.js "urn:li:activity:[ID]"
```

## 4. Draft Response
Analyze the post content and draft a response.

**CRITICAL GUIDELINES:**
- **Tone:** Human, authentic, and "far from AI-generated".
- **Strategy:** Must pique interest and drive engagement.
- **Avoid:** Generic praise ("Great post!"), salesy language, or robotic phrasing.
- **Goal:** Position Synervion as a thoughtful industry leader.

## 5. Approval & Execution
The proposed response must be sent for approval before publishing.

**Action 1: Send Approval Email**
Send an email to `stephane@synervion.com` with the draft comment and post link.
```bash
node scripts/send-approval-email.js "urn:li:activity:[ID]" "Proposed comment text..." "http://linkedin.com/posts/..."
```

**Action 2: Execute (After Approval)**
Once the user validates the draft (via chat or email reply), execute the comment:
```bash
node scripts/comment-linkedin.js "urn:li:activity:[ID]" "Approved comment text"
```

> [!IMPORTANT]
> This workflow should be triggered daily at **8:00 AM IST**.
