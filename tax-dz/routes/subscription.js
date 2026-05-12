import express from 'express';
const router = express.Router();

// خطط الاشتراك
const subscriptionPlans = [
  {
    id: 1,
    name: 'الخطة الأساسية',
    price: 'مجاني',
    duration: 'غير محدود',
    features: [
      'الوصول لقاعدة القوانين',
      'بحث في الأسئلة الشائعة (5 أسئلة شهرياً)',
      'حاسبة الآجال البسيطة'
    ]
  },
  {
    id: 2,
    name: 'الخطة الاحترافية',
    price: '500 دج/شهر',
    duration: 'شهري',
    features: [
      'جميع ميزات الخطة الأساسية',
      'مساعد ذكي بلا حدود',
      'نماذج وقوالب قانونية',
      'استشارات قانونية محدودة (3 استشارات/شهر)',
      'دعم العملاء عبر البريد الإلكتروني'
    ]
  },
  {
    id: 3,
    name: 'خطة الدعم الكامل',
    price: '1500 دج/شهر',
    duration: 'شهري',
    features: [
      'جميع ميزات الخطة الاحترافية',
      'استشارات قانونية غير محدودة',
      'دورات تدريبية متقدمة',
      'تتبع الحالات المتقدم',
      'دعم العملاء عبر الهاتف والبريد الإلكتروني والمحادثة الحية',
      'اجتماعات استشارية شخصية (مرة واحدة/شهر)'
    ]
  },
  {
    id: 4,
    name: 'خطة المؤسسات',
    price: 'حسب التفاوض',
    duration: 'سنوي',
    features: [
      'جميع ميزات خطة الدعم الكامل',
      'حسابات متعددة للموظفين',
      'تقارير وتحليلات متقدمة',
      'دعم فني مخصص 24/7',
      'تكامل مخصص مع الأنظمة الأخرى',
      'مدير حساب شخصي'
    ]
  }
];

// مسار الحصول على خطط الاشتراك
router.get('/plans', (req, res) => {
  res.json({
    total: subscriptionPlans.length,
    plans: subscriptionPlans
  });
});

// مسار الحصول على خطة محددة
router.get('/plans/:id', (req, res) => {
  const plan = subscriptionPlans.find(p => p.id === parseInt(req.params.id));
  
  if (!plan) {
    return res.status(404).json({ error: 'الخطة غير موجودة' });
  }
  
  res.json(plan);
});

// مسار الاشتراك
router.post('/subscribe', (req, res) => {
  const { user_email, plan_id } = req.body;
  
  if (!user_email || !plan_id) {
    return res.status(400).json({ error: 'البريد الإلكتروني ورقم الخطة مطلوبان' });
  }
  
  const plan = subscriptionPlans.find(p => p.id === parseInt(plan_id));
  
  if (!plan) {
    return res.status(404).json({ error: 'الخطة غير موجودة' });
  }
  
  res.json({
    success: true,
    message: `تم الاشتراك في ${plan.name} بنجاح`,
    subscription: {
      email: user_email,
      plan: plan.name,
      subscribed_at: new Date(),
      next_billing: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    }
  });
});

export default router;
