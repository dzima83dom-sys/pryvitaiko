import { NextResponse } from 'next/server';

type MaybeOption =
  | string
  | { value?: string; label?: string; custom?: boolean }
  | null
  | undefined;

type IncomingState = {
  recipient?: MaybeOption;
  recipientCustomValue?: string;
  profession?: MaybeOption;
  professionCustomValue?: string;
  occasion?: MaybeOption;
  occasionCustomValue?: string;
  name?: string;
  gender?: string | null;
  age?: string | null;
  emotion?: MaybeOption;
};

type OccasionCategory =
  | 'personal'
  | 'holiday'
  | 'family'
  | 'romantic'
  | 'professional'
  | 'achievement'
  | 'gratitude'
  | 'freeform'
  | 'unknown';

type ProfessionUsage = 'none' | 'soft' | 'strong';
type NameUsage = 'none' | 'soft' | 'start';

type OccasionRule = {
  category: OccasionCategory;
  professionUsage: ProfessionUsage;
  focus: string[];
  avoid: string[];
  recommendedLength: 'short-medium' | 'medium';
};

type EmotionTone = {
  tone: string[];
  avoid: string[];
};

function getLabel(field: MaybeOption, customValue?: string): string {
  if (typeof field === 'string') return field.trim();

  if (field && typeof field === 'object') {
    if (field.value === 'other') {
      return customValue?.trim() || 'інше';
    }

    return field.label?.trim() || field.value?.trim() || '';
  }

  return customValue?.trim() || '';
}

function mapGender(value?: string | null): string {
  if (value === 'male') return 'чоловік';
  if (value === 'female') return 'жінка';
  return '';
}

function mapAge(value?: string | null): string {
  if (value === 'child') return 'дитина';
  if (value === 'teen') return 'підліток';
  if (value === 'adult') return 'доросла людина';
  if (value === 'elder') return 'людина старшого віку';
  return '';
}

function getAgeGroup(value?: string | null): 'child' | 'teen' | 'adult' | 'elder' | 'unknown' {
  if (value === 'child') return 'child';
  if (value === 'teen') return 'teen';
  if (value === 'adult') return 'adult';
  if (value === 'elder') return 'elder';
  return 'unknown';
}

function normalize(text: string): string {
  return text.toLowerCase().trim();
}

function detectOccasionKey(text: string): string {
  const t = normalize(text);

  if (!t) return 'unknown';

  if (t.includes('день народження')) return 'birthday';
  if (t.includes('ювіл')) return 'anniversary';
  if (t.includes('весіл') || t.includes('річниц')) return 'wedding';
  if (t.includes('новий рік')) return 'new-year';
  if (t.includes('різдв')) return 'christmas';
  if (t.includes('великд')) return 'easter';
  if (t.includes('день ангела')) return 'angel-day';
  if (t.includes('підвищ') || t.includes('нова робота') || t.includes('новою посад')) return 'promotion';
  if (t.includes('досяг') || t.includes('успіх') || t.includes('перемог') || t.includes('нагород')) return 'achievement';
  if (t.includes('подяк')) return 'gratitude';
  if (t.includes('просто так')) return 'just-because';

  if (t.includes('8 березня') || t.includes('восьме березня')) return 'march-8';
  if (t.includes('день міста')) return 'city-day';
  if (t.includes('день вчителя')) return 'teacher-day';
  if (t.includes('день медика')) return 'medical-day';
  if (t.includes('день народження компанії')) return 'company-birthday';
  if (t.includes('народжен') && t.includes('дитини')) return 'baby-birth';
  if (t.includes('заручин')) return 'engagement';
  if (t.includes('день закохан')) return 'valentines';

  return 'freeform';
}

