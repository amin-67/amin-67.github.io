# حل مشكلة عرض directory listing بدلاً من index.html

## المشكلة:
عند الوصول لرابط مثل: http://localhost/primary/grade1/arabic/selah/
يعرض الخادم قائمة الملفات بدلاً من تحميل index.html تلقائياً

## الحلول المطبقة:

### 1. ملف .htaccess (للخوادم Apache):
- تم إنشاؤه في المجلد الجذر
- يقوم بتوجيه المجلدات إلى index.html تلقائياً
- يمنع عرض directory listing

### 2. ملف web.config (لخوادم IIS):
- تم إنشاؤه في المجلد الجذر  
- يحدد index.html كملف افتراضي
- يعطل directory browsing

### 3. ملف redirect.html احتياطي:
- تم إنشاؤه في مجلد selah
- يعيد التوجيه إلى index.html باستخدام JavaScript

## طرق الاختبار:

### للخوادم المحلية:

#### Python HTTP Server:
```bash
cd c:\Users\amins\Downloads\website
python -m http.server 8000
```
ثم اذهب إلى: http://localhost:8000/primary/grade1/arabic/selah/

#### Node.js serve:
```bash
npm install -g serve
cd c:\Users\amins\Downloads\website
serve -s . -p 8000
```

#### PHP Built-in Server:
```bash
cd c:\Users\amins\Downloads\website
php -S localhost:8000
```

### للخوادم المباشرة:
- ارفع الملفات مع .htaccess أو web.config
- تأكد من تفعيل mod_rewrite في Apache
- تأكد من تفعيل URL Rewrite في IIS

## التحقق من الحل:
1. اذهب إلى: your-domain.com/primary/grade1/arabic/selah/
2. يجب أن يتم تحميل محتوى index.html مباشرة
3. لا يجب أن تظهر قائمة الملفات

## ملاحظات:
- إذا كان الخادم يستخدم Nginx، ستحتاج ملف إعداد مختلف
- للخوادم المشتركة، تواصل مع مزود الاستضافة لتفعيل directory index
