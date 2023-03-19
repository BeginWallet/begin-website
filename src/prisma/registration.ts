import prisma from "./prisma"

// READ
export const getAllRegistrations = async () => {
    const users = await prisma.registration.findMany({})
    return users
  }
  
  export const getRegistration = async userAddress => {
    //UNIQUE  await prisma.registration.findUnique({
    const user = await prisma.registration.findFirst({
      where: { userAddress }
    })
    return user
  }
  
  // CREATE
  export const createRegistration = async (userAddress, nonce) => {
    const registration = await prisma.registration.create({
      data: {
        userAddress,
        nonce
      }
    })
    return registration
  }
  
  // UPDATE
  export const updateRegistration = async (id, updateData) => {
    const user = await prisma.registration.update({
      where: {
        id
      },
      data: {
        ...updateData
      }
    })
    return user
  }
  
  // DELETE
  export const deleteRegistration = async id => {
    const user = await prisma.registration.delete({
      where: {
        id
      }
    })
    return user
  }