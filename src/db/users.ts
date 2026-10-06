import { db } from './index.ts';
import { users, chapterProgress, testResults, enquiries } from './schema.ts';
import { eq, and, desc } from 'drizzle-orm';

export async function getOrCreateUser(uid: string, email: string, name?: string) {
  try {
    const result = await db
      .insert(users)
      .values({
        uid,
        email,
        name: name || email.split('@')[0] || 'Student',
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: {
          email,
          ...(name ? { name } : {}),
        },
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error('Database query failed in getOrCreateUser:', error);
    throw new Error('Failed to synchronize user profile.', { cause: error });
  }
}

export async function getUserChapterProgress(userId: number) {
  try {
    return await db
      .select()
      .from(chapterProgress)
      .where(eq(chapterProgress.userId, userId));
  } catch (error) {
    console.error('Database query failed in getUserChapterProgress:', error);
    throw new Error('Failed to load chapter progress.', { cause: error });
  }
}

export async function upsertUserChapterProgress(
  userId: number,
  data: {
    chapterId: string;
    studyStatus: string;
    completionPercentage: number;
    completedTopicsJson: string;
    inStudyPlan: boolean;
    studyPriority: string;
    targetDate?: string | null;
  }
) {
  try {
    const existing = await db
      .select()
      .from(chapterProgress)
      .where(
        and(
          eq(chapterProgress.userId, userId),
          eq(chapterProgress.chapterId, data.chapterId)
        )
      );

    if (existing.length > 0) {
      const updated = await db
        .update(chapterProgress)
        .set({
          studyStatus: data.studyStatus,
          completionPercentage: data.completionPercentage,
          completedTopicsJson: data.completedTopicsJson,
          inStudyPlan: data.inStudyPlan,
          studyPriority: data.studyPriority,
          targetDate: data.targetDate ?? existing[0].targetDate,
          updatedAt: new Date(),
        })
        .where(eq(chapterProgress.id, existing[0].id))
        .returning();
      return updated[0];
    }

    const inserted = await db
      .insert(chapterProgress)
      .values({
        userId,
        chapterId: data.chapterId,
        studyStatus: data.studyStatus,
        completionPercentage: data.completionPercentage,
        completedTopicsJson: data.completedTopicsJson,
        inStudyPlan: data.inStudyPlan,
        studyPriority: data.studyPriority,
        targetDate: data.targetDate ?? null,
      })
      .returning();

    return inserted[0];
  } catch (error) {
    console.error('Database query failed in upsertUserChapterProgress:', error);
    throw new Error('Failed to save chapter progress.', { cause: error });
  }
}

export async function getUserTestResults(userId: number) {
  try {
    return await db
      .select()
      .from(testResults)
      .where(eq(testResults.userId, userId))
      .orderBy(desc(testResults.id));
  } catch (error) {
    console.error('Database query failed in getUserTestResults:', error);
    throw new Error('Failed to load test results.', { cause: error });
  }
}

export async function insertUserTestResult(
  userId: number,
  data: {
    testId: string;
    testTitle: string;
    targetClass: string;
    subject: string;
    score: number;
    totalMarks: number;
    percentage: number;
    accuracy: number;
    dateCompleted: string;
  }
) {
  try {
    const inserted = await db
      .insert(testResults)
      .values({
        userId,
        ...data,
      })
      .returning();
    return inserted[0];
  } catch (error) {
    console.error('Database query failed in insertUserTestResult:', error);
    throw new Error('Failed to record test result.', { cause: error });
  }
}

export async function getAllEnquiries(userId: number) {
  try {
    return await db
      .select()
      .from(enquiries)
      .where(eq(enquiries.userId, userId))
      .orderBy(desc(enquiries.id));
  } catch (error) {
    console.error('Database query failed in getAllEnquiries:', error);
    throw new Error('Failed to load enquiries.', { cause: error });
  }
}

export async function insertUserEnquiry(
  userId: number,
  data: {
    fullName: string;
    userType: string;
    mobileNumber: string;
    email?: string;
    targetClass: string;
    board: string;
    subjectInterest: string;
    preferredBatch: string;
    message?: string;
    dateSubmitted: string;
  }
) {
  try {
    const inserted = await db
      .insert(enquiries)
      .values({
        userId,
        fullName: data.fullName,
        userType: data.userType,
        mobileNumber: data.mobileNumber,
        email: data.email || null,
        targetClass: data.targetClass,
        board: data.board,
        subjectInterest: data.subjectInterest,
        preferredBatch: data.preferredBatch,
        message: data.message || null,
        dateSubmitted: data.dateSubmitted,
        status: 'New',
      })
      .returning();
    return inserted[0];
  } catch (error) {
    console.error('Database query failed in insertUserEnquiry:', error);
    throw new Error('Failed to submit enquiry.', { cause: error });
  }
}
