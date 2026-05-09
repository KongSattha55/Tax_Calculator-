# Cambodian Tax System – Web Application Requirements (Corrected)

> Based solely on the provided documents: `Tax_01_ទូទៅអំពីពន្ធដារ.pdf`, `Tax_02_Salary.pdf`, `Tax_03_Prepayment_Tax.pdf`

## 1. Taxpayer Classification (Self‑Declaration Regime)

Since 2016, only the **Self‑Declaration (Actual/Real) Regime** applies (Tax_01, page 7).

| Type          | Annual Turnover (KHR)       | Number of Employees | Accounting Standard                     |
| ------------- | --------------------------- | ------------------- | --------------------------------------- |
| **Small**     | 250M – 700M                 | 10 – 50             | Simplified accounting (simple books)    |
| **Medium**    | 700M – 4,000M               | 51 – 100            | Full accounting (national standard)     |
| **Large**     | > 4,000M                    | > 100               | Full accounting (national standard)     |

*Medium also includes: registered companies, NGOs, banks, foreign representations, embassies, international organisations.*  
*Large also includes: multinationals, foreign branches, QIPs (registered with CDC).*  
(Tax_01, pages 8–10)

---

## 2. Tax Types & Rates

### 2.1 Tax on Salary (ToS) – Monthly Withholding

**Scope** (Tax_02, page 3)  
Any remuneration paid by an employer to an employee for work performed.

**Resident vs Non‑Resident** (Tax_02, pages 5, 14)

| Status       | Definition                                               | Taxable Income                         | Rate                     |
| ------------ | -------------------------------------------------------- | -------------------------------------- | ------------------------ |
| **Resident** | Present in Cambodia >182 days in any 12‑month period    | Worldwide salary                       | Progressive (0%–20%)     |
| **Non‑Resident** | Does not meet resident criteria                     | Cambodia‑source salary only            | Flat 20%                 |

**Progressive Tax Table (Resident – Monthly Income in KHR)** (Tax_02, page 22)

| Taxable Income (KHR)       | Rate | Offset (KHR)       |
| -------------------------- | ---- | ------------------ |
| 0 – 1,500,000              | 0%   | 0                  |
| 1,500,001 – 2,000,000      | 5%   | 75,000             |
| 2,000,001 – 8,500,000      | 10%  | 175,000            |
| 8,500,001 – 12,500,000     | 15%  | 600,000            |
| Above 12,500,000           | 20%  | 1,225,000          |

**Formula:** `Tax = (Taxable Base × Rate) – Offset` (Tax_02, page 25)

**Deductions from Taxable Base (Residents only)** (Tax_02, page 16)  
- Spouse (non‑working): 150,000 KHR / month  
- Child (≤14 years, or ≤25 if student): 150,000 KHR / month per child  

**Non‑Taxable / Excluded items** (Tax_02, pages 11, 13, 21)  
- Seniority indemnity ≤ 4,000,000 KHR/year (for separations from 2020 onward)  
- Genuine business reimbursement (with supporting documents)  
- Equal fringe benefits provided to all employees (e.g., meals, uniform, health insurance)

**Payment Deadline** (Tax_02, page 29)  
Withheld tax must be paid to the GDT by the **20th of the following month**.

**Foreign Tax Credit** (Tax_02, page 28)  
Residents can claim a credit for salary tax paid abroad (subject to documentary proof).

---

### 2.2 Prepayment Tax on Income (1% of Turnover) – Monthly

**Who must pay** (Tax_03, page 6)  
- Taxpayers under the Self‑Declaration regime that are subject to **9% Profit Tax** (e.g., QIPs, most general companies).

**Calculation** (Tax_03, page 10)  
- Base = Monthly turnover (including VAT) / 1.1  
- **Tax = Base × 1%**

**Purpose**  
Prepayment credited against the annual Profit Tax liability. Overpayment can be refunded or carried forward.

**Filing form** (Tax_03, page 12)  
- Form "VAT 01" (head office) or "VAT 01‑B" (branch)  
- File at local tax branch or via e‑filing (E‑FILLING)

**Deadline**  
Same as VAT – generally by the 20th of the following month (implied from practice, but not explicitly stated in files).

---

### 2.3 Profit Tax (Corporate Income Tax / CIT)

| Type                            | Rate   | Source                     |
| ------------------------------- | ------ | -------------------------- |
| Entities subject to prepayment  | 9%     | Tax_03, pages 6 & 10       |

*Note: The files do not mention a 20% rate. Only the 9% rate is referenced in relation to prepayment tax.*

---

### 2.4 Value Added Tax (VAT)

| Description        | Rate | Source                     |
| ------------------ | ---- | -------------------------- |
| Standard VAT       | 10%  | Implied by factor 1.1 in Tax_03, page 10 |

- Monthly filing required.

---

### 2.5 Other Taxes (Listed but no rates given in these files)

From Tax_01, page 5:

- Specific Tax (Excise) on certain goods  
- Property Tax (Land & Building)  
- Patent Tax (annual business license)  
- Stamp Duty / Transfer Tax  
- Accommodation Tax  
- Public Lighting Tax  
- Transport / Advertisement Tax, etc.

> No rates, thresholds, or filing deadlines are provided for these in the documents.

---

## 3. Penalties for Non‑Compliance

From Tax_01, pages 12–14:

| Offence                                                             | Penalty                                                         |
| ------------------------------------------------------------------- | --------------------------------------------------------------- |
| Obstruction (e.g., no books, hide records, false documents)        | 2,000,000 KHR                                                   |
| Under‑declaration – error < 10% of actual tax                      | 10% of shortfall + 1.5% per month interest on shortfall         |
| Under‑declaration – error ≥ 10% of actual tax                      | 25% of shortfall + 1.5% per month interest on shortfall         |
| Tax assessment by GDT (taxpayer failed to file or cooperate)       | 40% of shortfall + 1.5% per month interest on shortfall         |

**Interest** accrues monthly at 1.5% on the unpaid shortfall.

---

## 4. Tax Dispute Resolution Workflow

From Tax_01, pages 19–24:

```text
GDT issues assessment/notice
        │
        ▼ (30 days from receipt)
File appeal to GDT (Director General)
        │
        ▼ (GDT has 60 days to reply)
If unsatisfied → appeal to TDRC (Tax Dispute Resolution Committee)
        │ (30 days from GDT's decision)
        ▼
If still unsatisfied → appeal to Court
        │ (30 days from TDRC decision)
        ▼
Court decision (enforceable, no suspension of tax collection)