const OCCASION_RULES: Record<string, OccasionRule> = {
  birthday: {
    category: 'personal',
    professionUsage: 'none',
    focus: ['радість', 'тепло', 'щирі побажання', 'натхнення', 'приємні моменти'],
    avoid: ['робити професію центром тексту', 'сухий діловий тон', 'службову характеристику'],
    recommendedLength: 'medium',
  },
  anniversary: {
    category: 'personal',
    professionUsage: 'soft',
    focus: ['повага', 'цінність людини', 'шлях', 'теплі побажання', 'гармонія'],
    avoid: ['надмірну офіційність', 'холодний тон'],
    recommendedLength: 'medium',
  },
  wedding: {
    category: 'romantic',
    professionUsage: 'none',
    focus: ['любов', 'єдність', 'щастя', 'підтримка', 'майбутнє разом'],
    avoid: ['робочу тематику', 'карʼєрний акцент'],
    recommendedLength: 'medium',
  },
  engagement: {
    category: 'romantic',
    professionUsage: 'none',
    focus: ['ніжність', 'радість', 'новий етап', 'любов', 'теплі побажання'],
    avoid: ['професійний тон', 'надмірну офіційність'],
    recommendedLength: 'medium',
  },
  'new-year': {
    category: 'holiday',
    professionUsage: 'none',
    focus: ['новий етап', 'затишок', 'надія', 'тепло', 'удача'],
    avoid: ['робочі досягнення як основу тексту', 'карʼєрний акцент'],
    recommendedLength: 'medium',
  },
  christmas: {
    category: 'holiday',
    professionUsage: 'none',
    focus: ['світло', 'добро', 'родинне тепло', 'затишок', 'душевність'],
    avoid: ['діловий стиль', 'професійну тематику'],
    recommendedLength: 'medium',
  },
  easter: {
    category: 'holiday',
    professionUsage: 'none',
    focus: ['світло', 'добро', 'мир', 'надія', 'тепло'],
    avoid: ['карʼєрний акцент', 'робочі досягнення', 'привʼязку до професії'],
    recommendedLength: 'medium',
  },
  'angel-day': {
    category: 'holiday',
    professionUsage: 'none',
    focus: ['захист', 'гармонія', 'світлі побажання', 'душевність'],
    avoid: ['робочу тематику', 'грубий гумор'],
    recommendedLength: 'short-medium',
  },
  promotion: {
    category: 'professional',
    professionUsage: 'strong',
    focus: ['розвиток', 'довіра', 'нові можливості', 'впевненість', 'результат'],
    avoid: ['занадто побутовий тон', 'беззмістовні загальні фрази'],
    recommendedLength: 'medium',
  },
  achievement: {
    category: 'achievement',
    professionUsage: 'strong',
    focus: ['результат', 'зусилля', 'гордість', 'визнання', 'рух вперед'],
    avoid: ['занадто загальний текст', 'порожні штампи'],
    recommendedLength: 'medium',
  },
  gratitude: {
    category: 'gratitude',
    professionUsage: 'soft',
    focus: ['вдячність', 'цінність людини', 'тепло', 'повага'],
    avoid: ['пафос заради пафосу', 'сухий офіціоз без емоції'],
    recommendedLength: 'short-medium',
  },
  'just-because': {
    category: 'personal',
    professionUsage: 'none',
    focus: ['тепло', 'увага', 'приємні слова', 'щирість'],
    avoid: ['зайвий пафос', 'робочу тематику'],
    recommendedLength: 'short-medium',
  },
  'march-8': {
    category: 'holiday',
    professionUsage: 'none',
    focus: ['ніжність', 'краса', 'тепло', 'натхнення', 'радість'],
    avoid: ['професійну характеристику', 'сухий діловий стиль'],
    recommendedLength: 'medium',
  },
  'city-day': {
    category: 'holiday',
    professionUsage: 'none',
    focus: ['свято', 'гордість', 'атмосфера', 'теплі побажання'],
    avoid: ['привʼязку до професії без потреби'],
    recommendedLength: 'short-medium',
  },
  'teacher-day': {
    category: 'professional',
    professionUsage: 'strong',
    focus: ['мудрість', 'терпіння', 'внесок', 'натхнення', 'повага'],
    avoid: ['надто побутовий тон', 'пусті шаблони'],
    recommendedLength: 'medium',
  },
  'medical-day': {
    category: 'professional',
    professionUsage: 'strong',
    focus: ['турбота', 'відповідальність', 'сила', 'вдячність', 'повага'],
    avoid: ['занадто легковажний гумор', 'загальні слова без змісту'],
    recommendedLength: 'medium',
  },
  'company-birthday': {
    category: 'professional',
    professionUsage: 'strong',
    focus: ['спільний шлях', 'розвиток', 'результати', 'команда'],
    avoid: ['сімейний тон', 'романтичні формулювання'],
    recommendedLength: 'medium',
  },
  'baby-birth': {
    category: 'family',
    professionUsage: 'none',
    focus: ['радість', 'ніжність', 'тепло', 'щасливий етап'],
    avoid: ['робочу тематику', 'формальний тон'],
    recommendedLength: 'medium',
  },
  valentines: {
    category: 'romantic',
    professionUsage: 'none',
    focus: ['ніжність', 'почуття', 'близькість', 'тепло'],
    avoid: ['професійний контекст', 'службовий стиль'],
    recommendedLength: 'medium',
  },
  freeform: {
    category: 'freeform',
    professionUsage: 'soft',
    focus: ['доречність', 'природність', 'увага до нагоди', 'тепло'],
    avoid: ['вигадувати зайві деталі', 'тягнути професію без потреби'],
    recommendedLength: 'medium',
  },
  unknown: {
    category: 'unknown',
    professionUsage: 'none',
    focus: ['універсальне тепло', 'щирість', 'людяність'],
    avoid: ['специфіку, якої немає у вхідних даних', 'штучні конструкції'],
    recommendedLength: 'short-medium',
  },
};

