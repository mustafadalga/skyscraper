import { PrismaClient } from "@prisma/client"

/**
 * Extends the NodeJS global object to include the PrismaClient instance.
 */
declare global {
    /**
     * The PrismaClient instance, which will be undefined before it is initialized.
     */
    var prisma: PrismaClient | undefined
}

/**
 * Initializes a new PrismaClient instance or reuses an existing one.
 */
const client = globalThis.prisma || new PrismaClient()

/**
 * Assigns the PrismaClient instance to the global object in non-production environments.
 * This prevents creating new instances of PrismaClient in development and
 * allows Prisma Studio to access the instance.
 */
if (process.env.NODE_ENV !== "production") globalThis.prisma = client

/**
 * Exports the initialized PrismaClient instance.
 */
export default client;
