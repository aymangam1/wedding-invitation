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
3. انسخ القيمتين:
   - **Project URL** من **Project Settings → Data API**
   - **Publishable key** (`sb_publishable_...`) من **Project Settings → API Keys**
4. أنشئ ملف `.env` في جذر المشروع (انسخه من [`.env.example`](.env.example)):

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

5. أعد تشغيل `npm run dev`.

> **مفتاح واحد بس هو الصح:** استخدم **Publishable key** المخصص للمتصفح. أما **Secret key** (`sb_secret_...`) فهو يتجاوز كل سياسات الأمان ولا يوضع في الموقع أو في المستودع أبدًا.
>
> الاسم القديم `VITE_SUPABASE_ANON_KEY` ما زال مقبولًا في الكود لمن يستخدم المفتاح القديم `anon`.

**قبل إضافة المفاتيح:** سجل التهاني يعمل في وضع احتياطي ويحفظ التعليقات على جهاز الزائر فقط، مع تنبيه واضح في الصفحة. بمجرد إضافة المفاتيح يتحوّل تلقائيًا إلى قاعدة البيانات — بدون أي تعديل في الكود.

### هل المفتاح آمن للنشر؟

نعم. مفتاح `Publishable` مخصّص للاستخدام في المتصفح، وسياسات Row Level Security في `schema.sql` تسمح فقط بقراءة التعليقات وإضافة تعليق جديد — لا تعديل ولا حذف. والصلاحيات على مستوى الجدول مسحوبة أيضًا، فالحذف والتعديل مستحيلان من المتصفح مهما حدث.

### حذف تعليق غير لائق

**الطريقة الأسهل:** من Supabase → **Table Editor** → جدول `wishes` → علّم على الصف → **Delete row**.

**أو من SQL Editor** لو عايز تحذف بالاسم:

```sql
-- شوف التعليقات الأخيرة أولاً
select id, name, message, created_at
from public.wishes
order by created_at desc
limit 20;

-- احذف تعليقًا واحدًا بالمعرّف الذي نسخته من النتيجة
delete from public.wishes where id = 'ضع-المعرّف-هنا';

-- أو احذف كل تعليقات اسم معيّن
delete from public.wishes where name = 'الاسم';
```

التعليق المحذوف يختفي فورًا من كل الصفحات المفتوحة (بدون إعادة تحميل) لأن الصفحة تستمع لأحداث الحذف أيضًا.

## 3) النشر (مجانًا)

الموقع منشور على Cloudflare Pages ومربوط بدومين `ayman-gamal.com`.

### Cloudflare Workers (المستخدم حاليًا)

المشروع مربوط بمستودع GitHub، وأي `git push` على `main` يعيد النشر تلقائيًا.

إعدادات البناء في لوحة Cloudflare:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`

ملف [`wrangler.jsonc`](wrangler.jsonc) هو اللي يحدّد إن مجلد `dist` يُنشر كأصول ثابتة (Static Assets). بدونه يحاول wrangler اكتشاف إعدادات Vite تلقائيًا ويفشل النشر.

متغيّرات البيئة تُضاف من **Settings → Build → Build variables and secrets** — وليس من `Runtime variables and secrets`. لأن Vite يحقن قيم `VITE_*` وقت البناء، فالمتغيّرات لازم تكون متاحة لخطوة البناء لا لوقت التشغيل. (متغيّرات وقت التشغيل غير متاحة أصلاً لـ Worker يقدّم أصولًا ثابتة فقط.)

بعد إضافتها اعمل **Retry deployment** أو ارفع commit جديد، لأن القيم لا تدخل الموقع إلا في بناء جديد.

الدومين يُربط من **Settings → Domains & Routes → Add → Custom domain** وتكتب `ayman-gamal.com`. لأن الدومين على Cloudflare أصلاً، سجلات DNS تُضاف تلقائيًا.

للنشر اليدوي من الجهاز (يحتاج Node 22 أو أحدث لأن wrangler يطلبه):

```bash
npm run build
npx wrangler deploy
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
