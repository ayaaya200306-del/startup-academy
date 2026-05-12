import express from 'express';
const router = express.Router();

// مجموعة الأسئلة والأجوبة الشائعة
const faqs = [
  {
    id: 1,
    question: 'كم هو أجل تقديم الشكوى الضريبية؟',
    answer: 'أجل تقديم الشكوى هو 30 يوم من تاريخ استلام الإخطار الضريبي من إدارة الضرائب.'
  },
  {
    id: 2,
    question: 'هل يمكن تأجيل دفع الضريبة المنازع فيها؟',
    answer: 'نعم، يجوز تأجيل الدفع في حالة وجود نزاع حقيقي وتوفر ضمانات كافية، وذلك بموافقة مدير الضرائب أو لجنة الطعن.'
  },
  {
    id: 3,
    question: 'ما هي الوثائق المطلوبة للشكوى؟',
    answer: 'يجب تقديم بيانات المشتكي، وصف مفصل للنزاع، الوثائق المؤيدة (فواتير، عقود، إلخ)، والطلبات المحددة بوضوح.'
  },
  {
    id: 4,
    question: 'كم أجل بت الإدارة في الشكوى؟',
    answer: 'أجل البت في الشكوى هو 60 يوم من تاريخ تقديمها، مع إمكانية التمديد 30 يوم إضافي في الحالات المعقدة.'
  },
  {
    id: 5,
    question: 'ما هي خطوات الطعن أمام لجنة الطعن؟',
    answer: 'يتم تقديم الطعن خلال 30 يوم من استلام قرار الإدارة، ثم تنظر لجنة الطعن في القضية وتصدر قرارها.'
  }
];

// مسار البحث عن إجابة
router.post('/ask', (req, res) => {
  const { question } = req.body;
  
  if (!question) {
    return res.status(400).json({ error: 'يرجى تقديم سؤال' });
  }
  
  // بحث بسيط عن كلمات مفتاحية
  const keywords = question.toLowerCase().split(' ');
  const results = faqs.filter(faq => 
    keywords.some(keyword => faq.question.includes(keyword) || faq.answer.includes(keyword))
  );
  
  if (results.length > 0) {
    res.json({
      success: true,
      answers: results,
      message: `وجدنا ${results.length} إجابة(إجابات) ذات صلة`
    });
  } else {
    res.json({
      success: false,
      message: 'لم نتمكن من العثور على إجابة. يرجى صياغة السؤال بطريقة أخرى أو التواصل مع دعم العملاء.'
    });
  }
});

// مسار الحصول على جميع الأسئلة الشائعة
router.get('/faqs', (req, res) => {
  res.json({
    total: faqs.length,
    faqs: faqs
  });
});

// مسار الحصول على إجابة محددة
router.get('/faq/:id', (req, res) => {
  const faq = faqs.find(f => f.id === parseInt(req.params.id));
  
  if (!faq) {
    return res.status(404).json({ error: 'السؤال غير موجود' });
  }
  
  res.json(faq);
});

export default router;
