export type Lang = 'ar' | 'en'

export const dirFor = (lang: Lang): 'rtl' | 'ltr' => (lang === 'ar' ? 'rtl' : 'ltr')

export const translations = {
  ar: {
    switchTo: 'English',
    switchAria: 'تغيير اللغة إلى الإنجليزية',

    hero: {
      invite: 'بسم الله الرحمن الرحيم',
      weAreGettingMarried: 'يسعدنا مشاركتكم فرحتنا',
      and: 'و',
      date: 'الخميس 17 سبتمبر 2026',
      scroll: 'اكتشف التفاصيل',
    },

    countdown: {
      title: 'العد التنازلي',
      subtitle: 'باقي على الفرح',
      days: 'يوم',
      hours: 'ساعة',
      minutes: 'دقيقة',
      seconds: 'ثانية',
      live: 'الفرح بدأ الآن 🎉',
      liveNote: 'في انتظاركم في قاعة فيلورا',
      done: 'شكرًا لمشاركتكم فرحتنا 💐',
      doneNote: 'ذكرى لا تُنسى بفضل وجودكم',
    },

    details: {
      eyebrow: 'تفاصيل الحفل',
      title: 'موعدنا ومكاننا',
      dateLabel: 'التاريخ',
      dateValue: 'الخميس 17 سبتمبر 2026',
      timeLabel: 'الوقت',
      timeValue: 'من 7:00 مساءً حتى 12:00 منتصف الليل',
      dressLabel: 'الدريس كود',
      dressValue: 'اللون الأبيض للعروسة فقط',
      dressNote: 'برجاء تجنّب اللون الأبيض في ملابسكم',
      addToCalendar: 'أضف إلى تقويمك',
    },

    venue: {
      eyebrow: 'المكان',
      title: 'قاعة فيلورا',
      openMaps: 'افتح في خرائط جوجل',
      mapHint: 'اضغط على الخريطة لفتح الاتجاهات',
      mapTitle: 'خريطة موقع قاعة فيلورا',
    },

    gallery: {
      eyebrow: 'ذكرياتنا',
      title: 'لحظات من قصتنا',
      note: 'كل صورة تحمل حكاية… ونتمنى أن تكون أنت جزءًا من الحكاية القادمة.',
    },

    guestbook: {
      eyebrow: 'سجل التهاني',
      title: 'اكتب لنا كلمة للذكرى',
      subtitle: 'كلماتكم هتفضل معانا للأبد — اكتب اسمك ورسالتك وهتظهر لكل الضيوف.',
      nameLabel: 'اسمك',
      namePlaceholder: 'اكتب اسمك هنا',
      messageLabel: 'تعليقك',
      messagePlaceholder: 'أجمل الأمنيات والدعوات…',
      submit: 'انشر التعليق',
      submitting: 'جاري النشر…',
      success: 'تم نشر تعليقك — شكرًا من القلب 💛',
      empty: 'لسه مفيش تعليقات… كن أول من يبارك لنا!',
      loading: 'جاري تحميل التعليقات…',
      counter: (count: number) => `${count} تعليق`,
      errors: {
        name: 'من فضلك اكتب اسمك (حرفين على الأقل).',
        message: 'من فضلك اكتب تعليقك.',
        tooLong: 'التعليق طويل جدًا.',
        generic: 'حدث خطأ أثناء النشر، حاول مرة أخرى.',
      },
      localNotice:
        'التعليقات محفوظة على هذا الجهاز فقط لأن قاعدة البيانات غير مُفعّلة بعد.',
      justNow: 'الآن',
      minutesAgo: (n: number) => `قبل ${n} دقيقة`,
      hoursAgo: (n: number) => `قبل ${n} ساعة`,
      daysAgo: (n: number) => `قبل ${n} يوم`,
    },

    music: {
      play: 'تشغيل الموسيقى',
      mute: 'كتم الموسيقى',
      unavailable: 'ملف الموسيقى غير متوفر',
    },

    share: {
      eyebrow: 'شاركوا الدعوة',
      title: 'ابعت الدعوة لحبايبك',
      subtitle: 'شارك اللينك مع اللي تحب يكون معانا في يومنا.',
      whatsapp: 'واتساب',
      facebook: 'فيسبوك',
      copy: 'نسخ الرابط',
      copied: 'تم نسخ الرابط',
      native: 'مشاركة',
      /** Message body sent with the link on WhatsApp and the share sheet. */
      message: 'يسعدنا مشاركتكم فرحنا 💐 فرح Ayman & Menna — الخميس 17 سبتمبر 2026، قاعة فيلورا، عين شمس. تفاصيل الدعوة:',
    },

    footer: {
      thanks: 'وجودكم هو أجمل هدية',
      names: 'Ayman & Menna',
      date: '17 . 09 . 2026',
    },
  },

  en: {
    switchTo: 'العربية',
    switchAria: 'Switch language to Arabic',

    hero: {
      invite: 'In the name of God, the Most Gracious',
      weAreGettingMarried: 'We are getting married',
      and: '&',
      date: 'Thursday, 17 September 2026',
      scroll: 'Discover the details',
    },

    countdown: {
      title: 'Countdown',
      subtitle: 'Until we say I do',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds',
      live: 'The celebration has begun 🎉',
      liveNote: 'We are waiting for you at Fillora Hall',
      done: 'Thank you for celebrating with us 💐',
      doneNote: 'A night we will never forget, because of you',
    },

    details: {
      eyebrow: 'Event details',
      title: 'When & where',
      dateLabel: 'Date',
      dateValue: 'Thursday, 17 September 2026',
      timeLabel: 'Time',
      timeValue: '7:00 PM until 12:00 midnight',
      dressLabel: 'Dress code',
      dressValue: 'White is reserved for the bride',
      dressNote: 'Kindly avoid wearing white',
      addToCalendar: 'Add to calendar',
    },

    venue: {
      eyebrow: 'The venue',
      title: 'Fillora Hall',
      openMaps: 'Open in Google Maps',
      mapHint: 'Tap the map to get directions',
      mapTitle: 'Map showing Fillora Hall location',
    },

    gallery: {
      eyebrow: 'Our memories',
      title: 'Moments from our story',
      note: 'Every photo holds a story — we hope you will be part of the next one.',
    },

    guestbook: {
      eyebrow: 'Guest book',
      title: 'Leave us a note to remember',
      subtitle: 'Your words will stay with us forever. Write your name and message and everyone will see it.',
      nameLabel: 'Your name',
      namePlaceholder: 'Type your name',
      messageLabel: 'Your message',
      messagePlaceholder: 'Warmest wishes and prayers…',
      submit: 'Post message',
      submitting: 'Posting…',
      success: 'Your message is live — thank you from our hearts 💛',
      empty: 'No messages yet — be the first to congratulate us!',
      loading: 'Loading messages…',
      counter: (count: number) => `${count} ${count === 1 ? 'message' : 'messages'}`,
      errors: {
        name: 'Please enter your name (at least 2 characters).',
        message: 'Please write your message.',
        tooLong: 'That message is a little too long.',
        generic: 'Something went wrong. Please try again.',
      },
      localNotice: 'Messages are saved on this device only, because the database is not connected yet.',
      justNow: 'just now',
      minutesAgo: (n: number) => `${n} min ago`,
      hoursAgo: (n: number) => `${n} h ago`,
      daysAgo: (n: number) => `${n} d ago`,
    },

    music: {
      play: 'Play music',
      mute: 'Mute music',
      unavailable: 'Music file is not available',
    },

    share: {
      eyebrow: 'Share the invitation',
      title: 'Invite the people you love',
      subtitle: 'Send the link to anyone you want beside us on our day.',
      whatsapp: 'WhatsApp',
      facebook: 'Facebook',
      copy: 'Copy link',
      copied: 'Link copied',
      native: 'Share',
      message:
        'We would love you to celebrate with us 💐 Ayman & Menna — Thursday 17 September 2026, Fillora Hall, Ain Shams. Invitation details:',
    },

    footer: {
      thanks: 'Your presence is the greatest gift',
      names: 'Ayman & Menna',
      date: '17 . 09 . 2026',
    },
  },
}

export type Dictionary = (typeof translations)['ar']
