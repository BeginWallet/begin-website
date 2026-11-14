// Legal entity behind Begin, used by the terms, privacy policy and footers.
// Empty fields don't render.
export const COMPANY = {
  name: 'Neuralspark Limited',
  type: 'a private company limited by shares',
  country: 'Ireland',
  croNumber: '794530', // Companies Registration Office number
  registeredOffice: '59 Shieling Square, Dublin, Ireland',
  vatNumber: 'IE4456083OH',
  email: 'web3@begin.is',
}

export const companyRegistration = () =>
  [
    `${COMPANY.name}, ${COMPANY.type} registered in ${COMPANY.country}`,
    COMPANY.croNumber && `with company number ${COMPANY.croNumber}`,
    COMPANY.registeredOffice && `and its registered office at ${COMPANY.registeredOffice}`,
  ]
    .filter(Boolean)
    .join(' ')
