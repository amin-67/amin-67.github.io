/**
 * Mock Data for Advanced Search System
 * بيانات وهمية لنظام البحث المتقدم
 */

// Educational content database
const mockContentDatabase = [
    // المرحلة الابتدائية - الصف الأول
    {
        id: 'primary-1-arabic-1',
        title: 'مذكرة اللغة العربية - الصف الأول الابتدائي',
        description: 'مذكرة شاملة تحتوي على دروس الحروف والكلمات البسيطة مع التدريبات',
        stage: 'primary',
        grade: '1',
        subject: 'arabic',
        contentType: 'notes',
        author: 'أ/ محمد أحمد',
        rating: 4.8,
        downloads: 2500,
        size: '5.2 MB',
        pages: 45,
        image: 'images/primary/grade1/arabic/alibdaa-arabic.jpg',
        downloadUrl: '#',
        tags: ['حروف', 'كلمات', 'تدريبات', 'أساسيات'],
        keywords: ['اللغة العربية', 'أولى ابتدائي', 'حروف', 'قراءة', 'كتابة']
    },
    {
        id: 'primary-1-math-1',
        title: 'مذكرة الرياضيات - الصف الأول الابتدائي',
        description: 'تعلم الأرقام والعمليات الحسابية البسيطة مع أمثلة تفاعلية',
        stage: 'primary',
        grade: '1',
        subject: 'math',
        contentType: 'notes',
        author: 'أ/ فاطمة سعد',
        rating: 4.7,
        downloads: 2200,
        size: '4.8 MB',
        pages: 38,
        image: 'images/primary/grade1/math/math-primary1.jpg',
        downloadUrl: '#',
        tags: ['أرقام', 'جمع', 'طرح', 'عد'],
        keywords: ['رياضيات', 'أولى ابتدائي', 'أرقام', 'حساب', 'عمليات']
    },
    {
        id: 'primary-1-english-1',
        title: 'مذكرة اللغة الإنجليزية - الصف الأول الابتدائي',
        description: 'تعلم الحروف الإنجليزية والكلمات الأساسية بطريقة ممتعة',
        stage: 'primary',
        grade: '1',
        subject: 'english',
        contentType: 'notes',
        author: 'Miss Sarah Ahmed',
        rating: 4.6,
        downloads: 1900,
        size: '6.1 MB',
        pages: 42,
        image: 'images/primary/grade1/english/brilliant-english.jpg',
        downloadUrl: '#',
        tags: ['alphabet', 'كلمات', 'نطق', 'أساسيات'],
        keywords: ['إنجليزي', 'أولى ابتدائي', 'حروف', 'كلمات', 'نطق']
    },
    {
        id: 'primary-1-discover-1',
        title: 'مذكرة اكتشف - الصف الأول الابتدائي',
        description: 'استكشاف البيئة المحيطة والعلوم الطبيعية للأطفال',
        stage: 'primary',
        grade: '1',
        subject: 'discover',
        contentType: 'notes',
        author: 'أ/ نورا حسن',
        rating: 4.5,
        downloads: 1650,
        size: '7.3 MB',
        pages: 50,
        image: 'images/primary/grade1/discover/alawaa-discover.jpg',
        downloadUrl: '#',
        tags: ['علوم', 'بيئة', 'طبيعة', 'استكشاف'],
        keywords: ['اكتشف', 'أولى ابتدائي', 'علوم', 'بيئة', 'طبيعة']
    },
    {
        id: 'primary-1-religion-1',
        title: 'مذكرة التربية الدينية - الصف الأول الابتدائي',
        description: 'تعليم الأطفال أساسيات الدين الإسلامي بطريقة محببة',
        stage: 'primary',
        grade: '1',
        subject: 'religion',
        contentType: 'notes',
        author: 'أ/ أحمد عبدالله',
        rating: 4.9,
        downloads: 2100,
        size: '4.5 MB',
        pages: 35,
        image: 'images/primary/grade1/religion/religion-primary1.jpg',
        downloadUrl: '#',
        tags: ['دين', 'قرآن', 'آداب', 'أخلاق'],
        keywords: ['تربية دينية', 'أولى ابتدائي', 'قرآن', 'أخلاق', 'آداب']
    },

    // المرحلة الإعدادية - الصف الأول
    {
        id: 'preparatory-1-arabic-1',
        title: 'مذكرة اللغة العربية - الصف الأول الإعدادي',
        description: 'دروس النحو والصرف والأدب للصف الأول الإعدادي',
        stage: 'preparatory',
        grade: '1',
        subject: 'arabic',
        contentType: 'notes',
        author: 'أ/ عمر محمود',
        rating: 4.7,
        downloads: 3200,
        size: '8.4 MB',
        pages: 85,
        image: 'images/preparatory/arabic/arabic-prep1.jpg',
        downloadUrl: '#',
        tags: ['نحو', 'صرف', 'أدب', 'قراءة'],
        keywords: ['عربي', 'أولى إعدادي', 'نحو', 'صرف', 'أدب']
    },
    {
        id: 'preparatory-1-math-1',
        title: 'مذكرة الرياضيات - الصف الأول الإعدادي',
        description: 'الجبر والهندسة والإحصاء للصف الأول الإعدادي',
        stage: 'preparatory',
        grade: '1',
        subject: 'math',
        contentType: 'notes',
        author: 'أ/ مصطفى علي',
        rating: 4.6,
        downloads: 2900,
        size: '9.1 MB',
        pages: 92,
        image: 'images/preparatory/math/math-prep1.jpg',
        downloadUrl: '#',
        tags: ['جبر', 'هندسة', 'إحصاء', 'معادلات'],
        keywords: ['رياضيات', 'أولى إعدادي', 'جبر', 'هندسة', 'معادلات']
    },
    {
        id: 'preparatory-1-science-1',
        title: 'مذكرة العلوم - الصف الأول الإعدادي',
        description: 'فيزياء وكيمياء وأحياء للصف الأول الإعدادي',
        stage: 'preparatory',
        grade: '1',
        subject: 'science',
        contentType: 'notes',
        author: 'د/ هالة سمير',
        rating: 4.8,
        downloads: 2700,
        size: '10.2 MB',
        pages: 78,
        image: 'images/preparatory/science/science-prep1.jpg',
        downloadUrl: '#',
        tags: ['فيزياء', 'كيمياء', 'أحياء', 'تجارب'],
        keywords: ['علوم', 'أولى إعدادي', 'فيزياء', 'كيمياء', 'أحياء']
    },

    // المرحلة الثانوية - الصف الأول
    {
        id: 'secondary-1-physics-1',
        title: 'مذكرة الفيزياء - الصف الأول الثانوي',
        description: 'أساسيات الفيزياء والميكانيكا للصف الأول الثانوي',
        stage: 'secondary',
        grade: '1',
        subject: 'physics',
        contentType: 'notes',
        author: 'د/ محمد عبدالرحمن',
        rating: 4.9,
        downloads: 4200,
        size: '12.5 MB',
        pages: 120,
        image: 'images/books/physics/altafawok-physics.jpg',
        downloadUrl: '#',
        tags: ['ميكانيكا', 'حركة', 'قوانين', 'فيزياء'],
        keywords: ['فيزياء', 'أولى ثانوي', 'ميكانيكا', 'حركة', 'قوانين']
    },
    {
        id: 'secondary-1-chemistry-1',
        title: 'مذكرة الكيمياء - الصف الأول الثانوي',
        description: 'أساسيات الكيمياء والتفاعلات الكيميائية',
        stage: 'secondary',
        grade: '1',
        subject: 'chemistry',
        contentType: 'notes',
        author: 'د/ ياسمين فتحي',
        rating: 4.7,
        downloads: 3800,
        size: '11.8 MB',
        pages: 105,
        image: 'images/books/chemistry/chemistry-secondary1.jpg',
        downloadUrl: '#',
        tags: ['تفاعلات', 'عناصر', 'مركبات', 'كيمياء'],
        keywords: ['كيمياء', 'أولى ثانوي', 'تفاعلات', 'عناصر', 'مركبات']
    },

    // مراجعات نهائية
    {
        id: 'primary-1-arabic-review',
        title: 'مراجعة نهائية - اللغة العربية الصف الأول الابتدائي',
        description: 'مراجعة شاملة لجميع دروس اللغة العربية للصف الأول',
        stage: 'primary',
        grade: '1',
        subject: 'arabic',
        contentType: 'reviews',
        author: 'أ/ سارة محمد',
        rating: 4.9,
        downloads: 3500,
        size: '6.8 MB',
        pages: 55,
        image: 'images/primary/grade1/arabic/review-arabic.jpg',
        downloadUrl: '#',
        tags: ['مراجعة', 'نهائية', 'شاملة', 'امتحان'],
        keywords: ['مراجعة نهائية', 'عربي', 'أولى ابتدائي', 'امتحان']
    },

    // امتحانات سابقة
    {
        id: 'preparatory-1-math-exam',
        title: 'امتحانات سابقة - رياضيات الصف الأول الإعدادي',
        description: 'مجموعة من الامتحانات السابقة مع الحلول النموذجية',
        stage: 'preparatory',
        grade: '1',
        subject: 'math',
        contentType: 'exams',
        author: 'إدارة التعليم',
        rating: 4.8,
        downloads: 4100,
        size: '7.5 MB',
        pages: 68,
        image: 'images/preparatory/math/exams-math.jpg',
        downloadUrl: '#',
        tags: ['امتحانات', 'حلول', 'نماذج', 'تدريب'],
        keywords: ['امتحانات', 'رياضيات', 'أولى إعدادي', 'حلول', 'نماذج']
    },

    // كتب مدرسية
    {
        id: 'secondary-1-physics-book',
        title: 'الكتاب المدرسي - فيزياء الصف الأول الثانوي',
        description: 'الكتاب المدرسي الرسمي لمادة الفيزياء',
        stage: 'secondary',
        grade: '1',
        subject: 'physics',
        contentType: 'books',
        author: 'وزارة التربية والتعليم',
        rating: 4.5,
        downloads: 2800,
        size: '15.2 MB',
        pages: 150,
        image: 'images/books/physics/book-physics.jpg',
        downloadUrl: '#',
        tags: ['كتاب مدرسي', 'رسمي', 'منهج', 'وزارة'],
        keywords: ['كتاب', 'فيزياء', 'أولى ثانوي', 'منهج', 'رسمي']
    }
];

