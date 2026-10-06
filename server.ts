import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { requireAuth, AuthRequest } from './src/middleware/auth.ts';
import {
  securityHeadersMiddleware,
  csrfAndOriginGuard,
  createRateLimiter,
  sanitizeText,
  clampInteger,
  validateEnum,
  isValidPhone,
  isValidEmail,
} from './src/middleware/security.ts';
import {
  getOrCreateUser,
  getUserChapterProgress,
  upsertUserChapterProgress,
  getUserTestResults,
  insertUserTestResult,
  getAllEnquiries,
  insertUserEnquiry,
} from './src/db/users.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ALLOWED_CLASSES = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'] as const;
const ALLOWED_BOARDS = ['State Board', 'CBSE', 'ICSE'] as const;
const ALLOWED_STUDY_STATUS = ['Not Started', 'In Progress', 'Completed'] as const;
const ALLOWED_PRIORITIES = ['High', 'Medium', 'Low'] as const;
const ALLOWED_USER_TYPES = ['Student', 'Parent'] as const;
const ALLOWED_BATCHES = ['Morning', 'Evening', 'Weekend', 'Flexible'] as const;

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Hide Express server signature and trust reverse proxy for rate limiting
  app.disable('x-powered-by');
  app.set('trust proxy', 1);

  // Apply HTTP security headers (CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
  app.use(securityHeadersMiddleware);

  // Strict JSON payload size limit to prevent memory exhaustion / DoS
  app.use(express.json({ limit: '32kb' }));

  // Protect API routes with CSRF/Origin checks and rate limiting
  const apiReadLimiter = createRateLimiter({
    windowMs: 60 * 1000,
    maxRequests: 60,
    keyPrefix: 'api-read',
  });
  const apiWriteLimiter = createRateLimiter({
    windowMs: 60 * 1000,
    maxRequests: 25,
    keyPrefix: 'api-write',
  });

  app.use('/api', csrfAndOriginGuard);

  // Protected API: Get current user profile, chapter progress, test results, and enquiries
  app.get('/api/me', apiReadLimiter, requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = sanitizeText(req.user!.uid, 128);
      const email = sanitizeText(req.user!.email || `${uid}@user.local`, 160);
      const name = sanitizeText(req.user!.name || 'Student', 100);

      const userRecord = await getOrCreateUser(uid, email, name);
      const [progress, results, userEnquiries] = await Promise.all([
        getUserChapterProgress(userRecord.id),
        getUserTestResults(userRecord.id),
        getAllEnquiries(userRecord.id),
      ]);

      res.json({
        user: userRecord,
        chapterProgress: progress,
        testResults: results,
        enquiries: userEnquiries,
      });
    } catch (error) {
      console.error('Failed to fetch user dashboard data:', error);
      res.status(500).json({ error: 'Unable to load dashboard data at this time.' });
    }
  });

  // Protected API: Upsert chapter progress & study plan
  app.post(
    '/api/chapter-progress',
    apiWriteLimiter,
    requireAuth,
    async (req: AuthRequest, res) => {
      try {
        const uid = sanitizeText(req.user!.uid, 128);
        const email = sanitizeText(req.user!.email || `${uid}@user.local`, 160);
        const userRecord = await getOrCreateUser(uid, email, sanitizeText(req.user!.name, 100));

        const rawChapterId = sanitizeText(req.body?.chapterId, 80);
        if (!rawChapterId || !/^[a-zA-Z0-9_-]+$/.test(rawChapterId)) {
          return res.status(400).json({ error: 'Invalid chapterId parameter' });
        }

        const studyStatus = validateEnum(
          req.body?.studyStatus,
          ALLOWED_STUDY_STATUS,
          'Not Started'
        );
        const completionPercentage = clampInteger(req.body?.completionPercentage, 0, 100, 0);
        const studyPriority = validateEnum(req.body?.studyPriority, ALLOWED_PRIORITIES, 'Medium');
        const targetDate = req.body?.targetDate
          ? sanitizeText(req.body.targetDate, 40)
          : null;

        const rawTopics = Array.isArray(req.body?.completedTopics)
          ? req.body.completedTopics.slice(0, 50)
          : [];
        const sanitizedTopics = rawTopics
          .map((t: unknown) => sanitizeText(t, 160))
          .filter(Boolean);

        const saved = await upsertUserChapterProgress(userRecord.id, {
          chapterId: rawChapterId,
          studyStatus,
          completionPercentage,
          completedTopicsJson: JSON.stringify(sanitizedTopics),
          inStudyPlan: Boolean(req.body?.inStudyPlan),
          studyPriority,
          targetDate,
        });

        res.json(saved);
      } catch (error) {
        console.error('Failed to update chapter progress:', error);
        res.status(500).json({ error: 'Unable to save chapter progress.' });
      }
    }
  );

  // Protected API: Save mock test result
  app.post(
    '/api/test-results',
    apiWriteLimiter,
    requireAuth,
    async (req: AuthRequest, res) => {
      try {
        const uid = sanitizeText(req.user!.uid, 128);
        const email = sanitizeText(req.user!.email || `${uid}@user.local`, 160);
        const userRecord = await getOrCreateUser(uid, email, sanitizeText(req.user!.name, 100));

        const testId = sanitizeText(req.body?.testId || 'test', 80);
        const testTitle = sanitizeText(req.body?.testTitle || 'Mock Test', 160);
        const targetClass = validateEnum(req.body?.class, ALLOWED_CLASSES, 'Class 10');
        const subject = sanitizeText(req.body?.subject || 'General', 80);
        const totalMarks = clampInteger(req.body?.totalMarks, 1, 1000, 100);
        const score = clampInteger(req.body?.score, 0, totalMarks, 0);
        const percentage = clampInteger(req.body?.percentage, 0, 100, 0);
        const accuracy = clampInteger(req.body?.accuracy, 0, 100, 0);
        const dateCompleted = sanitizeText(
          req.body?.date || new Date().toLocaleDateString('en-GB'),
          40
        );

        const saved = await insertUserTestResult(userRecord.id, {
          testId,
          testTitle,
          targetClass,
          subject,
          score,
          totalMarks,
          percentage,
          accuracy,
          dateCompleted,
        });

        res.json(saved);
      } catch (error) {
        console.error('Failed to save test result:', error);
        res.status(500).json({ error: 'Unable to record test result.' });
      }
    }
  );

  // Protected API: Save admission/counselling enquiry
  app.post('/api/enquiries', apiWriteLimiter, requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = sanitizeText(req.user!.uid, 128);
      const email = sanitizeText(req.user!.email || `${uid}@user.local`, 160);
      const userRecord = await getOrCreateUser(uid, email, sanitizeText(req.user!.name, 100));

      const fullName = sanitizeText(req.body?.fullName, 100);
      const mobileNumber = sanitizeText(req.body?.mobileNumber, 20);
      const contactEmail = sanitizeText(req.body?.email, 160);

      if (!fullName || fullName.length < 2) {
        return res.status(400).json({ error: 'Valid full name is required.' });
      }
      if (!isValidPhone(mobileNumber)) {
        return res.status(400).json({ error: 'Valid 10-digit mobile number is required.' });
      }
      if (!isValidEmail(contactEmail)) {
        return res.status(400).json({ error: 'Invalid email address format.' });
      }

      const saved = await insertUserEnquiry(userRecord.id, {
        fullName,
        userType: validateEnum(req.body?.userType, ALLOWED_USER_TYPES, 'Parent'),
        mobileNumber,
        email: contactEmail || undefined,
        targetClass: validateEnum(req.body?.class, ALLOWED_CLASSES, 'Class 10'),
        board: validateEnum(req.body?.board, ALLOWED_BOARDS, 'State Board'),
        subjectInterest: sanitizeText(req.body?.subjectInterest || 'All Subjects', 120),
        preferredBatch: validateEnum(req.body?.preferredBatch, ALLOWED_BATCHES, 'Evening'),
        message: sanitizeText(req.body?.message, 600) || undefined,
        dateSubmitted: sanitizeText(
          req.body?.dateSubmitted || new Date().toLocaleDateString('en-GB'),
          40
        ),
      });

      res.json(saved);
    } catch (error) {
      console.error('Failed to save enquiry:', error);
      res.status(500).json({ error: 'Unable to submit enquiry at this time.' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath, { dotfiles: 'ignore' }));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
