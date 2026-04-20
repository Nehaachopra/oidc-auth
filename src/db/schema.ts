import {
  uuid,
  pgTable,
  varchar,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),

  firstName: varchar("first_name", { length: 25 }),
  lastName: varchar("last_name", { length: 25 }),

  profileImageURL: text("profile_image_url"),

  email: varchar("email", { length: 322 }).notNull(),
  emailVerified: boolean("email_verified").default(false).notNull(),

  password: varchar("password", { length: 66 }),
  salt: text("salt"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const clientsTable = pgTable("clients", {
  id: uuid('id').primaryKey().defaultRandom(),
  applicationDisplayName: varchar('application_display_name', {length: 50}).notNull(),
  applicationURL: text("application_url").notNull(),
  redirectURI: text("redirect_uri").notNull(),

  clientId: text("client_id").notNull().unique(),
  clientSecret: text("client_secret").notNull(), 

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const authorizationCodesTable = pgTable("authorization_codes", {
  id: uuid("id").primaryKey().defaultRandom(),

  code: text("code").notNull().unique(),

  clientId: text("client_id").notNull(),
  userId: uuid("user_id").notNull(),

  redirectUri: text("redirect_uri").notNull(),

  state: text("state"),
  nonce: text("nonce"),

  expiresAt: timestamp("expires_at").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});