const EMOTION_RULES: Record<string, EmotionTone> = {
  warm: {
    tone: ['щире', 'тепле', 'мʼяке', 'людяне'],
    avoid: ['холодний офіціоз', 'канцеляризм'],
  },
  fun: {
    tone: ['легке', 'усміхнене', 'живе'],
    avoid: ['грубий гумор', 'перебір з жартами'],
  },
  romantic: {
    tone: ['ніжне', 'делікатне', 'тепле'],
    avoid: ['робочий тон', 'сухість'],
  },
  formal: {
    tone: ['поважне', 'стримане', 'акуратне'],
    avoid: ['фамільярність', 'занадто побутовий гумор'],
  },
  motivating: {
    tone: ['надихаюче', 'впевнене', 'підтримуюче'],
    avoid: ['пафос заради пафосу', 'сухий наказовий тон'],
  },
  touching: {
    tone: ['душевне', 'зворушливе', 'щире'],
    avoid: ['ділову сухість', 'холодний стиль'],
  },
  creative: {
    tone: ['образне', 'цікаве', 'свіже'],
    avoid: ['дивність заради дивності', 'штучність'],
  },
  funny: {
    tone: ['дотепне', 'легке', 'живе'],
    avoid: ['образливі жарти', 'клоунаду'],
  },
  universal: {
    tone: ['збалансоване', 'тепле', 'природне'],
    avoid: ['різкі стилістичні перегини'],
  },
};

function getProfessionQualities(profession: string): string[] {
  const p = normalize(profession);

  if (!p) return [];

  if (p.includes('освіт') || p.includes('вчител') || p.includes('виклада')) {
    return ['мудрість', 'терпіння', 'уміння надихати'];
  }

  if (p.includes('медиц') || p.includes('лікар') || p.includes('медик')) {
    return ['турбота', 'відповідальність', 'сила духу'];
  }

  if (p.includes('it') || p.includes('технолог') || p.includes('програм')) {
    return ['кмітливість', 'вміння знаходити рішення', 'сучасне мислення'];
  }

  if (p.includes('продаж') || p.includes('торг')) {
    return ['енергія', 'вміння відчувати людей', 'комунікація'];
  }

  if (p.includes('бізнес') || p.includes('офіс')) {
    return ['організованість', 'відповідальність', 'впевненість'];
  }

  if (p.includes('підприє') || p.includes('власна справа') || p.includes('бізнес')) {
    return ['сміливість', 'ініціативність', 'віра в свою справу'];
  }

  if (p.includes('спорт') || p.includes('фітнес')) {
    return ['дисципліна', 'витривалість', 'сила характеру'];
  }

  if (p.includes('краса') || p.includes('бʼюті') || p.includes('б' + 'юті')) {
    return ['відчуття стилю', 'уважність', 'уміння дарувати гарний настрій'];
  }

  if (p.includes('творч') || p.includes('креатив')) {
    return ['натхнення', 'образне мислення', 'творчу енергію'];
  }

  if (p.includes('сервіс') || p.includes('обслугов')) {
    return ['турботу про людей', 'уважність', 'доброжичливість'];
  }

  if (p.includes('будів') || p.includes('ремонт')) {
    return ['надійність', 'майстерність', 'працьовитість'];
  }

  return ['сильні сторони', 'цінні якості', 'внутрішню силу'];
}

