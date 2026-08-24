# دعوة زفاف Ayman & Menna — Wedding Invitation Site

صفحة دعوة زفاف تفاعلية بالعربية والإنجليزية، فيها عدّ تنازلي، موسيقى خلفية بزر كتم، خريطة القاعة، وسجل تهاني يظهر لكل الضيوف.

- **العروسان:** Ayman & Menna
- **الموعد:** الخميس 17 سبتمبر 2026، من 7:00 مساءً حتى 12:00 منتصف الليل
- **المكان:** قاعة فيلورا — حديقة الحلمية، 147 شارع المشد، النزهة، عين شمس، القاهرة
- **الدريس كود:** اللون الأبيض للعروسة فقط

## التشغيل السريع

```bash
npm install
npm run dev
```

ثم افتح `http://localhost:5173`.

للبناء النهائي:

```bash
npm run build      # ينتج مجلد dist
npm run preview    # معاينة النسخة النهائية محليًا
```

## 1) إضافة الصور والأغنية

| المطلوب        | المسار                        |
| -------------- | ----------------------------- |
| صورة الغلاف    | `public/assets/images/hero.jpg` |
| صور المعرض     | `public/assets/images/couple-1.jpg` … `couple-4.jpg` |
| الأغنية        | `public/assets/music/song.mp3` |

التفاصيل الكاملة (المقاسات المقترحة) في:

- [`public/assets/images/README.md`](public/assets/images/README.md)
- [`public/assets/music/README.md`](public/assets/music/README.md)

الصفحة تعمل بدون هذه الملفات: الغلاف يظهر بتدرّج لوني، والمعرض بأيقونات، وزر الموسيقى يظهر معطّلًا.

## 2) تفعيل التعليقات (Supabase)

التعليقات تُحفظ في قاعدة بيانات مجانية على [Supabase](https://supabase.com) وتظهر لحظيًا لكل من يفتح الصفحة.

1. أنشئ مشروعًا مجانيًا جديدًا على Supabase.
2. من **SQL Editor**، الصق محتوى [`supabase/schema.sql`](supabase/schema.sql) واضغط Run.
3. من **Project Settings → API** انسخ `Project URL` و `anon public key`.
4. أنشئ ملف `.env` في جذر المشروع (انسخه من [`.env.example`](.env.example)):

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

5. أعد تشغيل `npm run dev`.

**قبل إضافة المفاتيح:** سجل التهاني يعمل في وضع احتياطي ويحفظ التعليقات على جهاز الزائر فقط، مع تنبيه واضح في الصفحة. بمجرد إضافة المفاتيح يتحوّل تلقائيًا إلى قاعدة البيانات — بدون أي تعديل في الكود.

### هل مفتاح `anon` آمن للنشر؟

نعم. المفتاح مخصّص للاستخدام في المتصفح، وسياسات Row Level Security في `schema.sql` تسمح فقط بقراءة التعليقات وإضافة تعليق جديد — لا تعديل ولا حذف.

### حذف تعليق غير لائق

من Supabase → **Table Editor** → جدول `wishes` → احذف الصف. الحذف ينعكس على الصفحة عند إعادة تحميلها.

## 3) النشر (مجانًا)

الموقع منشور على Cloudflare Pages ومربوط بدومين `ayman-gamal.com`.

### Cloudflare Pages (المستخدم حاليًا)

1. من لوحة Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**.
2. اختر مستودع `aymangam1/wedding-invitation` والفرع `main`.
3. إعدادات البناء:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
4. أضف متغيّرات البيئة `VITE_SUPABASE_URL` و `VITE_SUPABASE_ANON_KEY` (لبيئة Production و Preview).
5. بعد أول نشر: **Custom domains → Set up a custom domain** واكتب `ayman-gamal.com`. لأن الدومين على Cloudflare أصلاً، سجلات DNS تُضاف تلقائيًا.

بعد كده أي `git push` على `main` يعيد النشر تلقائيًا.

للنشر اليدوي من الجهاز بدون ربط Git:

```bash
npm run build
npx wrangler pages deploy dist --project-name=wedding-invitation
```

### Vercel

1. ارفع المشروع على GitHub.
2. من Vercel اختر **Add New → Project** واختر المستودع.
3. الإعدادات تُكتشف تلقائيًا (Framework: Vite، Build: `npm run build`، Output: `dist`).
4. أضف `VITE_SUPABASE_URL` و `VITE_SUPABASE_ANON_KEY` في **Settings → Environment Variables**، ثم Deploy.

### Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- أضف نفس متغيّري البيئة من **Site settings → Environment variables**.

> مهم: أي تغيير في متغيّرات البيئة يحتاج إعادة نشر (Redeploy) حتى يظهر أثره.

## 4) تعديل بيانات الفرح

كل التفاصيل في ملف واحد: [`src/config.ts`](src/config.ts) — الأسماء، الموعد، القاعة، رابط الخريطة، مسار الأغنية، وصور المعرض.

النصوص العربية والإنجليزية كلها في [`src/i18n/translations.ts`](src/i18n/translations.ts).

## هيكل المشروع

```
src/
├─ config.ts                 # بيانات الفرح (مصدر واحد للحقيقة)
├─ i18n/
│  ├─ translations.ts        # نصوص ar / en
│  └─ LanguageContext.tsx    # حالة اللغة + dir=rtl/ltr + حفظ الاختيار
├─ hooks/
│  ├─ useCountdown.ts        # العد التنازلي وحالات الفرح
│  └─ useAudioPlayer.ts      # الموسيقى + الكتم + حفظ الاختيار
├─ lib/
│  ├─ supabase.ts            # العميل (null بدون مفاتيح)
│  └─ wishes.ts              # قراءة/إضافة/بث التعليقات + الوضع الاحتياطي
└─ components/               # أقسام الصفحة
```

## الميزات

- عدّ تنازلي حيّ، ويتحول تلقائيًا إلى «الفرح بدأ» ثم رسالة شكر بعد انتهاء الحفل.
- تبديل عربي/إنجليزي مع تغيير اتجاه الصفحة، والاختيار محفوظ للزيارة القادمة.
- موسيقى خلفية متصلة مع زر كتم/تشغيل عائم.
- خريطة القاعة مدمجة، والضغط عليها أو على الزر يفتح خرائط جوجل.
- زر «أضف إلى تقويمك» يضيف الفرح إلى Google Calendar.
- سجل تهاني بالاسم والتعليق، يظهر للجميع لحظيًا.
- أزرار مشاركة الدعوة على واتساب وفيسبوك، ونسخ الرابط، ومشاركة الجهاز على الموبايل.
- تصميم متجاوب موبايل-أولاً، ويحترم إعداد `prefers-reduced-motion`.
