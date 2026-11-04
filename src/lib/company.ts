// Legal entity behind Begin, used by the terms, privacy policy and footers.
// TODO: fill in croNumber (CRO company number). Empty fields don't render.
export const COMPANY = {
  name: 'Neuralspark Limited',
  type: 'a private company limited by shares',
  country: 'Ireland',
  croNumber: '', // Companies Registration Office number, e.g. '123456'
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
