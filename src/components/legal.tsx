import { ReactNode } from 'react'
import { COMPANY } from '../lib/company'

// Shared building blocks for the terms of service and privacy policy pages.

export const LegalSection = ({ n, title, children }: { n: number; title: string; children: ReactNode }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-semibold mb-4">
      {n}. {title}
    </h2>
    {children}
  </section>
)

export const P = ({ children }: { children: ReactNode }) => <p className="mb-4">{children}</p>

export const List = ({ children }: { children: ReactNode }) => (
  <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
)

export const Item = ({ label, children }: { label?: string; children: ReactNode }) => (
  <li>
    {label && <span className="font-medium">{label}:</span>} {children}
  </li>
)

export const CompanyDetails = () => (
  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-4 space-y-1">
    <p>{COMPANY.name}</p>
    {COMPANY.registeredOffice ? <p>Registered office: {COMPANY.registeredOffice}</p> : <p>{COMPANY.country}</p>}
    {COMPANY.croNumber && <p>Company number: {COMPANY.croNumber}</p>}
    {COMPANY.vatNumber && <p>VAT number: {COMPANY.vatNumber}</p>}
    <p>
      Email: <a href={`mailto:${COMPANY.email}`} className="underline">{COMPANY.email}</a>
    </p>
  </div>
)
