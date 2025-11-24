# 📘 **PRD — AI SaaS Admin Dashboard (Portfolio Project)**

**Version:** 1.0
**Purpose:** Portfolio demo for analytics dashboards
**Tech Stack:**

- **Next.js 14 (App Router)**
- **TailwindCSS + ShadCN + Framer Motion**
- **Recharts (or ECharts) for graphs**
- **Mock data from JSON files or local static TS files**
- **No auth, no Supabase, no backend database**
- **Next.js API routes reading simulated data**

This dashboard simulates an admin panel for an AI-powered document processing SaaS. It features **premium UI**, **smooth animations**, and **rich analytics** to show clients your dashboard development capabilities.

---

# 1. **Project Goals**

### 🎯 Primary Goals

- Showcase dashboard UI design and frontend engineering skills
- Provide realistic analytics for a fictional AI SaaS
- Demonstrate charts, tables, filtering, trends, and KPIs
- Create a modern, animated, visually impressive interface

### 🔒 Non-Goals

- No authentication
- No real database
- No real AI or file processing
- No real payments or Stripe integration

---

# 2. **User Persona**

### **Persona: Internal Admin**

This is YOU, the SaaS owner/operator.
You manage:

- customers
- costs
- usage
- system health
- business metrics

No end-users or organizations see this dashboard — it’s purely internal.

---

# 3. **High-Level Architecture**

### 3.1 Data Sources

All data comes from **local files**:

```
/data/customers.json
/data/usage.json
/data/revenue.json
/data/costs.json
/data/system.json
/data/documents.json
```

Each API route under `/api/admin/...` simply reads from these files and returns JSON.

### 3.2 API Layer

- `/api/admin/overview`
- `/api/admin/customers`
- `/api/admin/customers/[id]`
- `/api/admin/usage`
- `/api/admin/finance`
- `/api/admin/system`

### 3.3 App Structure

```
/app
  /admin
    /overview
    /customers
    /customers/[id]
    /usage
    /finance
    /system
```

---

# 4. **Feature Requirements**

Below are the pages and all required features.

---

# ✔️ 4.1 **Page 1: Overview Dashboard (`/admin/overview`)**

### **A. KPI Cards**

Displayed in a responsive grid with animations.

#### Business KPIs:

- MRR
- Total Revenue (YTD)
- Active Customers
- Churn Rate

#### Usage KPIs:

- Total Documents Processed
- Total Token Usage
- Total AI Cost
- Gross Margin %

#### System KPIs:

- Success Rate
- API Error Rate
- Avg Processing Time
- Queue Status (fake)

Each card includes:

- Icon
- Value
- Trend % (vs last 30 days)
- Hover animation (scale + glow)
- Fade-in on load

---

### **B. Charts Section**

#### 1. **MRR Trend**

- Line chart
- Shows last 12 months
- Hover tooltips

#### 2. **Documents Processed Over Time**

- Area chart
- Weekly or monthly aggregation
- Smooth animations

#### 3. **AI Token Usage vs Cost**

- Dual-axis line chart
- Model breakdown
- Toggle to view:

  - GPT-4o Mini
  - GPT-4o
  - Claude
  - Gemini

#### 4. **Customer Growth**

- Bar chart
- New signups per month

---

# ✔️ 4.2 **Page 2: Customers List (`/admin/customers`)**

### Table Columns:

- Organization Name
- Plan (Free, Pro, Enterprise)
- MRR
- Users
- Last active
- Docs processed
- AI cost
- Margin
- Button: “View Details”

Features:

- Sorting
- Filtering: plan, activity
- Pagination
- Smooth row hover effects
- Row expand animation (Framer Motion)

---

# ✔️ 4.3 **Page 3: Customer Detail (`/admin/customers/[id]`)**

### Header Section:

- Customer name
- Plan
- MRR
- Lifetime value
- Status

### Usage Stats:

- Total documents processed
- Total token usage
- Total AI cost
- Net margin

### Charts:

- Tokens over time
- Documents over time
- Model usage distribution (donut)

### Users in Organization:

- Table with names, roles, activity

### Recent Documents:

- Table with:

  - file name
  - pages
  - type
  - confidence score
  - date processed

Animations:

- Slide-in content
- Smooth transitions between charts

---

# ✔️ 4.4 **Page 4: Usage Analytics (`/admin/usage`)**

### Metrics:

- Documents processed per day
- Average processing time
- Success rate
- Document types breakdown

### Charts:

1. Stacked bar chart (doc types)
2. Line chart (processing time)
3. Pie chart: document categories
4. Heatmap (optional): Time-of-day activity

---

# ✔️ 4.5 **Page 5: Finance Dashboard (`/admin/finance`)**

### Financial KPIs:

- MRR
- ARR
- Total Revenue (YTD)
- Total AI Cost (YTD)
- Net profit
- Gross margin %

### Charts:

- Revenue over time
- AI cost over time
- Profit margin over time
- LTV (customer lifetime value)
- Revenue per plan tier

---

# ✔️ 4.6 **Page 6: System Health (`/admin/system`)**

### KPIs:

- API uptime
- Error rate
- Processing queue size
- Average processing time

### Tables:

- Recent errors
- Error types distribution

### Charts:

- API latency over time
- Failure rate chart
- System load visualization

---

# 5. **UI/UX Requirements**

The UI should look **premium, elegant, modern**, and animated.

### 5.1 Theme

- Dark and light mode
- Soft shadows
- Rounded corners (rounded-2xl)
- Subtle gradients
- Transparent glass-like overlay on some cards

### 5.2 Animations

Use **Framer Motion** for:

- Page transitions
- KPI card hover animations
- Chart fade-ins
- Table row hover glide
- Smooth modals

### 5.3 Components

- ShadCN UI components
- Recharts charts
- Responsive layout
- Sticky header filters

---

# 6. **API Specification**

### `/api/admin/overview`

Returns:

- KPIs
- trends
- charts

### `/api/admin/customers`

Returns list + pagination metadata.

### `/api/admin/customers/[id]`

Returns:

- customer profile
- usage
- charts
- recent documents

### `/api/admin/usage`

Document metrics, charts.

### `/api/admin/finance`

Revenue + cost + growth.

### `/api/admin/system`

System health stats.

---

# 7. **Mock Data Structure**

### Customers

```
{
  id: string,
  name: string,
  plan: "free" | "pro" | "enterprise",
  mrr: number,
  ltv: number,
  lastActive: string,
  totalDocuments: number,
  totalTokens: number,
  aiCost: number,
  margin: number,
  users: number
}
```

### Usage

Per-day statistics.

### Revenue

Monthly summary.

### Costs

Tokens + cost per model.

### System

Errors, latency, uptime.

---

# 8. **Success Criteria for Portfolio Project**

- Looks like a real SaaS admin dashboard
- Data feels real, not random
- Smooth animations
- Fast API responses (instant, mock)
- Clean code structure
- Good UX and dashboard organization

---
