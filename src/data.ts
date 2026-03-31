export interface GameItem {
  id: string;
  char: string;
  name: string; // Sephardi (Modern)
  ashkenaziName?: string;
  color?: string;
}

export const LETTERS: GameItem[] = [
  { id: 'alef', char: 'א', name: 'אלף', ashkenaziName: 'אלף', color: 'text-red-500' },
  { id: 'bet_d', char: 'בּ', name: 'בית דגושה', ashkenaziName: 'בייס דגושה', color: 'text-blue-500' },
  { id: 'bet', char: 'ב', name: 'בית', ashkenaziName: 'בייס', color: 'text-green-500' },
  { id: 'gimel', char: 'ג', name: 'גימל', ashkenaziName: 'גימל', color: 'text-purple-500' },
  { id: 'dalet', char: 'ד', name: 'דלת', ashkenaziName: 'דלת', color: 'text-orange-500' },
  { id: 'he', char: 'ה', name: 'הא', ashkenaziName: 'הא', color: 'text-pink-500' },
  { id: 'vav', char: 'ו', name: 'וו', ashkenaziName: 'וו', color: 'text-teal-500' },
  { id: 'zayin', char: 'ז', name: 'זיין', ashkenaziName: 'זיין', color: 'text-indigo-500' },
  { id: 'het', char: 'ח', name: 'חית', ashkenaziName: 'חייס', color: 'text-red-600' },
  { id: 'tet', char: 'ט', name: 'טית', ashkenaziName: 'טייס', color: 'text-blue-600' },
  { id: 'yod', char: 'י', name: 'יוד', ashkenaziName: 'יוד', color: 'text-green-600' },
  { id: 'kaf_d', char: 'כּ', name: 'כף דגושה', ashkenaziName: 'כף דגושה', color: 'text-purple-600' },
  { id: 'kaf', char: 'כ', name: 'כף', ashkenaziName: 'כף', color: 'text-orange-600' },
  { id: 'kaf_s', char: 'ך', name: 'כף סופית', ashkenaziName: 'כף סופית', color: 'text-pink-600' },
  { id: 'lamed', char: 'ל', name: 'למד', ashkenaziName: 'למד', color: 'text-teal-600' },
  { id: 'mem', char: 'מ', name: 'מם', ashkenaziName: 'מם', color: 'text-indigo-600' },
  { id: 'mem_s', char: 'ם', name: 'מם סופית', ashkenaziName: 'מם סופית', color: 'text-red-400' },
  { id: 'nun', char: 'נ', name: 'נון', ashkenaziName: 'נון', color: 'text-blue-400' },
  { id: 'nun_s', char: 'ן', name: 'נון סופית', ashkenaziName: 'נון סופית', color: 'text-green-400' },
  { id: 'samech', char: 'ס', name: 'סמך', ashkenaziName: 'סמך', color: 'text-purple-400' },
  { id: 'ayin', char: 'ע', name: 'עין', ashkenaziName: 'עין', color: 'text-orange-400' },
  { id: 'pe_d', char: 'פּ', name: 'פא דגושה', ashkenaziName: 'פא דגושה', color: 'text-pink-400' },
  { id: 'pe', char: 'פ', name: 'פא', ashkenaziName: 'פא', color: 'text-teal-400' },
  { id: 'pe_s', char: 'ף', name: 'פא סופית', ashkenaziName: 'פא סופית', color: 'text-indigo-400' },
  { id: 'tsadi', char: 'צ', name: 'צדי', ashkenaziName: 'צדיק', color: 'text-red-700' },
  { id: 'tsadi_s', char: 'ץ', name: 'צדי סופית', ashkenaziName: 'צדיק סופית', color: 'text-blue-700' },
  { id: 'qof', char: 'ק', name: 'קוף', ashkenaziName: 'קוף', color: 'text-green-700' },
  { id: 'resh', char: 'ר', name: 'ריש', ashkenaziName: 'ריש', color: 'text-purple-700' }
];