function resolveProfessionUsage(
  base: ProfessionUsage,
  recipient: string,
  emotionKey: string,
  ageGroup: ReturnType<typeof getAgeGroup>
): ProfessionUsage {
  const r = normalize(recipient);

  if (ageGroup === 'child') return 'none';
  if (ageGroup === 'teen' && base === 'strong') return 'soft';

  if (
    r.includes('мама') ||
    r.includes('тато') ||
    r.includes('чоловік') ||
    r.includes('дружина') ||
    r.includes('кохана') ||
    r.includes('кохан') ||
    r.includes('бабуся') ||
    r.includes('дідусь') ||
    r.includes('син') ||
    r.includes('донька')
  ) {
    return base === 'strong' ? 'soft' : 'none';
  }

  if (emotionKey === 'romantic') return 'none';
  if (emotionKey === 'touching' && base === 'strong') return 'soft';

  return base;
}

function resolveNameUsage(params: {
  name: string;
  occasionCategory: OccasionCategory;
  emotionKey: string;
  recipient: string;
  ageGroup: ReturnType<typeof getAgeGroup>;
}): NameUsage {
  const { name, occasionCategory, emotionKey, recipient, ageGroup } = params;

  if (!name) return 'none';

  const r = normalize(recipient);

  if (occasionCategory === 'holiday') return 'none';
  if (occasionCategory === 'professional' && emotionKey === 'formal') return 'none';

  if (ageGroup === 'child') return 'start';

  if (
    occasionCategory === 'personal' ||
    occasionCategory === 'romantic' ||
    emotionKey === 'warm' ||
    emotionKey === 'touching'
  ) {
    return 'start';
  }

  if (r.includes('друг') || r.includes('подруг') || r.includes('брат') || r.includes('сестр')) {
    return 'soft';
  }

  return 'none';
}

function getAgeInstructions(ageGroup: ReturnType<typeof getAgeGroup>): string[] {
  switch (ageGroup) {
    case 'child':
      return [
        'пиши простіше, легко і світло',
        'роби текст добрим, радісним, без складних конструкцій',
        'уникай надто серйозного офіціозу',
      ];
    case 'teen':
      return [
        'пиши сучасно, легко, без моралізаторства',
        'допускається легка жвавість і драйв',
      ];
    case 'adult':
      return [
        'тримай баланс між теплом, повагою і природністю',
      ];
    case 'elder':
      return [
        'додай більше тепла, вдячності й поваги',
        'не використовуй натяки на старість або слабкість',
      ];
    default:
      return ['пиши універсально й доречно'];
  }
}

