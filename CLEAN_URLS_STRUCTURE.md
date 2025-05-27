# 🌐 تنظيم Clean URLs لموقع s3cond7ry.me

## 📁 البنية المقترحة للمجلدات والصفحات

```
s3cond7ry.me/
│
├── index.html                     # الصفحة الرئيسية
├── books/                         # مجلد الكتب الرئيسي
│   ├── index.html                 # صفحة فهرس الكتب
│   ├── kitab-altfawuq/           # كتاب التفوق
│   │   └── index.html
│   ├── kitab-aladwaa/            # كتاب الأضواء
│   │   └── index.html
│   ├── kitab-alemtehan/          # كتاب الامتحان
│   │   └── index.html
│   ├── kitab-alibdaa/            # كتاب الإبداع
│   │   └── index.html
│   └── kitab-alamthan/           # كتاب الامتحان
│       └── index.html
│
├── subjects/                      # مجلد المواد
│   ├── index.html                 # فهرس المواد
│   ├── arabic/                    # مادة اللغة العربية
│   │   └── index.html
│   ├── math/                      # مادة الرياضيات
│   │   └── index.html
│   ├── science/                   # مادة العلوم
│   │   └── index.html
│   ├── english/                   # مادة الإنجليزي
│   │   └── index.html
│   └── physics/                   # مادة الفيزياء
│       └── index.html
│
├── grades/                        # مجلد المراحل الدراسية
│   ├── index.html                 # فهرس المراحل
│   ├── primary/                   # المرحلة الابتدائية
│   │   └── index.html
│   ├── preparatory/               # المرحلة الإعدادية
│   │   └── index.html
│   └── secondary/                 # المرحلة الثانوية
│       └── index.html
│
└── pages/                         # صفحات إضافية
    ├── about/                     # من نحن
    │   └── index.html
    ├── contact/                   # اتصل بنا
    │   └── index.html
    └── privacy/                   # سياسة الخصوصية
        └── index.html
```

## 🔗 أمثلة الروابط النهائية:

### الصفحات الرئيسية:
- `https://s3cond7ry.me/` - الصفحة الرئيسية
- `https://s3cond7ry.me/books/` - فهرس الكتب
- `https://s3cond7ry.me/subjects/` - فهرس المواد
- `https://s3cond7ry.me/grades/` - فهرس المراحل

### الكتب (Clean URLs):
- `https://s3cond7ry.me/books/kitab-altfawuq/` - كتاب التفوق
- `https://s3cond7ry.me/books/kitab-aladwaa/` - كتاب الأضواء
- `https://s3cond7ry.me/books/kitab-alemtehan/` - كتاب الامتحان
- `https://s3cond7ry.me/books/kitab-alibdaa/` - كتاب الإبداع

### المواد:
- `https://s3cond7ry.me/subjects/arabic/` - اللغة العربية
- `https://s3cond7ry.me/subjects/math/` - الرياضيات
- `https://s3cond7ry.me/subjects/physics/` - الفيزياء
- `https://s3cond7ry.me/subjects/chemistry/` - الكيمياء

### المراحل:
- `https://s3cond7ry.me/grades/primary/` - المرحلة الابتدائية
- `https://s3cond7ry.me/grades/preparatory/` - المرحلة الإعدادية
- `https://s3cond7ry.me/grades/secondary/` - المرحلة الثانوية

## 💡 مميزات هذا التنظيم:

1. **روابط نظيفة** بدون امتدادات .html
2. **تنظيم منطقي** للمحتوى
3. **سهولة التنقل** والفهرسة
4. **SEO محسن** للبحث
5. **قابلية التوسع** في المستقبل

## 🛠️ كيفية إنشاء الروابط في HTML:

```html
<!-- في الصفحة الرئيسية -->
<a href="/books/">استعراض الكتب</a>
<a href="/books/kitab-altfawuq/">كتاب التفوق</a>
<a href="/subjects/arabic/">اللغة العربية</a>
<a href="/grades/secondary/">الثانوية العامة</a>

<!-- في صفحة الكتب -->
<a href="/books/kitab-aladwaa/">كتاب الأضواء</a>
<a href="/books/kitab-alemtehan/">كتاب الامتحان</a>

<!-- العودة للصفحة الرئيسية من أي مكان -->
<a href="/">الصفحة الرئيسية</a>
```
