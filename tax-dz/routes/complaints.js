import express from 'express';
const router = express.Router();

// مخزن الشكاوى (يتم استبداله بقاعدة بيانات لاحقاً)
let complaints = [];
let complaintId = 1;

// مسار تقديم شكوى جديدة
router.post('/submit', (req, res) => {
  const { name, email, tax_id, complaint_type, description, documents } = req.body;
  
  // التحقق من البيانات المطلوبة
  if (!name || !email || !tax_id || !complaint_type || !description) {
    return res.status(400).json({ error: 'جميع الحقول مطلوبة' });
  }
  
  const newComplaint = {
    id: complaintId++,
    name,
    email,
    tax_id,
    complaint_type,
    description,
    documents: documents || [],
    status: 'تم الاستلام',
    submitted_at: new Date(),
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 يوم
  };
  
  complaints.push(newComplaint);
  
  res.json({
    success: true,
    message: 'تم استلام شكواك بنجاح',
    complaint: newComplaint
  });
});

// مسار الحصول على حالة الشكوى
router.get('/status/:id', (req, res) => {
  const complaint = complaints.find(c => c.id === parseInt(req.params.id));
  
  if (!complaint) {
    return res.status(404).json({ error: 'الشكوى غير موجودة' });
  }
  
  res.json(complaint);
});

// مسار الحصول على جميع الشكاوى
router.get('/all', (req, res) => {
  res.json({
    total: complaints.length,
    complaints: complaints
  });
});

// مسار حذف شكوى (مسح)
router.delete('/:id', (req, res) => {
  const index = complaints.findIndex(c => c.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ error: 'الشكوى غير موجودة' });
  }
  
  complaints.splice(index, 1);
  
  res.json({
    success: true,
    message: 'تم حذف الشكوى بنجاح'
  });
});

export default router;
