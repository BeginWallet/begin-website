// Legal entity behind Begin, used by the terms, privacy policy and footers.
// TODO: fill in croNumber and registeredOffice. They render only once set.
export const COMPANY = {
  name: 'Neuralspark Limited',
  type: 'a private company limited by shares',
  country: 'Ireland',
  croNumber: '', // Companies Registration Office number, e.g. '123456'
  registeredOffice: '', // e.g. '1 Example Street, Dublin 2, D02 XXXX, Ireland'
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
