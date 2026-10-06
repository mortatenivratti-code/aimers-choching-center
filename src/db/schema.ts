import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(),
  email: text('email').notNull(),
  name: text('name').default('Student'),
  targetClass: text('target_class').default('Class 10'),
  board: text('board').default('State Board'),
  streakDays: integer('streak_days').default(5),
  createdAt: timestamp('created_at').defaultNow(),
});

export const chapterProgress = pgTable('chapter_progress', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  chapterId: text('chapter_id').notNull(),
  studyStatus: text('study_status').notNull().default('Not Started'),
  completionPercentage: integer('completion_percentage').notNull().default(0),
  completedTopicsJson: text('completed_topics_json').notNull().default('[]'),
  inStudyPlan: boolean('in_study_plan').notNull().default(false),
  studyPriority: text('study_priority').notNull().default('Medium'),
  targetDate: text('target_date'),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const testResults = pgTable('test_results', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  testId: text('test_id').notNull(),
  testTitle: text('test_title').notNull(),
  targetClass: text('target_class').notNull(),
  subject: text('subject').notNull(),
  score: integer('score').notNull(),
  totalMarks: integer('total_marks').notNull(),
  percentage: integer('percentage').notNull(),
  accuracy: integer('accuracy').notNull(),
  dateCompleted: text('date_completed').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const enquiries = pgTable('enquiries', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  fullName: text('full_name').notNull(),
  userType: text('user_type').notNull(),
  mobileNumber: text('mobile_number').notNull(),
  email: text('email'),
  targetClass: text('target_class').notNull(),
  board: text('board').notNull(),
  subjectInterest: text('subject_interest').notNull(),
  preferredBatch: text('preferred_batch').notNull(),
  message: text('message'),
  dateSubmitted: text('date_submitted').notNull(),
  status: text('status').notNull().default('New'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const notes = pgTable('notes', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  targetClass: text('target_class').notNull(),
  subject: text('subject').notNull(),
  chapterNumber: integer('chapter_number').notNull().default(1),
  description: text('description'),
  medium: text('medium').notNull().default('English'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const mockTests = pgTable('mock_tests', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  targetClass: text('target_class').notNull(),
  subject: text('subject').notNull(),
  board: text('board').notNull().default('State Board'),
  category: text('category').notNull().default('Chapter Test'),
  durationMinutes: integer('duration_minutes').notNull().default(30),
  totalMarks: integer('total_marks').notNull().default(40),
  createdAt: timestamp('created_at').defaultNow(),
});

export const achievers = pgTable('achievers', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  targetClass: text('target_class').notNull(),
  board: text('board').notNull().default('State Board'),
  score: text('score').notNull(),
  schoolName: text('school_name').notNull().default('Aimers Coaching Class'),
  subjectAchievement: text('subject_achievement').notNull(),
  category: text('category').notNull().default('Top Performers'),
  year: text('year').notNull().default('2026'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  chapterProgress: many(chapterProgress),
  testResults: many(testResults),
  enquiries: many(enquiries),
}));

export const chapterProgressRelations = relations(chapterProgress, ({ one }) => ({
  user: one(users, {
    fields: [chapterProgress.userId],
    references: [users.id],
  }),
}));

export const testResultsRelations = relations(testResults, ({ one }) => ({
  user: one(users, {
    fields: [testResults.userId],
    references: [users.id],
  }),
}));

export const enquiriesRelations = relations(enquiries, ({ one }) => ({
  user: one(users, {
    fields: [enquiries.userId],
    references: [users.id],
  }),
}));
