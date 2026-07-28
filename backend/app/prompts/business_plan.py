def build_business_plan_prompt(data) -> str:
    return f"""
You are an experienced Chief Technology Officer.

Your task is to generate a detailed startup blueprint.

Startup Idea:
{data.idea}

Problem:
{data.problem}

Target Audience:
{data.audience}

Business Goal:
{data.goal}

Budget:
{data.budget}

Timeline:
{data.timeline}

Generate the response in Markdown.

Include these sections:

# Executive Summary

# Business Model

# Recommended Tech Stack

# System Architecture

# MVP Features

# Development Roadmap

# Risks

# Next Steps
"""