// Search suggestions and popular searches
const searchSuggestions = {
    popular: [
        'مراجعة نهائية',
        'امتحانات سابقة',
        'رياضيات أولى ابتدائي',
        'اللغة العربية',
        'العلوم',
        'اللغة الإنجليزية',
        'فيزياء ثانوي',
        'كيمياء',
        'التربية الدينية',
        'اكتشف'
    ],
    subjects: [
        'اللغة العربية',
        'الرياضيات',
        'اللغة الإنجليزية',
        'العلوم',
        'الدراسات الاجتماعية',
        'التربية الدينية',
        'الفيزياء',
        'الكيمياء',
        'الأحياء',
        'اكتشف'
    ],
    stages: [
        'ابتدائي',
        'إعدادي',
        'ثانوي',
        'أولى ابتدائي',
        'ثانية ابتدائي',
        'أولى إعدادي',
        'أولى ثانوي'
    ],
    contentTypes: [
        'مذكرات',
        'ملخصات',
        'مراجعات',
        'امتحانات',
        'كتب',
        'حلول',
        'نماذج',
        'تدريبات'
    ]
};

// Grade mappings for each stage
const gradesByStage = {
    primary: [
        { value: '1', label: 'الصف الأول' },
        { value: '2', label: 'الصف الثاني' },
        { value: '3', label: 'الصف الثالث' },
        { value: '4', label: 'الصف الرابع' },
        { value: '5', label: 'الصف الخامس' },
        { value: '6', label: 'الصف السادس' }
    ],
    preparatory: [
        { value: '1', label: 'الصف الأول' },
        { value: '2', label: 'الصف الثاني' },
        { value: '3', label: 'الصف الثالث' }
    ],
    secondary: [
        { value: '1', label: 'الصف الأول' },
        { value: '2', label: 'الصف الثاني' },
        { value: '3', label: 'الصف الثالث' }
    ]
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        mockContentDatabase,
        searchSuggestions,
        gradesByStage
    };
} else {
    // Browser environment
    window.mockData = {
        contentDatabase: mockContentDatabase,
        searchSuggestions: searchSuggestions,
        gradesByStage: gradesByStage
    };
}