function buildPrompt(state: IncomingState): string {
  const recipient = getLabel(state.recipient, state.recipientCustomValue);
  const profession = getLabel(state.profession, state.professionCustomValue);
  const occasion = getLabel(state.occasion, state.occasionCustomValue);
  const emotion = getLabel(state.emotion);
  const name = state.name?.trim() || '';
  const gender = mapGender(state.gender);
  const age = mapAge(state.age);
  const ageGroup = getAgeGroup(state.age);

  const occasionKey = detectOccasionKey(occasion);
  const occasionRule = OCCASION_RULES[occasionKey] || OCCASION_RULES.unknown;

  const emotionKey =
    typeof state.emotion === 'object' && state.emotion?.value
      ? state.emotion.value
      : normalize(emotion);

  const emotionRule = EMOTION_RULES[emotionKey] || EMOTION_RULES.universal;

  const professionUsage = resolveProfessionUsage(
    occasionRule.professionUsage,
    recipient,
    emotionKey,
    ageGroup
  );

  const nameUsage = resolveNameUsage({
    name,
    occasionCategory: occasionRule.category,
    emotionKey,
    recipient,
    ageGroup,
  });

  const professionQualities =
    profession && professionUsage !== 'none' ? getProfessionQualities(profession) : [];

  const structureHint =
    occasionRule.recommendedLength === 'short-medium'
      ? '2 коротші абзаци'
      : '2 абзаци середньої довжини';

  return `
Створи ОДНЕ готове привітання українською мовою.

Вхідні дані:
- Кого вітаємо: ${recipient || 'не вказано'}
- Нагода: ${occasion || 'не вказано'}
- Стиль / емоція: ${emotion || 'не вказано'}
- Сфера діяльності: ${profession || 'не вказано'}
- Ім’я: ${name || 'не вказано'}
- Стать: ${gender || 'не вказано'}
- Вік: ${age || 'не вказано'}

Логіка цієї генерації:
- Тип нагоди: ${occasionRule.category}
- Використання професії: ${professionUsage}
- Використання імені: ${nameUsage}
- Бажана структура: ${structureHint}

На чому робити акцент:
${occasionRule.focus.map((item) => `- ${item}`).join('\n')}
${professionQualities.length ? '\nЯкщо доречно використовуєш професійний контекст, спирайся на якості:\n' + professionQualities.map((item) => `- ${item}`).join('\n') : ''}

Чого уникати:
${[...occasionRule.avoid, ...emotionRule.avoid].map((item) => `- ${item}`).join('\n')}

Стиль подачі:
${emotionRule.tone.map((item) => `- ${item}`).join('\n')}

Вікові правила:
${getAgeInstructions(ageGroup).map((item) => `- ${item}`).join('\n')}

Обов’язкові правила:
1. Текст має звучати природно, по-людськи, ніби його написала жива людина.
2. Не пиши шаблонно, не використовуй затерті кліше.
3. Не додавай пояснень, заголовків, списків, службового тексту або варіантів.
4. Поверни тільки фінальний текст привітання.
5. Якщо використання професії = none, НЕ згадуй сферу діяльності і не прив’язуй зміст до роботи.
6. Якщо використання професії = soft, згадай професійний контекст лише дуже мʼяко, якщо це звучить природно.
7. Якщо використання професії = strong, зроби професійний контекст важливою, але не єдиною частиною тексту.
8. Якщо використання імені = none, не звертайся по імені.
9. Якщо використання імені = soft, ім’я можна використати максимум 1 раз і тільки природно.
10. Якщо використання імені = start, ім’я можна використати 1 раз на початку, якщо це звучить тепло і доречно.
11. Для святкових нагод на кшталт Великодня, Різдва, Нового року, 8 березня — не роби текст професійним.
12. Для романтичних і сімейних нагод — не роби текст діловим.
13. Для професійних нагод, досягнень, нової роботи, підвищення — доречно додати повагу до навичок, шляху, результату.
14. Якщо нагода введена вручну і вона нестандартна, збережи природність і доречність, не вигадуй зайвого.
15. Емодзі не використовуй, якщо вони не є абсолютно необхідними. Краще без них.
16. Побудуй текст як ${structureHint}.

Згенеруй привітання зараз.
`.trim();
}

function extractOutputText(data: any): string {
  if (typeof data?.output_text === 'string' && data.output_text.trim()) {
    return data.output_text.trim();
  }

  if (Array.isArray(data?.output)) {
    const texts = data.output
      .flatMap((item: any) => item?.content ?? [])
      .filter((part: any) => part?.type === 'output_text')
      .map((part: any) => part.text?.trim())
      .filter(Boolean);

    if (texts.length) {
      return texts.join('\n');
    }
  }

  return '';
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'Missing OPENAI_API_KEY' }, { status: 500 });
    }

    const state = (await request.json()) as IncomingState;
    const prompt = buildPrompt(state);

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-5-mini',
        input: [
          {
            role: 'system',
            content: [
              {
                type: 'input_text',
                text:
                  'Ти створюєш привітання українською мовою. Пиши природно, тонко, доречно, без шаблонів і канцеляриту. Поверни тільки готовий текст.',
              },
            ],
          },
          {
            role: 'user',
            content: [{ type: 'input_text', text: prompt }],
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error?.message || 'OpenAI request failed' },
        { status: response.status }
      );
    }

    const text = extractOutputText(data);

    if (!text) {
      return NextResponse.json({ error: 'Empty response from OpenAI' }, { status: 500 });
    }

    return NextResponse.json({ text });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}