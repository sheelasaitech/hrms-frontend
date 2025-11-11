import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, date, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const employees = pgTable("employees", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  roleId: varchar("role_id").notNull(),
  departmentId: varchar("department_id").notNull(),
  joinDate: date("join_date").notNull(),
  status: text("status").notNull(),
  phone: text("phone"),
  avatar: text("avatar"),
});

export const roles = pgTable("roles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
});

export const departments = pgTable("departments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
});

export const salaryMaster = pgTable("salary_master", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").notNull(),
  basic: decimal("basic").notNull(),
  da: decimal("da").notNull(),
  hra: decimal("hra").notNull(),
  allowances: decimal("allowances").notNull(),
  pf: decimal("pf").notNull(),
  esi: decimal("esi").notNull(),
  tds: decimal("tds").notNull(),
});

export const payroll = pgTable("payroll", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").notNull(),
  month: text("month").notNull(),
  basic: decimal("basic").notNull(),
  da: decimal("da").notNull(),
  hra: decimal("hra").notNull(),
  allowances: decimal("allowances").notNull(),
  pf: decimal("pf").notNull(),
  esi: decimal("esi").notNull(),
  tds: decimal("tds").notNull(),
  reimbursements: decimal("reimbursements"),
  netPay: decimal("net_pay").notNull(),
  status: text("status").notNull(),
});

export const attendance = pgTable("attendance", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").notNull(),
  date: date("date").notNull(),
  status: text("status").notNull(),
});

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  status: text("status").notNull(),
  progress: integer("progress").notNull(),
  dueDate: date("due_date").notNull(),
  assignedTo: text("assigned_to").array(),
});

export const loanRequests = pgTable("loan_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").notNull(),
  amount: decimal("amount").notNull(),
  reason: text("reason").notNull(),
  date: date("date").notNull(),
  status: text("status").notNull(),
});

export const advanceRequests = pgTable("advance_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").notNull(),
  amount: decimal("amount").notNull(),
  month: text("month").notNull(),
  status: text("status").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertEmployeeSchema = createInsertSchema(employees).omit({ id: true });
export const insertRoleSchema = createInsertSchema(roles).omit({ id: true });
export const insertDepartmentSchema = createInsertSchema(departments).omit({ id: true });
export const insertSalaryMasterSchema = createInsertSchema(salaryMaster).omit({ id: true });
export const insertPayrollSchema = createInsertSchema(payroll).omit({ id: true });
export const insertAttendanceSchema = createInsertSchema(attendance).omit({ id: true });
export const insertProjectSchema = createInsertSchema(projects).omit({ id: true });
export const insertLoanRequestSchema = createInsertSchema(loanRequests).omit({ id: true });
export const insertAdvanceRequestSchema = createInsertSchema(advanceRequests).omit({ id: true });
