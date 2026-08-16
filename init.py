import os

dirs = [
    'reference', 'documents', 'security', 'walkthrough', 'skills',
    'src/app', 'src/components', 'src/lib', 'src/styles', 'src/types',
    'public/icons', 'public/images', 'public/og',
    'tests/unit', 'tests/integration', 'tests/e2e',
    'skills/ui-ux-pro-max', 'skills/gsap-animation', 'skills/taste', 'skills/agentic-awesome-antigravity'
]

for d in dirs:
    os.makedirs(d, exist_ok=True)

files = {
    'reference/README.md': '# Reference Images\\nStore design references here.',
    'reference/.gitkeep': '',
    'documents/PRD.md': '# Pearl International PRD\\n\\n## Vision\\nPremium professional agricultural export website.\\n\\n## Pages\\nHome, About Us, Products, Product Category, Product Detail, Quality, Services, Contact Us, Enquire Now, Thank You, Privacy Policy, Terms & Conditions.',
    'documents/DESIGN-SYSTEM.md': '# Design System\\n\\n## Colors\\nDeep navy, Warm metallic gold, Ivory, Warm white, Neutral charcoal, Soft warm gray.\\n\\n## Typography\\nElegant editorial serif, Clean modern sans-serif.',
    'documents/SEO-SPEC.md': '# SEO Specification\\n\\nRequires unique titles, meta descriptions, sitemap.xml, robots.txt, structured data.',
    'documents/CONTENT-REQUIREMENTS.md': '# Content Requirements\\n\\nSeparate verified content from placeholder content.',
    'documents/CLIENT-REQUIREMENTS.md': '# Client Requirements\\n\\nPremium professional export website with 4-5 major public content pages initially. Product catalogue, 3 categories, 7 products, bulk enquiry, contact form, WhatsApp CTA, mobile-first design, SEO, Security, Supabase backend.',
    'documents/ARCHITECTURE-OVERVIEW.md': '# Architecture Overview\\n\\n## Current Phase\\nUI-first implementation.\\n\\n## Future\\nFrontend -> Data layer -> Supabase -> Enquiry storage -> Email/notification service -> Admin.',
    'security/SECURITY-IMPLEMENTATION.md': '# Security Implementation\\n\\nDefense-in-depth requirements covering OWASP Top 10, least privilege, HTTPS, HSTS, CSP, input validation, rate limiting.',
    'security/SECURITY-CHECKLIST.md': '# Security Checklist\\n\\n- [ ] Secrets\\n- [ ] Database\\n- [ ] RLS\\n- [ ] Forms\\n- [ ] API\\n- [ ] Dependencies',
    'security/SECURITY-CHANGELOG.md': '# Security Changelog\\n\\n- Initial security architecture baseline established.',
    'walkthrough/PROJECT-CONTEXT.md': '# Project Context\\n\\nPearl International is a B2B agricultural export company. Objective: Present company, showcase products, generate B2B leads.',
    'walkthrough/CURRENT-STATE.md': '# Current State\\n\\nStatus: PROJECT INITIALIZATION\\n\\nCompleted:\\n- Official full logo asset exists.\\n- Official logo mark asset exists.\\n- Client visual references have been supplied.\\n- Product taxonomy is defined.\\n- Supabase MCP is available for future backend work.\\n\\nCurrent phase: PROJECT FOUNDATION\\nNext phase: UI/UX IMPLEMENTATION\\nBackend status: NOT YET IMPLEMENTED\\nDatabase status: NOT YET IMPLEMENTED\\nAuthentication: NOT YET IMPLEMENTED\\nAdmin: NOT YET IMPLEMENTED\\nSecurity architecture: BEING ESTABLISHED',
    'walkthrough/ARCHITECTURE.md': '# Architecture\\n\\nFrontend: Next.js App Router (TypeScript, Tailwind v4)\\nBackend: Supabase (future)\\nData flow: UI -> Supabase API -> DB',
    'walkthrough/DECISIONS.md': '# Decisions\\n\\n- Frontend: Next.js App Router, Tailwind v4, custom components.\\n- Forms: React Hook Form + Zod.',
    'walkthrough/CHANGELOG.md': '# Changelog\\n\\n- Initialized repository architecture and Next.js foundation.',
    'walkthrough/TODO.md': '# TODO\\n\\nP0:\\n- [x] Initialize frontend framework if not already initialized\\n- [ ] Establish design tokens\\n- [ ] Implement global layout\\n- [ ] Implement header\\n- [ ] Implement footer\\n- [ ] Implement responsive navigation\\n- [ ] Implement homepage UI\\n- [ ] Implement core page layouts\\n- [ ] Implement product catalogue UI\\n- [ ] Implement product detail UI\\n- [ ] Implement contact UI\\n- [ ] Implement enquiry UI\\n- [ ] Implement responsive behavior\\n- [ ] Visual QA against reference images\\n\\nP1:\\n- [ ] Connect Supabase\\n- [ ] Create categories table\\n- [ ] Create products table\\n- [ ] Create RLS policies\\n- [ ] Seed approved catalogue\\n- [ ] Connect frontend data layer\\n- [ ] Implement enquiry persistence\\n- [ ] Implement secure email notification\\n- [ ] Implement Turnstile\\n- [ ] Implement rate limiting\\n- [ ] Implement production SEO\\n- [ ] Implement sitemap\\n- [ ] Implement robots.txt\\n- [ ] Implement structured data\\n- [ ] Security audit\\n\\nP2:\\n- [ ] Admin dashboard\\n- [ ] Product CRUD\\n- [ ] Category CRUD\\n- [ ] Enquiry management\\n- [ ] Advanced analytics\\n- [ ] CRM integrations',
    'walkthrough/KNOWN-ISSUES.md': '# Known Issues\\n\\n- Globally installed skills (UI/UX Pro Max, GSAP Animation, Taste, Agentic Awesome Anti-Gravity) identifiers pending discovery or not found.',
    'walkthrough/NEXT-STEPS.md': '# Next Steps\\n\\n- UI/UX IMPLEMENTATION phase (establish design tokens, global layout).',
    'skills/SKILL-ORCHESTRATOR.md': '# Skill Orchestrator\\n\\nPolicy for automatic invocation of skills based on tasks. (UI/UX Pro Max for UI, GSAP for complex animations, Taste for visual polish, Agentic Awesome for repo tasks).',
    'skills/SKILL-REGISTRY.md': '# Skill Registry\\n\\n| Skill | Status | Identifier | Primary Use |\\n|------|------|------|------|\\n| UI/UX Pro Max | Installed globally | pending discovery | UI/UX and responsive design |\\n| GSAP Animation | Installed globally | pending discovery | Advanced motion |\\n| Taste | Installed globally | pending discovery | Visual refinement |\\n| Agentic Awesome Anti-Gravity | Installed globally | pending discovery | Agent workflow |',
}

for path, content in files.items():
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
