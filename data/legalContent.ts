import { LegalPageContent } from "@/components/legal/LegalPageShell";

const LAST_UPDATED = "August 17, 2026";

const RELATED = {
  privacy: { name: "Privacy Policy", href: "/privacy" },
  terms: { name: "Terms of Service", href: "/terms" },
  cookies: { name: "Cookie Notice", href: "/cookies" },
  accessibility: { name: "Accessibility Statement", href: "/accessibility" },
  restricted: { name: "Restricted Products Policy", href: "/restricted-products" },
  buyerProtection: { name: "Buyer Protection", href: "/buyer-protection" },
  sellerStandards: { name: "Seller Standards", href: "/seller-standards" },
};

export const LEGAL_CONTENT: Record<string, LegalPageContent> = {
  privacy: {
    title: "Privacy Policy",
    lastUpdated: LAST_UPDATED,
    intro:
      "This policy explains what Bulkare collects, how it is used, and the rights you have over your data as a buyer or supplier on the marketplace.",
    relatedLinks: [RELATED.terms, RELATED.cookies, RELATED.sellerStandards],
    sections: [
      {
        id: "information-we-collect",
        heading: "Information we collect",
        paragraphs: [
          "Account information: name, business email, phone number and password when you register as a buyer.",
          "Business verification records: legal business name, ownership details, licenses and supporting documents submitted during supplier onboarding.",
          "Marketplace activity: searches, saved products, RFQ submissions, cart contents and order history.",
        ],
      },
      {
        id: "seller-identity-records",
        heading: "Business verification and seller identity records",
        paragraphs: [
          "Every supplier storefront is shown to buyers under a protected Seller ID. Behind that ID, Bulkare privately retains the verified legal business identity, ownership records and compliance documents.",
          "These records are never published to buyers. They are accessed only by Bulkare's verification team and disclosed only where required for payments, tax, invoicing, disputes, regulators or applicable law.",
        ],
      },
      {
        id: "how-we-use-activity",
        heading: "How we use marketplace activity",
        paragraphs: [
          "Order and RFQ data is used to match buyers with suppliers, calculate fulfillment eligibility and route quotation requests to relevant sellers.",
          "Aggregated activity may be used to detect fraud, enforce the Restricted Products Policy and improve search relevance — never to build a public profile of an individual buyer.",
        ],
      },
      {
        id: "payments",
        heading: "Payments and financial data",
        paragraphs: [
          "Payment details are processed by Bulkare's payment provider and are not stored on Bulkare's own servers in full. Bulkare retains transaction records (amount, status, order reference) required for accounting and dispute resolution.",
        ],
      },
      {
        id: "communications",
        heading: "Communications",
        paragraphs: [
          "Transactional emails — order confirmations, RFQ responses, password resets — are sent regardless of marketing preferences, since they are required to operate your account.",
          "Marketing emails, including the Wholesale Insights Newsletter, are opt-in and can be withdrawn at any time without affecting transactional messages.",
        ],
      },
      {
        id: "retention",
        heading: "Retention",
        paragraphs: [
          "Account and order records are retained for as long as the account is active and for the period required afterward for tax, accounting and dispute-resolution obligations.",
          "Verification documents are retained separately under stricter access controls for the duration required by applicable compliance rules.",
        ],
      },
      {
        id: "your-rights",
        heading: "Your rights",
        paragraphs: [
          "You may request access to, correction of, or deletion of your personal data, subject to records Bulkare is required to retain by law.",
          "Requests can be sent to the contact address below and are handled by Bulkare's support team.",
        ],
      },
    ],
  },

  terms: {
    title: "Terms of Service",
    lastUpdated: LAST_UPDATED,
    intro:
      "These terms govern use of the Bulkare marketplace by buyers and suppliers. By creating an account or placing an order, you agree to the terms below.",
    relatedLinks: [RELATED.sellerStandards, RELATED.restricted, RELATED.privacy],
    sections: [
      {
        id: "acceptance",
        heading: "Acceptance of terms",
        paragraphs: [
          "Registering a buyer account, submitting a supplier application, or placing an order constitutes acceptance of these terms and any policy they reference.",
        ],
      },
      {
        id: "buyer-terms",
        heading: "Buyer terms",
        paragraphs: [
          "Buyers must provide accurate business information and are responsible for reviewing case pack, minimum order quantity and eligibility requirements before purchasing.",
          "Orders are placed with the seller(s) whose inventory is included in the cart; Bulkare splits multi-seller carts into separate seller orders at checkout.",
        ],
      },
      {
        id: "supplier-terms",
        heading: "Supplier terms",
        paragraphs: [
          "Suppliers must maintain accurate listings and fulfill orders according to the lead times and terms published on their storefront.",
          "Supplier conduct standards, including verification and listing accuracy requirements, are set out in full in the Seller Standards.",
        ],
      },
      {
        id: "listings-transactions",
        heading: "Listings and transactions",
        paragraphs: [
          "Product listings must reflect real, current inventory. Requests for Quotation (RFQs) are non-binding until a buyer accepts a specific seller offer.",
        ],
      },
      {
        id: "disputes-suspension",
        heading: "Disputes and suspension",
        paragraphs: [
          "Order disputes are handled through the Buyer Protection process. Accounts found in violation of these terms, the Restricted Products Policy or the Seller Standards may be suspended pending review.",
        ],
      },
      {
        id: "platform-liability",
        heading: "Platform liability",
        paragraphs: [
          "Bulkare operates as a marketplace connecting independent buyers and suppliers. Product quality, listing accuracy and fulfillment are the responsibility of the supplier of record for each order, subject to the protections described in the Buyer Protection policy.",
        ],
      },
    ],
  },

  cookies: {
    title: "Cookie Notice and Settings",
    lastUpdated: LAST_UPDATED,
    intro:
      "Bulkare uses a limited set of cookies required to operate the marketplace. Non-essential cookies are never loaded before you provide consent below.",
    relatedLinks: [RELATED.privacy, RELATED.accessibility],
    sections: [
      {
        id: "what-we-use",
        heading: "What cookies we use",
        paragraphs: [
          "Essential cookies keep you signed in, remember your cart and protect against cross-site request forgery. These cannot be disabled, as the marketplace cannot function without them.",
          "Non-essential cookies (analytics or marketing) are not currently loaded on Bulkare. If that changes, they will load only after you opt in below.",
        ],
      },
      {
        id: "third-parties",
        heading: "Third parties",
        paragraphs: [
          "Payment processing at checkout may set its own essential session cookies, governed by the payment provider's own policy.",
        ],
      },
    ],
  },

  accessibility: {
    title: "Accessibility Statement",
    lastUpdated: LAST_UPDATED,
    intro:
      "Bulkare is working toward a marketplace that is usable by buyers and suppliers of all abilities.",
    relatedLinks: [RELATED.privacy, RELATED.cookies],
    sections: [
      {
        id: "our-commitment",
        heading: "Our commitment",
        paragraphs: [
          "We aim to meet Web Content Accessibility Guidelines (WCAG) 2.1 Level AA across buyer-facing pages, and treat accessibility issues as defects to be fixed, not feature requests.",
        ],
      },
      {
        id: "supported-standards",
        heading: "Supported standards",
        paragraphs: [
          "Target standard: WCAG 2.1 AA. Keyboard navigation and visible focus states are supported across account, cart and checkout flows.",
        ],
      },
      {
        id: "known-limitations",
        heading: "Known limitations",
        paragraphs: [
          "Some supplier-uploaded product images do not yet include descriptive alt text, since this depends on data suppliers provide at listing time.",
          "Uploaded specification documents (PDF, spec sheets) are not guaranteed to be screen-reader optimized, as these are supplier-provided files.",
        ],
      },
      {
        id: "accessibility-contact",
        heading: "Accessibility contact",
        paragraphs: [
          "Report an accessibility barrier using the contact channel below. Reports are routed to a monitored queue, not general support.",
        ],
      },
    ],
  },

  "restricted-products": {
    title: "Restricted Products Policy",
    lastUpdated: LAST_UPDATED,
    intro:
      "Some categories on Bulkare involve regulated inventory. This policy defines what can be listed, what requires verification, and what is never permitted.",
    relatedLinks: [RELATED.sellerStandards, RELATED.buyerProtection, RELATED.terms],
    sections: [
      {
        id: "allowed-inventory",
        heading: "Allowed inventory",
        paragraphs: [
          "General wholesale categories — beverages, snacks & candy, health & personal care, automotive, store & cleaning supplies, and electronics & accessories — are open to any verified supplier account in good standing.",
        ],
      },
      {
        id: "restricted-inventory",
        heading: "Restricted inventory",
        paragraphs: [
          "Tobacco & Nicotine and Vaping & Accessories are restricted categories. Listings in these categories are gated behind business verification, and buyers must clear age and territory eligibility checks before the product page becomes visible.",
        ],
        list: [
          "Suppliers must hold and submit a current license before a restricted listing is approved.",
          "Buyers must confirm business eligibility for the destination territory before checkout is enabled for these categories.",
        ],
      },
      {
        id: "prohibited-inventory",
        heading: "Prohibited inventory",
        paragraphs: [
          "Counterfeit goods, stolen inventory, recalled products, and any item prohibited by applicable law in the seller's or buyer's jurisdiction may never be listed, regardless of category.",
        ],
      },
      {
        id: "seller-documentation",
        heading: "Seller documentation requirements",
        paragraphs: [
          "Suppliers listing in a restricted category must provide the relevant license or authorization during onboarding, kept current for as long as the listing remains active.",
        ],
      },
      {
        id: "buyer-eligibility",
        heading: "Buyer eligibility and geographic restrictions",
        paragraphs: [
          "Restricted-category checkout is unavailable to destinations where the product category cannot legally be shipped, and to buyer accounts that have not completed the applicable eligibility check.",
        ],
      },
      {
        id: "reporting",
        heading: "Reporting a concern",
        paragraphs: [
          "Suspected policy violations can be reported through the Compliance and Restricted Products option on the contact page.",
        ],
      },
      {
        id: "enforcement",
        heading: "Enforcement",
        paragraphs: [
          "Violations may result in listing removal, restricted-category access revocation, or account suspension depending on severity.",
        ],
      },
    ],
  },

  "buyer-protection": {
    title: "Buyer Protection",
    lastUpdated: LAST_UPDATED,
    intro:
      "Buyer Protection covers eligible Bulkare transactions from payment through delivery. It does not extend beyond the terms described on this page.",
    relatedLinks: [RELATED.terms, RELATED.restricted, RELATED.sellerStandards],
    sections: [
      {
        id: "eligible-transactions",
        heading: "Eligible transactions",
        paragraphs: [
          "Orders placed and paid for through Bulkare checkout are covered. Payments or arrangements made outside the platform are not protected.",
        ],
      },
      {
        id: "payment-handling",
        heading: "Payment handling",
        paragraphs: [
          "Funds are held against the order until the seller order status reflects dispatch, so a payment failure or seller-side cancellation does not leave a buyer charged for undelivered goods.",
        ],
      },
      {
        id: "delivery-evidence",
        heading: "Delivery evidence and inspection window",
        paragraphs: [
          "Sellers are expected to provide tracking or delivery confirmation for each seller order. Buyers have an inspection window after delivery is confirmed to report shortages, damage or mismatched items before the order is treated as complete.",
        ],
      },
      {
        id: "filing-a-dispute",
        heading: "Filing a dispute",
        paragraphs: [
          "Disputes are opened from the order detail page and reference the specific seller order. An order that has already been cancelled is not eligible for a dispute; use cancellation instead where the order has not yet shipped.",
        ],
      },
      {
        id: "exclusions",
        heading: "Exclusions",
        paragraphs: [
          "Buyer Protection does not cover freight delays caused by the buyer's own carrier arrangement, orders paid for outside Bulkare, or issues reported after the inspection window has closed.",
        ],
      },
      {
        id: "escalation",
        heading: "Escalation",
        paragraphs: [
          "Unresolved disputes can be escalated to Bulkare support through the Order or Dispute contact option for manual review.",
        ],
      },
    ],
  },

  "seller-standards": {
    title: "Seller Standards",
    lastUpdated: LAST_UPDATED,
    intro:
      "Every supplier on Bulkare operates under a protected Seller ID and is expected to meet the standards below to remain in good standing.",
    relatedLinks: [RELATED.restricted, RELATED.terms, RELATED.buyerProtection],
    sections: [
      {
        id: "business-verification",
        heading: "Business verification",
        paragraphs: [
          "Suppliers must maintain a verified, current legal business record with Bulkare, including ownership and any category-specific licenses. Verification is private and never shown on the public storefront.",
        ],
      },
      {
        id: "listing-accuracy",
        heading: "Listing accuracy",
        paragraphs: [
          "Product title, images, case pack, MOQ and pricing must reflect real, sellable inventory. Listings must be updated or delisted promptly when they no longer match availability.",
        ],
      },
      {
        id: "inventory-accuracy",
        heading: "Inventory and stock accuracy",
        paragraphs: [
          "Stock levels shown to buyers must reflect actual available inventory. Orders that cannot be fulfilled at the listed quantity should be updated before they generate buyer orders.",
        ],
      },
      {
        id: "fulfillment-standards",
        heading: "Fulfillment standards",
        paragraphs: [
          "Sellers are expected to acknowledge, dispatch and provide tracking for seller orders within the lead time published on their storefront.",
        ],
      },
      {
        id: "restricted-product-compliance",
        heading: "Restricted-product compliance",
        paragraphs: [
          "Suppliers listing in a restricted category must follow the Restricted Products Policy in full, including keeping licenses current.",
        ],
      },
      {
        id: "communication-standards",
        heading: "Communication standards",
        paragraphs: [
          "All buyer communication must stay within the platform's protected-identity model — sellers may not solicit buyers to transact outside Bulkare.",
        ],
      },
      {
        id: "refunds-cancellations",
        heading: "Refunds and cancellations",
        paragraphs: [
          "A buyer may cancel an order while every seller order within it is still pending or processing; stock is released back to inventory automatically on cancellation. Once any seller order has shipped or been delivered, that order is no longer cancellable and any resolution runs through Buyer Protection instead.",
        ],
      },
      {
        id: "recordkeeping",
        heading: "Recordkeeping",
        paragraphs: [
          "Sellers must retain records of fulfillment, licenses and buyer communications for the period required by applicable law and by Bulkare's compliance requirements.",
        ],
      },
      {
        id: "enforcement",
        heading: "Enforcement",
        paragraphs: [
          "Repeated listing inaccuracies, fulfillment failures or restricted-product violations can result in listing removal, loss of restricted-category access, or account suspension.",
        ],
      },
    ],
  },
};