export const FINAL_ROW_LETTERS: GameItem[] = [
  { id: 'shin', char: 'שׁ', name: 'שין ימנית', ashkenaziName: 'שין', color: 'text-orange-700' },
  { id: 'sin', char: 'שׂ', name: 'שין שמאלית', ashkenaziName: 'סין', color: 'text-pink-700' },
  { id: 'tav_d', char: 'תּ', name: 'תיו דגושה', ashkenaziName: 'תיו דגושה', color: 'text-teal-700' },
  { id: 'tav', char: 'ת', name: 'תיו', ashkenaziName: 'סיו', color: 'text-indigo-700' }
];

export const NIKUD: GameItem[] = [
  { id: 'kamatz', char: '\u05B8', name: 'קָמַץ', ashkenaziName: 'קומץ' },
  { id: 'patah', char: '\u05B7', name: 'פַּתָּח', ashkenaziName: 'פַתַח' },
  { id: 'tsere', char: '\u05B5', name: 'צֵירֵי', ashkenaziName: 'צֵירֶה' },
  { id: 'segol', char: '\u05B6', name: 'סֶגּוֹל', ashkenaziName: 'סֶגוֹל' },
  { id: 'shva', char: '\u05B0', name: 'שְׁוָא', ashkenaziName: 'שְוָוא' },
  { id: 'holam', char: '\u05BA', name: 'חוֹלָם', ashkenaziName: 'חוֹלֶם' },
  { id: 'hiriq', char: '\u05B4', name: 'חִירִיק', ashkenaziName: 'חִירֶק' },
  { id: 'kubutz', char: '\u05BB', name: 'קִבּוּץ', ashkenaziName: 'קוּבּוּץ' },
  { id: 'shuruk', char: '\u05D5\u05BC', name: 'שׁוּרוּק', ashkenaziName: 'שׁוּרוּק' },
  { id: 'hataf_kamatz', char: '\u05B3', name: 'חֲטַף קָמַץ', ashkenaziName: 'חטף קומץ' },
  { id: 'hataf_patah', char: '\u05B2', name: 'חֲטַף פַּתָּח', ashkenaziName: 'חטף פַתַח' },
  { id: 'hataf_segol', char: '\u05B1', name: 'חֲטַף סֶגּוֹל', ashkenaziName: 'חטף סֶגוֹל' }
];

export const STAGES = [
  { id: 1, name: 'לוּחַ הַכָּרָה', locked: false },
  { id: 2, name: 'צֵירוּפֵי אוֹתִיּוֹת', locked: true },
  { id: 3, name: 'קְרִיאַת מִילִּים', locked: true },
  { id: 4, name: 'מִשְׁפָּטִים קְצָרִים', locked: true },
  { id: 5, name: 'קְרִיאָה שׁוֹטֶפֶת', locked: true }
];

export interface Word {
  id: string;
  text: string;
  nikudText: string;
  translation?: string;
  color: string;
  category: string;
  imageUrl?: string;
}

