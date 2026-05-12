import express from 'express';
const router = express.Router();

// حاسبة الآجال القانونية
router.post('/calculate-deadline', (req, res) => {
  const { event_date, days } = req.body;
  
  if (!event_date || !days) {
    return res.status(400).json({ error: 'تاريخ الحدث وعدد الأيام مطلوبان' });
  }
  
  const startDate = new Date(event_date);
  const deadline = new Date(startDate);
  deadline.setDate(deadline.getDate() + parseInt(days));
  
  const today = new Date();
  const daysRemaining = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
  
  res.json({
    event_date: startDate.toISOString().split('T')[0],
    days_to_add: days,
    deadline: deadline.toISOString().split('T')[0],
    days_remaining: daysRemaining > 0 ? daysRemaining : 0,
    is_expired: daysRemaining <= 0,
    message: daysRemaining > 0 
      ? `لديك ${daysRemaining} يوم لتقديم شكواك` 
      : 'انتهت المهلة المقررة'
  });
});

// معلومات عن الآجال القانونية
const deadlines = [
  {
    id: 1,
    name: 'تقديم الشكوى الأولية',
    days: 30,
    description: 'أجل تقديم الشكوى من تاريخ استلام الإخطار الضريبي'
  },
  {
    id: 2,
    name: 'بت الإدارة في الشكوى',
    days: 60,
    description: 'أجل بت إدارة الضرائب في الشكوى المقدمة'
  },
  {
    id: 3,
    name: 'التمديد الإضافي',
    days: 30,
    description: 'أجل تمديد البت في الحالات المعقدة'
  },
  {
    id: 4,
    name: 'الطعن أمام لجنة الطعن',
    days: 30,
    description: 'أجل الطعن في قرار الإدارة أمام لجنة الطعن'
  },
  {
    id: 5,
    name: 'الطعن أمام المحكمة الإدارية',
    days: 60,
    description: 'أجل الطعن في قرار لجنة الطعن أمام المحكمة الإدارية'
  }
];

router.get('/deadlines', (req, res) => {
  res.json({
    total: deadlines.length,
    deadlines: deadlines
  });
});

export default router;
