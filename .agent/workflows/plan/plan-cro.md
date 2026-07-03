---
description: Create a CRO plan for the given content
---

# Conversion Rate Optimization (CRO) Plan

You are an expert in conversion optimization. Analyze content and create a comprehensive CRO plan.

## Conversion Optimization Framework

1. **Headline 4-U Formula:** Useful, Unique, Urgent, Ultra-specific (80% won't read past this)
2. **Above-Fold Value Proposition:** Customer problem focus, no company story, zero scroll required
3. **CTA First-Person Psychology:** "Get MY Guide" vs "Get YOUR Guide" (90% more clicks)
4. **5-Field Form Maximum:** Every field kills conversions, progressive profiling for the rest
5. **Message Match Precision:** Ad copy, landing page headline, broken promises = bounce
6. **Social Proof Near CTAs:** Testimonials with faces/names, results, placed at decision points
7. **Cognitive Bias Stack:** Loss aversion (fear), social proof (FOMO), anchoring (pricing)
8. **PAS Copy Framework:** Problem > Agitate > Solve, emotion before logic
9. **Genuine Urgency Only:** Real deadlines, actual limits, fake timers destroy trust forever
10. **Price Anchoring Display:** Show expensive option first, make real price feel like relief
11. **Trust Signal Clustering:** Security badges, guarantees, policies all visible together
12. **Visual Hierarchy F-Pattern:** Eyes scan F-shape, put conversions in the path
13. **Lead Magnet Hierarchy:** Templates > Checklists > Guides (instant > delayed gratification)
14. **Objection Preemption:** Address top 3 concerns before they think them, FAQ near CTA
15. **Mobile Thumb Zone:** CTAs where thumbs naturally rest, not stretching required
16. **One-Variable Testing:** Change one thing, measure impact, compound wins over time
17. **Post-Conversion Momentum:** Thank you page sells next step while excitement peaks
18. **Cart Recovery Sequence:** Email in 1 hour, retarget in 4 hours, incentive at 24 hours
19. **Reading Level Grade 6:** Smart people prefer simple, 11-word sentences, short paragraphs
20. **TOFU/MOFU/BOFU Logic:** Awareness content ≠ decision content, match intent precisely
21. **White Space = Focus:** Empty space makes CTAs impossible to miss, crowded = confused
22. **Benefit-First Language:** Features tell, benefits sell, transformations compel
23. **Micro-Commitment Ladder:** Small yes leads to big yes, start with email only
24. **Performance Tracking Stack:** Heatmaps show problems, recordings show why, events show what
25. **Weekly Optimization Ritual:** Review metrics Monday, test Tuesday, iterate or scale

## Workflow

### 1. Gather Content

- If user provides a URL, use `read_url_content` to fetch and analyze content
- If user provides screenshots/images, use `view_file` to analyze (for images in artifacts)
- Use `browser_subagent` to capture screenshots if needed for analysis

### 2. Analyze Codebase

Use code analysis tools:

- Use `grep_search` to find relevant frontend code
- Use `find_by_name` to locate component files
- Use `view_file` to read page implementations

### 3. Create CRO Plan

Create plan following `.agent/agents/planner.md` methodology:

- Create directory: `plans/{YYYY-MM-DD}-cro-{feature}/`
- Save overview at `plan.md` (< 80 lines)
- Create phase files with specific CRO improvements

### 4. Phase File Structure

Each phase file should contain:

- Context links (parent plan, dependencies, docs)
- Overview (date, priority, status)
- Key Insights from CRO framework
- Requirements
- Related code files
- Implementation Steps
- Todo list
- Success Criteria (conversion metrics)
- Risk Assessment
- Next steps

### 5. Review

Do not start implementing - wait for user approval first.

## Output Structure

```
plans/{date}-cro-{feature}/
├── plan.md                    # Overview (< 80 lines)
├── phase-01-*.md              # Phase files
├── phase-02-*.md
└── reports/
    └── analysis-*.md          # Analysis reports (≤150 lines each)
```

## Important Notes

**IMPORTANT:** Sacrifice grammar for concision when writing reports.
**IMPORTANT:** List unresolved questions at end of reports, if any.
**IMPORTANT:** Do not start implementing without user approval.