export const SIMPLE_WORDS: Word[] = [
  // --- קמץ ופתח ---
  { id: 'k1', text: 'פרה', nikudText: 'פָּרָה', category: 'קמץ-פתח', color: 'text-red-500' },
  { id: 'k2', text: 'למה', nikudText: 'לָמָה', category: 'קמץ-פתח', color: 'text-blue-500' },
  { id: 'k3', text: 'קנה', nikudText: 'קָנָה', category: 'קמץ-פתח', color: 'text-green-500' },
  { id: 'k4', text: 'בנה', nikudText: 'בָּנָה', category: 'קמץ-פתח', color: 'text-purple-500' },
  { id: 'k5', text: 'עלה', nikudText: 'עָלָה', category: 'קמץ-פתח', color: 'text-orange-500' },
  { id: 'a1', text: 'אבא', nikudText: 'אַבָּא', category: 'קמץ-פתח', color: 'text-orange-600' },
  { id: 'a2', text: 'סבא', nikudText: 'סַבָּא', category: 'קמץ-פתח', color: 'text-pink-600' },
  { id: 'c1', text: 'גמל', nikudText: 'גָּמָל', category: 'קמץ-פתח', color: 'text-teal-500' },
  { id: 'c2', text: 'נחש', nikudText: 'נָחָשׁ', category: 'קמץ-פתח', color: 'text-indigo-500' },
  { id: 'p1', text: 'שבת', nikudText: 'שַׁבָּת', category: 'קמץ-פתח', color: 'text-red-600' },
  { id: 'p2', text: 'דג', nikudText: 'דָּג', category: 'קמץ-פתח', color: 'text-blue-500' },
  { id: 'p3', text: 'יד', nikudText: 'יָד', category: 'קמץ-פתח', color: 'text-green-500' },
  { id: 'p4', text: 'גן', nikudText: 'גַּן', category: 'קמץ-פתח', color: 'text-purple-500' },
  { id: 'p5', text: 'חלה', nikudText: 'חַלָּה', category: 'קמץ-פתח', color: 'text-orange-500' },

  // --- חיריק ---
  { id: 'h1', text: 'אמא', nikudText: 'אִמָּא', category: 'חיריק', color: 'text-blue-500' },
  { id: 'h2', text: 'שיר', nikudText: 'שִׁיר', category: 'חיריק', color: 'text-red-500' },
  { id: 'h3', text: 'קיר', nikudText: 'קִיר', category: 'חיריק', color: 'text-green-500' },
  { id: 'h4', text: 'גיל', nikudText: 'גִּיל', category: 'חיריק', color: 'text-purple-500' },
  { id: 'h5', text: 'פיל', nikudText: 'פִּיל', category: 'חיריק', color: 'text-orange-500' },
  { id: 'h6', text: 'תיק', nikudText: 'תִּיק', category: 'חיריק', color: 'text-pink-500' },
  { id: 'h7', text: 'מיץ', nikudText: 'מִיץ', category: 'חיריק', color: 'text-teal-500' },
  { id: 'h8', text: 'ריב', nikudText: 'רִיב', category: 'חיריק', color: 'text-indigo-500' },
  { id: 'h9', text: 'סכין', nikudText: 'סַכִּין', category: 'חיריק', color: 'text-red-400' },
  { id: 'h10', text: 'מילים', nikudText: 'מִילִּים', category: 'חיריק', color: 'text-blue-400' },
  { id: 'h11', text: 'לימון', nikudText: 'לִימוֹן', category: 'חיריק', color: 'text-green-400' },
  { id: 'h12', text: 'ציפור', nikudText: 'צִפּוֹר', category: 'חיריק', color: 'text-purple-400' },

  // --- צירה וסגול ---
  { id: 'e1', text: 'ספר', nikudText: 'סֵפֶר', category: 'צירה-סגול', color: 'text-orange-600' },
  { id: 'e2', text: 'ילד', nikudText: 'יֶלֶד', category: 'צירה-סגול', color: 'text-pink-600' },
  { id: 'e3', text: 'רגל', nikudText: 'רֶגֶל', category: 'צירה-סגול', color: 'text-teal-600' },
  { id: 'e4', text: 'שמש', nikudText: 'שֶׁמֶשׁ', category: 'צירה-סגול', color: 'text-indigo-600' },
  { id: 'e5', text: 'עץ', nikudText: 'עֵץ', category: 'צירה-סגול', color: 'text-red-500' },
  { id: 'e6', text: 'לב', nikudText: 'לֵב', category: 'צירה-סגול', color: 'text-blue-500' },
  { id: 'e7', text: 'חבר', nikudText: 'חָבֵר', category: 'צירה-סגול', color: 'text-green-500' },
  { id: 'e8', text: 'דלת', nikudText: 'דֶּלֶת', category: 'צירה-סגול', color: 'text-purple-500' },
  { id: 'e9', text: 'לחם', nikudText: 'לֶחֶם', category: 'צירה-סגול', color: 'text-orange-500' },
  { id: 'e10', text: 'פרח', nikudText: 'פֶּרַח', category: 'צירה-סגול', color: 'text-pink-500' },
  { id: 'e11', text: 'גשם', nikudText: 'גֶּשֶׁם', category: 'צירה-סגול', color: 'text-teal-500' },
  { id: 'e12', text: 'דגל', nikudText: 'דֶּגֶל', category: 'צירה-סגול', color: 'text-indigo-500' },

  // --- חולם ---
  { id: 'o1', text: 'שלום', nikudText: 'שָׁלוֹם', category: 'חולם', color: 'text-red-600' },
  { id: 'o2', text: 'דוב', nikudText: 'דּוֹב', category: 'חולם', color: 'text-blue-600' },
  { id: 'o3', text: 'אור', nikudText: 'אוֹר', category: 'חולם', color: 'text-green-600' },
  { id: 'o4', text: 'יום', nikudText: 'יוֹם', category: 'חולם', color: 'text-purple-600' },
  { id: 'o5', text: 'טוב', nikudText: 'טוֹב', category: 'חולם', color: 'text-orange-600' },
  { id: 'o6', text: 'חלון', nikudText: 'חַלּוֹן', category: 'חולם', color: 'text-pink-600' },
  { id: 'o7', text: 'בלון', nikudText: 'בַּלּוֹן', category: 'חולם', color: 'text-teal-600' },
  { id: 'o8', text: 'שעון', nikudText: 'שָׁעוֹן', category: 'חולם', color: 'text-indigo-600' },
  { id: 'o9', text: 'כובע', nikudText: 'כּוֹבַע', category: 'חולם', color: 'text-red-500' },
  { id: 'o10', text: 'אוטו', nikudText: 'אוֹטוֹ', category: 'חולם', color: 'text-blue-500' },
  { id: 'o11', text: 'צהוב', nikudText: 'צָהֹב', category: 'חולם', color: 'text-green-500' },
  { id: 'o12', text: 'אדום', nikudText: 'אָדוֹם', category: 'חולם', color: 'text-purple-500' },

  // --- שורוק וקובוץ ---
  { id: 'u1', text: 'סוס', nikudText: 'סוּס', category: 'שורוק-קובוץ', color: 'text-orange-400' },
  { id: 'u2', text: 'בובה', nikudText: 'בּוּבָּה', category: 'שורוק-קובוץ', color: 'text-pink-400' },
  { id: 'u3', text: 'תנור', nikudText: 'תַּנּוּר', category: 'שורוק-קובוץ', color: 'text-teal-400' },
  { id: 'u4', text: 'כדור', nikudText: 'כַּדּוּר', category: 'שורוק-קובוץ', color: 'text-indigo-400' },
  { id: 'u5', text: 'חתול', nikudText: 'חָתוּל', category: 'שורוק-קובוץ', color: 'text-red-600' },
  { id: 'u6', text: 'תפוז', nikudText: 'תַּפּוּז', category: 'שורוק-קובוץ', color: 'text-blue-600' },
  { id: 'u7', text: 'חולצה', nikudText: 'חוּלְצָה', category: 'שורוק-קובוץ', color: 'text-green-600' },
  { id: 'u8', text: 'שולחן', nikudText: 'שֻׁלְחָן', category: 'שורוק-קובוץ', color: 'text-purple-600' },
  { id: 'u9', text: 'סולם', nikudText: 'סֻלָּם', category: 'שורוק-קובוץ', color: 'text-orange-600' },
  { id: 'u10', text: 'קופסה', nikudText: 'קֻפְסָה', category: 'שורוק-קובוץ', color: 'text-pink-600' },

  // --- שווא ---
  { id: 's1', text: 'מדינה', nikudText: 'מְדִינָה', category: 'שווא', color: 'text-teal-600' },
  { id: 's2', text: 'כלבים', nikudText: 'כְּלָבִים', category: 'שווא', color: 'text-indigo-600' },
  { id: 's3', text: 'זבוב', nikudText: 'זְבוּב', category: 'שווא', color: 'text-red-500' },
  { id: 's4', text: 'גבינה', nikudText: 'גְּבִינָה', category: 'שווא', color: 'text-blue-500' },
  { id: 's5', text: 'סליחה', nikudText: 'סְלִיחָה', category: 'שווא', color: 'text-green-500' },
  { id: 's6', text: 'בדיקה', nikudText: 'בְּדִיקָה', category: 'שווא', color: 'text-purple-500' },
  { id: 's7', text: 'כתיבה', nikudText: 'כְּתִיבָה', category: 'שווא', color: 'text-orange-500' },
  { id: 's8', text: 'קריאה', nikudText: 'קְרִיאָה', category: 'שווא', color: 'text-pink-500' },
  { id: 's9', text: 'תמונה', nikudText: 'תְּמוּנָה', category: 'שווא', color: 'text-teal-500' },
  { id: 's10', text: 'לבנה', nikudText: 'לְבָנָה', category: 'שווא', color: 'text-indigo-500' },
];
